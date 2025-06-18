from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from ft.event.models import Event
from ft.event.serializers import EventSerializer
from ft.event.permissions import IsStaffOrReadOnly


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsStaffOrReadOnly]

    def get_queryset(self):
        return Event.objects.filter(is_active=True)

    @action(detail=True, methods=["post"])
    def subscribe(self, request, *args, **kwargs):
        event = self.get_object()
        event.subscriptions.create_or_update(
            user=request.user,
            answer=request.data.get("answer", "YES"),
            can_invite=request.data.get("can_invite", True),
        )
        return Response(status=status.HTTP_200_OK)
