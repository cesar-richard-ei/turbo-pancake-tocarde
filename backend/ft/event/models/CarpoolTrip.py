from django.db import models
from ft.user.models import User
from .Event import Event


class CarpoolTrip(models.Model):
    """
    Un CarpoolTrip représente un trajet de covoiturage proposé par un
    conducteur.
    """

    driver = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name="Conducteur",
        help_text="Utilisateur proposant le trajet",
        related_name="carpool_trips_as_driver",
    )
    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        verbose_name="Événement",
        help_text="Événement lié au trajet",
        related_name="carpool_trips",
        null=True,
        blank=True,
    )
    departure_city = models.CharField(
        max_length=255,
        verbose_name="Ville de départ",
        help_text="Ville de départ du trajet",
    )
    departure_address = models.CharField(
        max_length=255,
        verbose_name="Adresse de départ",
        help_text="Adresse précise du lieu de départ",
        null=True,
        blank=True,
    )
    arrival_city = models.CharField(
        max_length=255,
        verbose_name="Ville d'arrivée",
        help_text="Ville d'arrivée du trajet",
    )
    arrival_address = models.CharField(
        max_length=255,
        verbose_name="Adresse d'arrivée",
        help_text="Adresse précise du lieu d'arrivée",
        null=True,
        blank=True,
    )
    departure_datetime = models.DateTimeField(
        verbose_name="Date et heure de départ",
        help_text="Date et heure de départ du trajet",
    )
    return_datetime = models.DateTimeField(
        verbose_name="Date et heure de retour",
        help_text="Date et heure du trajet retour (optionnel)",
        null=True,
        blank=True,
    )
    has_return = models.BooleanField(
        default=False,
        verbose_name="Trajet retour",
        help_text="Si un trajet retour est proposé",
    )
    seats_total = models.PositiveSmallIntegerField(
        default=3,
        verbose_name="Nombre de places",
        help_text="Nombre total de places disponibles",
    )
    price_per_seat = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        default=0.00,
        verbose_name="Prix par place",
        help_text="Prix demandé par passager (en €)",
    )
    additional_info = models.TextField(
        null=True,
        blank=True,
        verbose_name="Informations supplémentaires",
        help_text="Informations supplémentaires sur le trajet",
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name="Actif",
        help_text="Si le trajet est actif et visible",
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Date de création",
        help_text="Date de création du trajet",
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Date de mise à jour",
        help_text="Date de dernière modification du trajet",
    )

    class Meta:
        verbose_name = "Trajet de covoiturage"
        verbose_name_plural = "Trajets de covoiturage"
        ordering = ["departure_datetime", "event"]

    def __str__(self):
        return (
            f"{self.departure_city} → {self.arrival_city} "
            f"({self.departure_datetime.strftime('%d/%m/%Y')})"
        )

    @property
    def seats_available(self):
        """Renvoie le nombre de places encore disponibles."""
        accepted_requests = self.requests.filter(status="ACCEPTED").count()
        return self.seats_total - accepted_requests

    @property
    def is_full(self):
        """Indique si toutes les places sont prises."""
        return self.seats_available <= 0
