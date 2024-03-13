from restaurant.models import Restaurant
from restaurant.serializers.restaurant_serializer import RestaurantSerializer
from rest_framework import generics, permissions
from restaurant.permissions import IsOwner 

class ListCreateRestaurant(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]
    # permission_classes = [IsOwner]
    serializer_class = RestaurantSerializer
    queryset = Restaurant.objects.all()

