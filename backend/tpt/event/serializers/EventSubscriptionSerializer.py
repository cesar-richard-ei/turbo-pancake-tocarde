from rest_framework import serializers
from tpt.event.models import EventSubscription


class EventSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventSubscription
        fields = [
            "id",
            "event",
            "user",
            "is_active",
            "can_invite",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "event",
            "user",
            "created_at",
            "updated_at",
        ]
