from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.exceptions import NotAuthenticated
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ft.user.serializers import UserSerializer

User = get_user_model()


class CurrentUserView(APIView):
    """
    View to get the currently logged-in user
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def handle_exception(self, exc):
        if isinstance(exc, NotAuthenticated):
            return Response(
                {"detail": "Aucun utilisateur n'est connecté."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        return super().handle_exception(exc)
