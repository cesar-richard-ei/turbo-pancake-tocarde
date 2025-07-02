from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response

from ft.event.models import EventHosting, Event, EventHostingRequest
from ft.event.serializers import EventHostingSerializer
from ft.event.permissions import IsHostingOwnerOrReadOnly


class EventHostingViewSet(viewsets.ModelViewSet):
    """
    API endpoint qui permet de consulter ou modifier les hébergements.
    """

    serializer_class = EventHostingSerializer
    permission_classes = [permissions.IsAuthenticated, IsHostingOwnerOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["host__first_name", "host__last_name", "event__name"]
    ordering_fields = ["created_at", "available_beds"]
    ordering = ["-created_at"]

    def get_queryset(self):
        """
        Cette vue retourne une liste d'hébergements.
        Filtrer par event ou host est possible en passant le paramètre dans l'URL.
        """
        queryset = EventHosting.objects.all()

        # Filtrage par événement
        event_id = self.request.query_params.get("event", None)
        if event_id:
            queryset = queryset.filter(event=event_id)

        # Filtrage par hôte
        host_id = self.request.query_params.get("host", None)
        if host_id:
            queryset = queryset.filter(host=host_id)

        # Filtrage par état actif/inactif
        is_active = self.request.query_params.get("is_active", None)
        if is_active is not None:
            is_active = is_active.lower() == "true"
            queryset = queryset.filter(is_active=is_active)

        return queryset

    def perform_create(self, serializer):
        """
        Associe l'utilisateur courant comme hôte lors de la création.
        """
        serializer.save(host=self.request.user)

    @action(detail=False, methods=["get"])
    def me(self, request):
        """
        Retourne uniquement les hébergements proposés par l'utilisateur connecté.
        """
        hostings = EventHosting.objects.filter(host=request.user)
        serializer = self.get_serializer(hostings, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def for_event(self, request):
        """
        Retourne uniquement les hébergements proposés pour un événement spécifique.
        """
        event_id = request.query_params.get("event_id", None)
        if not event_id:
            return Response({"error": "Paramètre event_id requis."}, status=400)

        try:
            event = Event.objects.get(pk=event_id)
            hostings = EventHosting.objects.filter(event=event, is_active=True)
            serializer = self.get_serializer(hostings, many=True)
            return Response(serializer.data)
        except Event.DoesNotExist:
            return Response({"error": "Événement non trouvé."}, status=404)

    @action(detail=True, methods=["get"])
    def available_places(self, request, pk=None):
        """
        Retourne le nombre de places disponibles dans cet hébergement.
        """
        hosting = self.get_object()

        # Compter le nombre de demandes acceptées
        accepted_requests_count = EventHostingRequest.objects.filter(
            hosting=hosting, status="ACCEPTED"
        ).count()

        # Calculer le nombre de places restantes
        available_places = hosting.available_beds - accepted_requests_count

        return Response(
            {
                "total_beds": hosting.available_beds,
                "accepted_guests": accepted_requests_count,
                "available_places": available_places,
            }
        )
