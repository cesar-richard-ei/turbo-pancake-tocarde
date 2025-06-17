from rest_framework import viewsets
from tpt.event.models import EventSubscription
from tpt.event.serializers import EventSubscriptionSerializer
from tpt.event.permissions import IsStaffOrReadOnly


class EventSubscriptionViewSet(viewsets.ModelViewSet):
    queryset = EventSubscription.objects.all()
    serializer_class = EventSubscriptionSerializer
    permission_classes = [IsStaffOrReadOnly]

    def get_queryset(self):
        return EventSubscription.objects.filter(is_active=True)
