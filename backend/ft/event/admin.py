from django.contrib import admin
from ft.event.models import Event, EventSubscription, EventHosting, EventHostingRequest


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
        "answer",
        "created_at",
        "updated_at",
    )
    list_filter = ("answer",)
    readonly_fields = ("created_at", "updated_at")
    search_fields = ("event", "user")
    ordering = ("event", "user", "answer")


@admin.register(EventHosting)
class EventHostingAdmin(admin.ModelAdmin):
    list_display = (
        "event",
        "host",
        "available_beds",
        "is_active",
        "created_at",
        "updated_at",
    )
    list_filter = ("is_active",)
    readonly_fields = ("created_at", "updated_at")
    search_fields = ("event__name", "host__first_name", "host__last_name")
    ordering = ("event", "host")


@admin.register(EventHostingRequest)
class EventHostingRequestAdmin(admin.ModelAdmin):
    list_display = (
        "hosting",
        "requester",
        "status",
        "created_at",
        "updated_at",
    )
    list_filter = ("status",)
    readonly_fields = ("created_at", "updated_at")
    search_fields = (
        "hosting__event__name",
        "requester__first_name",
        "requester__last_name",
    )
    ordering = ("-created_at",)
