from rest_framework import serializers
from ft.user.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "last_login",
            "is_superuser",
            "is_staff",
            "is_active",
            "date_joined",
            "email",
            "last_name",
            "first_name",
            "address",
            "city",
            "zip_code",
            "country",
            "phone_number",
            "birth_date",
            "has_car",
            "car_seats",
            "can_host_peoples",
            "home_available_beds",
            "home_rules",
            "faluche_nickname",
            "faluche_status",
        ]
        read_only_fields = [
            "last_login",
            "date_joined",
            "is_superuser",
            "is_staff",
            "is_active",
        ]
        extra_kwargs = {
            "password": {"write_only": True},
        }
