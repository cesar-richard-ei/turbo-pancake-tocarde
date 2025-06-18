from django.urls import include, path
from ft.user.views import CurrentUserView, UserViewSet, MembershipViewSet
from rest_framework import routers

api_router = routers.DefaultRouter()
api_router.register(r"users", UserViewSet, basename="user")
api_router.register(r"memberships", MembershipViewSet, basename="membership")

urlpatterns = [
    path("", include(api_router.urls)),
    path("me/", CurrentUserView.as_view(), name="current-user"),
]
