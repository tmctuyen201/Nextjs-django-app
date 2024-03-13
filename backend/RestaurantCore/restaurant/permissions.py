from rest_framework import permissions
from .models import Role
class IsOwner(permissions.BasePermission):
    message = "Owner's restaurant can edit"
    def has_object_permission(self,request,view,obj):
        if request.user.is_staff:
            return True
        return Role.objects.filter(user=request.user, is_owner=True).exists()
