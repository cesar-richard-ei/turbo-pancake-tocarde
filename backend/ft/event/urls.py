from django.urls import include, path
from ft.event.views import EventViewSet, EventSubscriptionViewSet
from rest_framework import routers

api_router = routers.DefaultRouter()
api_router.register(r"events", EventViewSet, basename="event")
api_router.register(
    r"event-subscriptions",
    EventSubscriptionViewSet,
    basename="event-subscription",
)

urlpatterns = [
    path("", include(api_router.urls)),
]
