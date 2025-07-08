from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from ft.event.models import CarpoolRequest
from ft.event.serializers import (
    CarpoolRequestSerializer,
    CarpoolRequestActionSerializer,
    CarpoolPaymentSerializer,
)


class CarpoolRequestViewSet(viewsets.ModelViewSet):
    """
    API endpoint pour les demandes de covoiturage.
    """

    queryset = CarpoolRequest.objects.all()
    serializer_class = CarpoolRequestSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["trip", "passenger", "status", "is_active", "is_paid"]
    search_fields = ["message"]

    def get_queryset(self):
        """
        Filtre les demandes selon l'utilisateur connecté.
        - Conducteur: voit toutes les demandes pour ses trajets
        - Passager: voit toutes ses demandes
        """
        user = self.request.user
        # Les utilisateurs voient les demandes associées à leurs trajets (en tant que conducteur)
        # ou leurs propres demandes (en tant que passager)
        return CarpoolRequest.objects.filter(
            trip__driver=user
        ) | CarpoolRequest.objects.filter(passenger=user)

    def perform_create(self, serializer):
        """
        Associe l'utilisateur courant comme passager lors de la création.
        """
        serializer.save(passenger=self.request.user)

    @action(detail=True, methods=["post"])
    def request_action(self, request, pk=None):
        """
        Endpoint pour effectuer une action sur une demande:
        - accept: accepter la demande (conducteur uniquement)
        - reject: refuser la demande (conducteur uniquement)
        - cancel: annuler la demande (passager uniquement)
        """
        carpool_request = self.get_object()
        serializer = CarpoolRequestActionSerializer(
            data=request.data,
            context={"request": request, "carpool_request": carpool_request},
        )

        if serializer.is_valid():
            action = serializer.validated_data["action"]
            response_message = serializer.validated_data.get("response_message")

            # Mettre à jour le statut selon l'action
            if action == "accept":
                carpool_request.status = "ACCEPTED"
            elif action == "reject":
                carpool_request.status = "REJECTED"
            elif action == "cancel":
                carpool_request.status = "CANCELLED"

            # Enregistrer le message de réponse s'il est fourni
            if response_message:
                carpool_request.response_message = response_message

            carpool_request.save()

            # Retourner la demande mise à jour
            return Response(
                CarpoolRequestSerializer(carpool_request).data,
                status=status.HTTP_200_OK,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=["post"])
    def payment(self, request, pk=None):
        """
        Endpoint pour marquer une demande comme payée ou non.
        Seul le conducteur peut marquer un paiement comme effectué ou non.
        """
        carpool_request = self.get_object()
        serializer = CarpoolPaymentSerializer(
            data=request.data,
            context={"request": request, "carpool_request": carpool_request},
        )

        if serializer.is_valid():
            is_paid = serializer.validated_data["is_paid"]
            payment_notes = serializer.validated_data.get("payment_notes", "")

            # Mettre à jour le statut de paiement
            carpool_request.is_paid = is_paid
            carpool_request.payment_notes = payment_notes
            carpool_request.save()

            # Retourner la demande mise à jour
            return Response(
                CarpoolRequestSerializer(carpool_request).data,
                status=status.HTTP_200_OK,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
