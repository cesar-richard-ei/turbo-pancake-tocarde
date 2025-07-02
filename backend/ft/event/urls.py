from django.urls import include, path
from ft.event.views import (
    EventViewSet,
    EventSubscriptionViewSet,
    EventHostingViewSet,
    EventHostingRequestViewSet,
)
from rest_framework import routers

api_router = routers.DefaultRouter()
api_router.register(r"events", EventViewSet, basename="event")
api_router.register(
    r"event-subscriptions",
    EventSubscriptionViewSet,
    basename="event-subscription",
)
api_router.register(
    r"event-hostings",
    EventHostingViewSet,
    basename="event-hosting",
)
api_router.register(
    r"event-hosting-requests",
    EventHostingRequestViewSet,
    basename="event-hosting-request",
)

urlpatterns = [
    path("", include(api_router.urls)),
]
