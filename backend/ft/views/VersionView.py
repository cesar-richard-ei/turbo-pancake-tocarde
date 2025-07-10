import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny


class VersionView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        version = os.environ.get("VERSION", "development")
        return Response({"version": version})
