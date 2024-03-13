
from rest_framework import serializers
from restaurant.models import Menu

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = ["name", "created", "updated", "id", "restaurant_id","price"]
        read_only_fields = ["created","updated","id"]
