from django.db import models
from .restaurants_model import Restaurant 

# Create your models here.
class Menu(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    price = models.FloatField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name
