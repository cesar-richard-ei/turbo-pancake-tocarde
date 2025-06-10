from datetime import datetime
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from tpt.user.managers import UserManager


class Link(models.Model):
    """
    A Link is a link for an external web resource.
    """

    name: str = models.CharField(max_length=255)
    description: str = models.TextField(null=True, blank=True)
    url: str = models.URLField(max_length=255)
    is_active: bool = models.BooleanField(default=True)
    created_at: datetime = models.DateTimeField(auto_now_add=True)
    updated_at: datetime = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Link"
        verbose_name_plural = "Links"
        ordering = ["name"]

    def __str__(self):
        return "{} ({})".format(self.name, self.url)
