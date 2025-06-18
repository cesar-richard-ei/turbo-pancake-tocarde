from rest_framework import serializers
from ft.user.models import Membership


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = [
            "id",
            "user",
            "start_date",
            "end_date",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "created_at",
            "updated_at",
        ]
        extra_kwargs = {
            "user": {"read_only": True},
        }
