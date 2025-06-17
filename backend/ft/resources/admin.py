from django.contrib import admin
from django.http import HttpRequest

from ft.resources.models import Link


@admin.register(Link)
class LinkAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "description",
        "url",
        "is_active",
        "created_at",
        "updated_at",
    )
    list_filter = ("is_active",)
    readonly_fields = ("created_at", "updated_at")
    search_fields = ("name", "description", "url")
    ordering = ("name",)

    def has_module_permission(self, request: HttpRequest) -> bool:
        return request.user.is_superuser or request.user.is_staff

    def has_change_permission(self, request: HttpRequest, obj=None) -> bool:
        if request.user.is_superuser or request.user.is_staff:
            return True
        return obj is not None and obj.id == request.user.id

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(id=request.user.id)
