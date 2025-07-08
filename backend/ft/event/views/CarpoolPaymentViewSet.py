from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from ft.event.models import CarpoolPayment
from ft.event.serializers import CarpoolPaymentSerializer


class CarpoolPaymentViewSet(viewsets.ModelViewSet):
    """
    API endpoint pour les paiements de covoiturage.
    """

    queryset = CarpoolPayment.objects.all()
    serializer_class = CarpoolPaymentSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["request", "is_completed", "payment_method"]
    search_fields = ["notes"]

    def get_queryset(self):
        """
        Filtre les paiements selon l'utilisateur connecté.
        - Conducteur: voit tous les paiements pour ses trajets
        - Passager: voit tous ses paiements
        """
        user = self.request.user
        return CarpoolPayment.objects.filter(
            request__trip__driver=user
        ) | CarpoolPayment.objects.filter(request__passenger=user)

    def perform_create(self, serializer):
        """
        Enregistre le paiement.
        """
        serializer.save()
