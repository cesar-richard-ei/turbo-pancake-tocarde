from rest_framework import viewsets
from tpt.resources.models import Link
from tpt.resources.serializers import LinkSerializer
from tpt.event.permissions import IsStaffOrReadOnly


class LinkViewSet(viewsets.ModelViewSet):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer
    permission_classes = [IsStaffOrReadOnly]

    def get_queryset(self):
        return Link.objects.filter(is_active=True)
