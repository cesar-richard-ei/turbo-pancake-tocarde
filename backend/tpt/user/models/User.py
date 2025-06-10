from datetime import datetime
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from tpt.user.managers import UserManager


class User(AbstractUser):
    """
    A User is a user of the TPT application.
    """
    class FalucheStatus(models.TextChoices):
        SYMPATHISANT = 'SYMPATHISANT', 'Sympathisant'
        IMPETRANT = 'IMPETRANT', 'Impétrant'
        BAPTISE = 'BAPTISE', 'Baptisé'
        OTHER = 'OTHER', 'Autre folklore'

    username: str = models.CharField(max_length=100, unique=True)
    email: str = models.EmailField(_("email address"), unique=True)
    last_name: str = models.CharField(max_length=150)
    first_name: str = models.CharField(max_length=150)

    address: str = models.CharField(max_length=200, null=True, blank=True)
    city: str = models.CharField(max_length=100, null=True, blank=True)
    zip_code: str = models.CharField(max_length=10, null=True, blank=True)
    country: str = models.CharField(max_length=100, null=True, blank=True)

    phone_number: str = models.CharField(max_length=14, null=True, blank=True)
    birth_date: datetime.date = models.DateField(null=True, blank=True)

    has_car: bool = models.BooleanField(default=False)
    car_seats: int = models.IntegerField(default=1)

    can_host_peoples: bool = models.BooleanField(default=False)
    home_available_beds: int = models.IntegerField(default=1)
    home_rules: str = models.TextField(null=True, blank=True)

    faluche_nickname: str = models.CharField(
        max_length=150, null=True, blank=True
    )
    faluche_status = models.CharField(
        max_length=20, 
        choices=FalucheStatus.choices,
        null=True,
        blank=True
    )

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
        ordering = ["last_name", "first_name"]

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    objects = UserManager()

    def __str__(self):
        return "{} {}".format(self.first_name, self.last_name)
