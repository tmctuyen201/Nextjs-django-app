from rest_framework import generics
from restaurant.models import Menu
from restaurant.serializers.menu_serializer import MenuSerializer
from restaurant.permissions import IsOwner


class DetailMenuAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_class = [IsOwner]
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
