from django.contrib.auth.models import (
    AbstractUser,
    UserManager as DjangoUserManager,
)


class UserManager(DjangoUserManager):
    def create_user(self, email, password=None, **extra_fields):
        extra_fields["username"] = email
        return super().create_user(email=email, password=password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields["username"] = email
        return super().create_superuser(email=email, password=password, **extra_fields)


class User(AbstractUser):
    objects = UserManager()
    # Ajoute tes champs custom ici si besoin
