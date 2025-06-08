from django.contrib import admin
from django.urls import path
from django.http import HttpResponse
from django.conf import settings
from django.conf.urls.static import static

def health_check(request):
    return HttpResponse("OK")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', health_check, name='health_check'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) \
  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
