from datetime import datetime
from django.db import models

from ft.user.models import User


class Membership(models.Model):
    """
    A membership represent a subscription fee paid by a user to La Tocarde for a year.
    """

    user: User = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name="Utilisateur",
        help_text="Utilisateur",
    )
    start_date: datetime = models.DateTimeField(
        verbose_name="Date de début", help_text="Date de début de l'adhésion"
    )
    end_date: datetime = models.DateTimeField(
        verbose_name="Date de fin", help_text="Date de fin de l'adhésion"
    )
    is_active: bool = models.BooleanField(
        default=True,
        verbose_name="Actif",
        help_text="Si l'événement est actif (visible sur le site)",
    )
    created_at: datetime = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Date de création",
        help_text="Date de création de l'adhésion",
    )
    updated_at: datetime = models.DateTimeField(
        auto_now=True,
        verbose_name="Date de mise à jour",
        help_text="Date de mise à jour de l'adhésion",
    )

    class Meta:
        verbose_name = "Adhésion"
        verbose_name_plural = "Adhésions"
        ordering = ["start_date", "end_date"]

    def __str__(self):
        return "{} ({})".format(self.name, self.location)
