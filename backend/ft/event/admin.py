from django.contrib import admin
from ft.event.models import Event, EventSubscription


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = (
        "type",
        "name",
        "description",
        "location",
        "start_date",
        "end_date",
        "is_active",
        "created_at",
        "updated_at",
    )
    list_filter = ("type", "is_active", "at_compiegne", "is_public")
    readonly_fields = ("created_at", "updated_at")
    search_fields = ("name", "description", "location")
    ordering = ("start_date", "name")


@admin.register(EventSubscription)
class EventSubscriptionAdmin(admin.ModelAdmin):
    list_display = (
        "event",
        "user",
        "is_active",
        "can_invite",
        "created_at",
        "updated_at",
    )
    list_filter = ("is_active",)
    readonly_fields = ("created_at", "updated_at")
    search_fields = ("event", "user")
    ordering = ("event", "user")
