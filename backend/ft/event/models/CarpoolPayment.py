from django.db import models
from .CarpoolRequest import CarpoolRequest


class CarpoolPayment(models.Model):
    """
    Un CarpoolPayment représente un paiement effectué par un passager
    pour un trajet de covoiturage.
    """

    PAYMENT_METHOD_CHOICES = [
        ("CASH", "Espèces"),
        ("TRANSFER", "Virement bancaire"),
        ("MOBILE", "Paiement mobile"),
        ("OTHER", "Autre"),
    ]

    request = models.ForeignKey(
        CarpoolRequest,
        on_delete=models.CASCADE,
        verbose_name="Demande",
        help_text="Demande de covoiturage concernée",
        related_name="payments",
    )
    amount = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        verbose_name="Montant",
        help_text="Montant du paiement (en €)",
    )
    is_completed = models.BooleanField(
        default=False,
        verbose_name="Paiement complet",
        help_text="Indique si le paiement est complet",
    )
    payment_method = models.CharField(
        max_length=10,
        choices=PAYMENT_METHOD_CHOICES,
        default="CASH",
        verbose_name="Méthode de paiement",
        help_text="Méthode utilisée pour le paiement",
    )
    notes = models.TextField(
        null=True,
        blank=True,
        verbose_name="Notes",
        help_text="Informations complémentaires sur le paiement",
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Date de création",
        help_text="Date de création du paiement",
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Date de mise à jour",
        help_text="Date de dernière modification du paiement",
    )

    class Meta:
        verbose_name = "Paiement de covoiturage"
        verbose_name_plural = "Paiements de covoiturage"
        ordering = ["-created_at"]

    def __str__(self):
        return f"Paiement de {self.amount}€ pour {self.request}"

    @property
    def get_payment_status_display(self):
        """Renvoie le statut du paiement sous forme lisible."""
        return "Complet" if self.is_completed else "Partiel"
