
from django.db import models
from django.contrib.auth.models import AbstractUser
from .restaurants_model import Restaurant

class User(AbstractUser):
    username = models.CharField(max_length=100, unique=True, null=True)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, null=True)
    is_active = models.BooleanField(default=False )
    # USERNAME_FIELD = 'email'
    REQUIRED_FIELD = ['email']

    def __str__(self) -> str:
        return self.email
