from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from tpt.user.managers import UserManager


class User(AbstractUser):
    """
    A User is a user of the TPT application.
    """

    username: str = models.CharField(max_length=100, unique=True)
    email: str = models.EmailField(_("email address"), unique=True)
    last_name: str = models.CharField(max_length=255)
    first_name: str = models.CharField(max_length=255)

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
        ordering = ["last_name", "first_name"]

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    objects = UserManager()

    def __str__(self):
        return "{} {}".format(self.first_name, self.last_name)
