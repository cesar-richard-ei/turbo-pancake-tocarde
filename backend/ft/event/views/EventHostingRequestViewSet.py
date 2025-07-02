from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Count

from ft.event.models import EventHostingRequest, EventHosting
from ft.event.serializers import (
    EventHostingRequestSerializer,
    EventHostingRequestActionSerializer,
)
from ft.event.permissions import IsHostingRequestRequesterOrHost


class EventHostingRequestViewSet(viewsets.ModelViewSet):
    """
    API endpoint qui permet de gérer les demandes d'hébergement.
    """

    serializer_class = EventHostingRequestSerializer
    permission_classes = [permissions.IsAuthenticated, IsHostingRequestRequesterOrHost]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["requester__first_name", "requester__last_name", "status"]
    ordering_fields = ["created_at", "status"]
    ordering = ["-created_at"]

    def get_queryset(self):
        """
        Cette vue retourne une liste de demandes d'hébergement.
        - Un utilisateur voit ses propres demandes
        - Un hôte voit les demandes pour ses hébergements
        """
        user = self.request.user
        queryset = EventHostingRequest.objects.all()

        # Si l'utilisateur n'est pas staff, on filtre selon ses droits
        if not user.is_staff:
            # Les demandes dont l'utilisateur est le demandeur
            user_requests = queryset.filter(requester=user)

            # Les demandes pour les hébergements dont l'utilisateur est l'hôte
            host_requests = queryset.filter(hosting__host=user)

            # Union des deux querysets
            queryset = user_requests | host_requests

        # Filtrage par statut
        status = self.request.query_params.get("status", None)
        if status:
            queryset = queryset.filter(status=status)

        # Filtrage par hébergement
        hosting_id = self.request.query_params.get("hosting", None)
        if hosting_id:
            queryset = queryset.filter(hosting=hosting_id)

        # Filtrage par demandeur
        requester_id = self.request.query_params.get("requester", None)
        if requester_id:
            queryset = queryset.filter(requester=requester_id)

        return queryset

    def perform_create(self, serializer):
        """
        Associe l'utilisateur courant comme demandeur lors de la création.
        """
        serializer.save(requester=self.request.user)

    def get_places_available(self, hosting):
        """
        Calcule le nombre de places encore disponibles pour un hébergement.
        """
        # Compter le nombre de demandes acceptées
        accepted_requests_count = EventHostingRequest.objects.filter(
            hosting=hosting, status=EventHostingRequest.Status.ACCEPTED
        ).count()

        # Calculer le nombre de places restantes
        return hosting.available_beds - accepted_requests_count

    @action(detail=True, methods=["post"])
    def accept(self, request, pk=None):
        """
        Action pour accepter une demande d'hébergement.
        Seul l'hôte peut accepter une demande.
        """
        hosting_request = self.get_object()

        # Vérifier que l'utilisateur est bien l'hôte de l'hébergement
        if hosting_request.hosting.host != request.user:
            return Response(
                {"error": "Vous n'êtes pas autorisé à accepter cette demande."},
                status=status.HTTP_403_FORBIDDEN,
            )

        # Vérifier que la demande est en attente
        if hosting_request.status != EventHostingRequest.Status.PENDING:
            return Response(
                {"error": "Cette demande ne peut plus être acceptée."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Vérifier qu'il reste des places disponibles
        places_available = self.get_places_available(hosting_request.hosting)
        if places_available <= 0:
            return Response(
                {"error": "Vous n'avez plus de places disponibles."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Traiter le message de l'hôte s'il y en a un
        serializer = EventHostingRequestActionSerializer(data=request.data)
        if serializer.is_valid():
            if "host_message" in serializer.validated_data:
                hosting_request.host_message = serializer.validated_data["host_message"]

            hosting_request.accept()
            response_serializer = self.get_serializer(hosting_request)
            return Response(response_serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=["post"])
    def reject(self, request, pk=None):
        """
        Action pour refuser une demande d'hébergement.
        Seul l'hôte peut refuser une demande.
        """
        hosting_request = self.get_object()

        # Vérifier que l'utilisateur est bien l'hôte de l'hébergement
        if hosting_request.hosting.host != request.user:
            return Response(
                {"error": "Vous n'êtes pas autorisé à refuser cette demande."},
                status=status.HTTP_403_FORBIDDEN,
            )

        # Vérifier que la demande est en attente
        if hosting_request.status != EventHostingRequest.Status.PENDING:
            return Response(
                {"error": "Cette demande ne peut plus être refusée."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Traiter le message de l'hôte s'il y en a un
        serializer = EventHostingRequestActionSerializer(data=request.data)
        if serializer.is_valid():
            if "host_message" in serializer.validated_data:
                hosting_request.host_message = serializer.validated_data["host_message"]

            hosting_request.reject()
            response_serializer = self.get_serializer(hosting_request)
            return Response(response_serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=["post"])
    def cancel(self, request, pk=None):
        """
        Action pour annuler une demande d'hébergement.
        Seul le demandeur peut annuler sa demande.
        """
        hosting_request = self.get_object()

        # Vérifier que l'utilisateur est bien le demandeur
        if hosting_request.requester != request.user:
            return Response(
                {"error": "Vous n'êtes pas autorisé à annuler cette demande."},
                status=status.HTTP_403_FORBIDDEN,
            )

        # Vérifier que la demande peut être annulée
        if hosting_request.status not in [
            EventHostingRequest.Status.PENDING,
            EventHostingRequest.Status.ACCEPTED,
        ]:
            return Response(
                {"error": "Cette demande ne peut plus être annulée."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        hosting_request.cancel()
        serializer = self.get_serializer(hosting_request)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def my_requests(self, request):
        """
        Retourne uniquement les demandes faites par l'utilisateur connecté.
        """
        requests = EventHostingRequest.objects.filter(requester=request.user)
        serializer = self.get_serializer(requests, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def for_my_hostings(self, request):
        """
        Retourne uniquement les demandes pour les hébergements de l'utilisateur connecté.
        """
        requests = EventHostingRequest.objects.filter(hosting__host=request.user)
        serializer = self.get_serializer(requests, many=True)
        return Response(serializer.data)
