from django.urls import include, path
from rest_framework import routers

api_router = routers.DefaultRouter()

urlpatterns = [
    path("", include(api_router.urls)),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework"))
]
