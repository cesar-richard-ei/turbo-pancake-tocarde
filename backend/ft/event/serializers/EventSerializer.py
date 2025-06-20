from rest_framework import serializers
from ft.event.models import Event
from ft.event.models import EventSubscription


class EventSerializer(serializers.ModelSerializer):
    subscriptions_count = serializers.SerializerMethodField()
    first_subscribers = serializers.SerializerMethodField()

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
            "subscriptions_count",
            "first_subscribers",
        ]
        read_only_fields = [
            "created_at",
            "updated_at",
        ]

    def get_subscriptions_count(self, obj):
        return obj.eventsubscription_set.filter(is_active=True, answer="YES").count()

    def get_first_subscribers(self, obj):
        subs = (
            obj.eventsubscription_set.filter(is_active=True, answer="YES")
            .select_related("user")
            .order_by("created_at")[:3]
        )
        initials = []
        for sub in subs:
            first_initial = (sub.user.first_name or "").strip()[:1]
            last_initial = (sub.user.last_name or "").strip()[:1]
            if first_initial or last_initial:
                initials.append(f"{first_initial}{last_initial}".upper())
            else:
                initials.append(sub.user.email[:2].upper())
        return initials
