from utils.check_role import UserRole
from rest_framework import generics, permissions, views, response
from rest_framework.exceptions import PermissionDenied
from restaurant.models import Menu
from restaurant.serializers.menu_serializer import MenuSerializer


class MenuAPIView(views.APIView):
    permission_class = [permissions.IsAuthenticated]

    # serializer_class = MenuSerializer
    def get(self, request, pk):
        queryset = Menu.objects.filter(restaurant_id=pk)
        serializer = MenuSerializer(queryset, many=True)
        return response.Response(serializer.data)

    def post(self, request, pk):
        user_role = UserRole(request.user)
        if not user_role.is_owner():
            raise PermissionDenied()
        serializer = MenuSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(restaurant_id=pk)
        return response.Response(serializer.data)
