from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from ft.user.models import User, Membership


@admin.register(User)
class UserAdmin(UserAdmin):
    list_display = (
        "email",
        "first_name",
        "last_name",
        "faluche_nickname",
        "has_car",
        "faluche_status",
        "car_seats",
        "can_host_peoples",
        "home_available_beds",
        "home_rules",
        "is_staff",
        "is_active",
    )
    list_filter = ("is_staff", "is_active")
    readonly_fields = ("last_login", "date_joined")
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (
            _("Personal info"),
            {
                "fields": (
                    "first_name",
                    "last_name",
                )
            },
        ),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                ),
            },
        ),
        (
            _("Personal info"),
            {
                "fields": (
                    "address",
                    "city",
                    "zip_code",
                    "country",
                    "phone_number",
                    "birth_date",
                )
            },
        ),
        (
            _("Faluche info"),
            {
                "fields": (
                    "faluche_nickname",
                    "faluche_status",
                )
            },
        ),
        (
            _("Hebergement"),
            {
                "fields": (
                    "can_host_peoples",
                    "home_available_beds",
                    "home_rules",
                )
            },
        ),
        (
            _("Vehicule"),
            {
                "fields": (
                    "has_car",
                    "car_seats",
                )
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "password1",
                    "password2",
                    "is_staff",
                    "is_active",
                ),
            },
        ),
    )

    search_fields = ("email", "first_name", "last_name")
    ordering = ("last_name", "first_name", "email")
    list_filter = ("faluche_status", "has_car", "can_host_peoples")


@admin.register(Membership)
class MembershipAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "start_date",
        "end_date",
        "is_active",
        "created_at",
        "updated_at",
    )
    list_filter = ("is_active",)
    readonly_fields = ("created_at", "updated_at")
    search_fields = ("user",)
    ordering = ("start_date", "end_date", "user")
