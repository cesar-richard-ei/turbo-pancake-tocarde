from rest_framework import serializers
from ft.event.models import EventHostingRequest, EventHosting
from ft.user.serializers import UserSerializer
from ft.event.serializers import EventHostingSerializer


class EventHostingRequestSerializer(serializers.ModelSerializer):
    """
    Serializer pour le modèle EventHostingRequest
    """

    # En lecture : objets complets
    # En écriture : simplement l'ID
    requester = UserSerializer(read_only=True)
    hosting = EventHostingSerializer(read_only=True)

    class Meta:
        model = EventHostingRequest
        fields = [
            "id",
            "hosting",
            "requester",
            "status",
            "message",
            "host_message",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "requester",
            "status",
            "host_message",
            "created_at",
            "updated_at",
        ]

    def validate(self, data):
        """
        Vérifie que l'utilisateur ne fait pas une demande pour son propre hébergement
        et qu'il n'a pas déjà fait une demande pour le même événement.
        """
        hosting = data.get("hosting")
        requester = self.context["request"].user

        # Vérification que l'utilisateur n'est pas l'hôte
        if hosting.host == requester:
            raise serializers.ValidationError(
                {"hosting": "Vous ne pouvez pas demander votre propre hébergement."}
            )

        # Vérification que l'utilisateur n'a pas déjà une demande active
        # pour le même événement
        event = hosting.event
        existing_requests = EventHostingRequest.objects.filter(
            hosting__event=event,
            requester=requester,
            status__in=["PENDING", "ACCEPTED"],
        )

        # Exclure la demande actuelle en cas de mise à jour
        if self.instance:
            existing_requests = existing_requests.exclude(pk=self.instance.pk)

        if existing_requests.exists():
            raise serializers.ValidationError(
                {"hosting": "Vous avez déjà une demande en cours pour cet événement."}
            )

        return data


class EventHostingRequestActionSerializer(serializers.Serializer):
    """
    Serializer pour les actions sur les demandes d'hébergement
    """

    host_message = serializers.CharField(required=False, allow_blank=True)

    def validate(self, data):
        return data
