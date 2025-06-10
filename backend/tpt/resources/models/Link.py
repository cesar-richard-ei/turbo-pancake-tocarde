from datetime import datetime
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from tpt.user.managers import UserManager


class Link(models.Model):
    """
    A Link is a link for an external web resource.
    """

    name: str = models.CharField(
        max_length=255, verbose_name="Nom", help_text="Nom de la ressource"
    )
    description: str = models.TextField(
        null=True,
        blank=True,
        verbose_name="Description",
        help_text="Description de la ressource",
    )
    url: str = models.URLField(
        max_length=255, verbose_name="URL", help_text="URL de la ressource"
    )
    is_active: bool = models.BooleanField(
        default=True, verbose_name="Actif", help_text="Si la ressource est active"
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

    class Meta:
        verbose_name = "Link"
        verbose_name_plural = "Links"
        ordering = ["name"]

    def __str__(self):
        return "{} ({})".format(self.name, self.url)
