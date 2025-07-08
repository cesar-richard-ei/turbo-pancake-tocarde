from rest_framework import serializers
from ft.user.serializers import UserSerializer
from ft.event.models import CarpoolRequest, CarpoolTrip
from .CarpoolTripSerializer import CarpoolTripSerializer


class CarpoolRequestSerializer(serializers.ModelSerializer):
    """
    Sérialiseur pour le modèle CarpoolRequest.
    """

    passenger = UserSerializer(read_only=True)
    passenger_id = serializers.PrimaryKeyRelatedField(
        source="passenger",
        queryset=CarpoolTrip.objects.all(),
        write_only=True,
        required=False,
    )
    trip = CarpoolTripSerializer(read_only=True)
    trip_id = serializers.PrimaryKeyRelatedField(
        source="trip",
        queryset=CarpoolTrip.objects.all(),
        write_only=True,
    )
    status_display = serializers.CharField(source="get_status_display", read_only=True)
    is_paid = serializers.BooleanField(read_only=True)
    total_paid = serializers.DecimalField(
        max_digits=8,
        decimal_places=2,
        read_only=True,
    )
    expected_amount = serializers.DecimalField(
        max_digits=8,
        decimal_places=2,
        read_only=True,
    )

    class Meta:
        model = CarpoolRequest
        fields = [
            "id",
            "passenger",
            "passenger_id",
            "trip",
            "trip_id",
            "status",
            "status_display",
            "seats_requested",
            "message",
            "response_message",
            "is_active",
            "is_paid",
            "total_paid",
            "expected_amount",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "status",
            "status_display",
            "created_at",
            "updated_at",
            "is_paid",
            "total_paid",
            "expected_amount",
        ]

    def create(self, validated_data):
        # Si aucun passager n'est spécifié, on utilise l'utilisateur courant
        if "passenger" not in validated_data:
            validated_data["passenger"] = self.context["request"].user

        # On vérifie que le conducteur n'essaie pas de faire une demande sur son propre trajet
        if validated_data["passenger"] == validated_data["trip"].driver:
            raise serializers.ValidationError(
                {
                    "passenger": "Le conducteur ne peut pas demander une place sur son propre trajet."
                }
            )

        # On vérifie qu'il reste assez de places
        trip = validated_data["trip"]
        seats_requested = validated_data.get("seats_requested", 1)
        if trip.seats_available < seats_requested:
            raise serializers.ValidationError(
                {
                    "seats_requested": f"Il ne reste que {trip.seats_available} place(s) disponible(s)."
                }
            )

        # Par défaut, le statut est "PENDING"
        validated_data["status"] = "PENDING"

        return super().create(validated_data)


class CarpoolRequestActionSerializer(serializers.Serializer):
    """
    Sérialiseur pour les actions sur une demande de covoiturage.
    """

    action = serializers.ChoiceField(
        choices=["accept", "reject", "cancel"],
        required=True,
    )
    response_message = serializers.CharField(required=False, allow_blank=True)

    def validate(self, data):
        request = self.context.get("request")
        carpool_request = self.context.get("carpool_request")
        user = request.user

        # Vérifier qui peut faire quelle action
        if data["action"] == "accept" or data["action"] == "reject":
            # Seul le conducteur peut accepter ou refuser
            if user != carpool_request.trip.driver:
                raise serializers.ValidationError(
                    {
                        "action": "Seul le conducteur peut accepter ou refuser une demande."
                    }
                )

            # On ne peut pas accepter ou refuser une demande déjà traitée
            if carpool_request.status != "PENDING":
                raise serializers.ValidationError(
                    {
                        "action": f"Cette demande a déjà été {carpool_request.get_status_display().lower()}."
                    }
                )

            # Pour une acceptation, vérifier qu'il reste des places
            if data["action"] == "accept":
                trip = carpool_request.trip
                if trip.seats_available < carpool_request.seats_requested:
                    raise serializers.ValidationError(
                        {
                            "action": f"Il ne reste que {trip.seats_available} place(s) disponible(s)."
                        }
                    )

        elif data["action"] == "cancel":
            # Seul le passager peut annuler sa demande
            if user != carpool_request.passenger:
                raise serializers.ValidationError(
                    {"action": "Seul le passager peut annuler sa demande."}
                )

            # On ne peut pas annuler une demande déjà annulée ou refusée
            if carpool_request.status in ["CANCELLED", "REJECTED"]:
                raise serializers.ValidationError(
                    {
                        "action": f"Cette demande a déjà été {carpool_request.get_status_display().lower()}."
                    }
                )

        return data
