from rest_framework import serializers
from ft.event.models import EventSubscription


class EventSubscribeActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventSubscription
        fields = [
            "id",
            "answer",
            "can_invite",
        ]
        read_only_fields = [
            "id",
        ]
