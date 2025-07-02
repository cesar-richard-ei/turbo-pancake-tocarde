from rest_framework import serializers
from ft.event.models import EventHosting
from ft.user.serializers import UserSerializer


class EventHostingSerializer(serializers.ModelSerializer):
    """
    Serializer pour le modèle EventHosting
    """

    host = UserSerializer(read_only=True)

    class Meta:
        model = EventHosting
        fields = [
            "id",
            "event",
            "host",
            "available_beds",
            "custom_rules",
            "address_override",
            "city_override",
            "zip_code_override",
            "country_override",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "host", "created_at", "updated_at"]

    def create(self, validated_data):
        """
        Crée une offre d'hébergement en tenant compte des valeurs
        par défaut du profil utilisateur si nécessaire.
        """
        user = validated_data.get("host")

        # Si l'utilisateur n'a pas précisé le nombre de lits,
        # on utilise celui de son profil
        if "available_beds" not in validated_data:
            validated_data["available_beds"] = user.home_available_beds

        # Si l'utilisateur n'a pas précisé de règles spécifiques,
        # on utilise celles de son profil
        if "custom_rules" not in validated_data:
            validated_data["custom_rules"] = user.home_rules

        return super().create(validated_data)
