from rest_framework import viewsets
from ft.event.models import Event
from ft.event.serializers import EventSerializer
from ft.event.permissions import IsStaffOrReadOnly


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsStaffOrReadOnly]

    def get_queryset(self):
        return Event.objects.filter(is_active=True)
