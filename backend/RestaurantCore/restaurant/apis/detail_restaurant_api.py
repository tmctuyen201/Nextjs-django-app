from rest_framework import generics, permissions
from restaurant.models import Restaurant
from restaurant.serializers.restaurant_serializer import RestaurantSerializer
from restaurant.permissions import IsOwner


class DetailRestaurantAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_class = [permissions.AllowAny]
    permission_class = [IsOwner]
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
