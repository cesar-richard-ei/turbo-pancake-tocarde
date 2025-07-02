from rest_framework import permissions


class IsStaffOrReadOnly(permissions.BasePermission):
    """
    Permission personnalisée qui autorise l'accès en lecture à tous les
    utilisateurs, mais qui n'autorise les opérations d'écriture qu'aux
    utilisateurs avec is_staff=True.
    """

    def has_permission(self, request, view):
        # Permet toujours les méthodes GET, HEAD ou OPTIONS
        if request.method in permissions.SAFE_METHODS:
            return True

        # Pour les méthodes d'écriture, vérifie si l'utilisateur est staff
        return request.user and request.user.is_staff


class IsEventSubscriptionOwnerOrReadOnly(permissions.BasePermission):
    """
    Permission personnalisée pour permettre uniquement au propriétaire
    d'une inscription de la modifier.
    """

    def has_object_permission(self, request, view, obj):
        # Les méthodes de lecture sont autorisées pour tout utilisateur
        # authentifié
        if request.method in permissions.SAFE_METHODS:
            return True

        # L'écriture n'est autorisée que pour le propriétaire de l'inscription
        return obj.user == request.user


class IsHostingOwnerOrReadOnly(permissions.BasePermission):
    """
    Permission personnalisée pour permettre uniquement à l'hôte
    de modifier son offre d'hébergement.
    """

    def has_object_permission(self, request, view, obj):
        # Les méthodes de lecture sont autorisées pour tout utilisateur
        # authentifié
        if request.method in permissions.SAFE_METHODS:
            return True

        # L'écriture n'est autorisée que pour l'hôte de l'hébergement
        return obj.host == request.user


class IsHostingRequestRequesterOrHost(permissions.BasePermission):
    """
    Permission personnalisée pour les demandes d'hébergement.
    - Le demandeur peut créer et voir ses propres demandes
    - L'hôte peut voir et répondre aux demandes pour son hébergement
    """

    def has_permission(self, request, view):
        # Pour la création de nouvelles demandes, tout utilisateur authentifié peut le faire
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Le demandeur de l'hébergement ou l'hôte peuvent consulter/modifier la demande
        return obj.requester == request.user or obj.hosting.host == request.user
