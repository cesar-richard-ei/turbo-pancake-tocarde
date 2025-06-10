from rest_framework import viewsets
from tpt.user.models import User
from tpt.user.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(is_active=True)
