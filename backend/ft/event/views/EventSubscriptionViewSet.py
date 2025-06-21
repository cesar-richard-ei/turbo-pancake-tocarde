from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from ft.event.models import EventSubscription
from ft.event.serializers import EventSubscriptionSerializer


class EventSubscriptionViewSet(viewsets.ModelViewSet):
    queryset = EventSubscription.objects.all()
    serializer_class = EventSubscriptionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Cette vue retourne une liste de toutes les inscriptions
        pour les administrateurs, ou seulement les inscriptions de
        l'utilisateur connecté pour les utilisateurs normaux.
        """
        user = self.request.user
        if user.is_staff:
            return EventSubscription.objects.filter(is_active=True)
        else:
            return EventSubscription.objects.filter(is_active=True, user=user)
