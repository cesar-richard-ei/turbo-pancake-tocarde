from django.urls import include, path
from tpt.resources.views import LinkViewSet
from rest_framework import routers

api_router = routers.DefaultRouter()
api_router.register(r"links", LinkViewSet, basename="link")

urlpatterns = [
    path("", include(api_router.urls)),
]
