from rest_framework import permissions
from rest_framework import generics
from restaurant.models import User
from restaurant.serializers.user_serializer import UserSerializer


class ListUserAPIView(generics.ListAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = User.objects.all()
    serializer_class = UserSerializer
