from django.urls import include, path
from ft.event.views import (
    EventViewSet,
    EventSubscriptionViewSet,
    EventHostingViewSet,
    EventHostingRequestViewSet,
    CarpoolTripViewSet,
    CarpoolRequestViewSet,
    CarpoolPaymentViewSet,
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
api_router.register(
    r"carpool-trips",
    CarpoolTripViewSet,
    basename="carpool-trip",
)
api_router.register(
    r"carpool-requests",
    CarpoolRequestViewSet,
    basename="carpool-request",
)
api_router.register(
    r"carpool-payments",
    CarpoolPaymentViewSet,
    basename="carpool-payment",
)

urlpatterns = [
    path("", include(api_router.urls)),
]
