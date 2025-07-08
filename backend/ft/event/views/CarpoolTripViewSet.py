from django.db.models import Q, Count, F
from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from ft.event.models import CarpoolTrip
from ft.event.serializers import CarpoolTripSerializer


class CarpoolTripViewSet(viewsets.ModelViewSet):
    """
    API endpoint pour les trajets de covoiturage.
    """

    queryset = CarpoolTrip.objects.all().order_by("-departure_datetime")
    serializer_class = CarpoolTripSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = [
        "event",
        "driver",
        "departure_city",
        "arrival_city",
        "is_active",
    ]
    search_fields = ["departure_city", "arrival_city", "additional_info"]
    ordering_fields = ["departure_datetime", "created_at"]

    def get_queryset(self):
        """
        Filtre pour obtenir les trajets selon les paramètres de la requête.
        """
        queryset = super().get_queryset()

        # Filtrer par disponibilité de places
        has_seats = self.request.query_params.get("has_seats")
        if has_seats is not None:
            # On compte les places acceptées par trajet
            queryset = queryset.annotate(
                accepted_seats=Count("requests", filter=Q(requests__status="ACCEPTED"))
            )
            # On filtre les trajets avec au moins une place disponible
            if has_seats.lower() == "true":
                queryset = queryset.filter(seats_total__gt=F("accepted_seats"))

        # Filtrer par date de départ après une certaine date
        departure_after = self.request.query_params.get("departure_after")
        if departure_after:
            queryset = queryset.filter(departure_datetime__gte=departure_after)

        # Filtrer par date de départ avant une certaine date
        departure_before = self.request.query_params.get("departure_before")
        if departure_before:
            queryset = queryset.filter(departure_datetime__lte=departure_before)

        return queryset

    def perform_create(self, serializer):
        """
        Définit l'utilisateur courant comme conducteur lors de la création.
        """
        serializer.save(driver=self.request.user)
