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
