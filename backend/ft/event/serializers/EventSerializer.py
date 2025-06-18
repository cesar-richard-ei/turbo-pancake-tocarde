from rest_framework import serializers
from ft.event.models import Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            "id",
            "name",
            "description",
            "location",
            "start_date",
            "end_date",
            "url_signup",
            "url_website",
            "prices",
            "is_active",
            "at_compiegne",
            "is_public",
            "type",
        ]
        read_only_fields = [
            "created_at",
            "updated_at",
        ]
