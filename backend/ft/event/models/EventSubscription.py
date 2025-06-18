from datetime import datetime
from django.db import models

from ft.user.models import User
from ft.event.models import Event


class EventSubscription(models.Model):
    """
    An EventSubscription is a subscription to an event.
    """

    event: Event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        verbose_name="Événement",
        help_text="Événement",
    )
    user: User = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name="Utilisateur",
        help_text="Utilisateur",
    )
    created_at: datetime = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Date de création",
        help_text="Date de création de la ressource",
    )
    updated_at: datetime = models.DateTimeField(
        auto_now=True,
        verbose_name="Date de mise à jour",
        help_text="Date de mise à jour de la ressource",
    )
    answer: str = models.CharField(
        max_length=6,
        verbose_name="Réponse",
        help_text="Réponse de l'utilisateur",
        choices=[
            ("YES", "Participe"),
            ("NO", "Ne paricipe pas"),
            ("MAYBE", "Peut-Être"),
        ],
    )
    can_invite: bool = models.BooleanField(
        default=False,
        verbose_name="Peut inviter",
        help_text="Si l'utilisateur peut inviter d'autres utilisateurs",
    )
    is_active: bool = models.BooleanField(
        default=True,
        verbose_name="Actif",
        help_text="Si l'inscription est active (debug only)",
    )

    class Meta:
        verbose_name = "Inscription"
        verbose_name_plural = "Inscriptions"
        ordering = ["event", "user"]
        unique_together = ["event", "user"]

    def __str__(self):
        return "{} ({})".format(self.event.name, self.user.email)
