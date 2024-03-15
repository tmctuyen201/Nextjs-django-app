from rest_framework import permissions
from rest_framework import generics
from restaurant.models import User
from restaurant.serializers.user_serializer import UserSerializer


class UserRegister(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer
