from django.contrib import admin
from ft.event.models import (
    Event,
    EventSubscription,
    EventHosting,
    EventHostingRequest,
    CarpoolTrip,
    CarpoolRequest,
)


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


@admin.register(CarpoolTrip)
class CarpoolTripAdmin(admin.ModelAdmin):
    list_display = (
        "driver",
        "event",
        "departure_city",
        "arrival_city",
        "departure_datetime",
        "seats_total",
        "seats_available",
        "is_active",
    )
    list_filter = ("event", "is_active", "has_return", "allow_luggage", "allow_pets")
    readonly_fields = ("created_at", "updated_at")
    search_fields = (
        "driver__first_name",
        "driver__last_name",
        "departure_city",
        "arrival_city",
    )
    ordering = ("-departure_datetime",)


@admin.register(CarpoolRequest)
class CarpoolRequestAdmin(admin.ModelAdmin):
    list_display = (
        "passenger",
        "trip",
        "status",
        "seats_requested",
        "is_paid",
        "is_active",
        "created_at",
    )
    list_filter = ("status", "is_active", "is_paid")
    readonly_fields = ("created_at", "updated_at")
    search_fields = (
        "passenger__first_name",
        "passenger__last_name",
        "trip__departure_city",
        "trip__arrival_city",
    )
    ordering = ("-created_at",)
