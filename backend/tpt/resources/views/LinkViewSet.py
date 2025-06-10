from rest_framework import viewsets
from tpt.resources.models import Link
from tpt.resources.serializers import LinkSerializer


class LinkViewSet(viewsets.ModelViewSet):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer

    def get_queryset(self):
        return Link.objects.filter(is_active=True)
