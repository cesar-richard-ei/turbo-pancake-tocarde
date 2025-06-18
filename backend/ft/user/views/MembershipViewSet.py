from ft.user.models import Membership
from ft.user.serializers import MembershipSerializer
from rest_framework import viewsets


class MembershipViewSet(viewsets.ModelViewSet):
    queryset = Membership.objects.all()
    serializer_class = MembershipSerializer

    def get_queryset(self):
        return User.objects.filter(is_active=True)
