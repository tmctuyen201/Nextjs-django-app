from rest_framework import serializers
from restaurant.models import User, Role 

class UserSerializerMixin:
    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        role = Role.objects.create(user=user)
        role.save()
        user.set_password(validated_data['password'])
        user.save()
        return user
    def validate_password(self, value):
        if len(value) == 0 or len(value) <= 8:
            raise serializers.ValidationError("Password must be at least 8 characters long")
        return value
    def validate_email(self, value):
        if "@" not in value or len(value) == 0:
            raise serializers.ValidationError("Invalid email address")
        return value

class UserSerializer(UserSerializerMixin, serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username',"password", "is_active"]

