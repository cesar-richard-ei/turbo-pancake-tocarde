from rest_framework import serializers
from ft.event.models import EventSubscription


class EventSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventSubscription
        fields = [
            "id",
            "event",
            "user",
            "answer",
            "can_invite",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "event",
            "user",
            "created_at",
            "updated_at",
        ]
