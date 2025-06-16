from rest_framework import viewsets
from tpt.event.models import Event
from tpt.event.serializers import EventSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get_queryset(self):
        return Event.objects.filter(is_active=True)
