from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from django.conf import settings
from django.conf.urls.static import static


def health_check(request):
    return HttpResponse("OK")


urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/health_check', health_check, name='health_check'),
    path('api/accounts/', include('allauth.urls')),
    path("api/_allauth/", include("allauth.headless.urls")),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) \
    + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
