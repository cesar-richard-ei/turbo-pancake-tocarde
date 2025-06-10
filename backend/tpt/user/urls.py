from django.urls import include, path
from tpt.user.views import UserViewSet
from rest_framework import routers

api_router = routers.DefaultRouter()
api_router.register(r"users", UserViewSet, basename="user")

urlpatterns = [
    path("", include(api_router.urls)),
]
