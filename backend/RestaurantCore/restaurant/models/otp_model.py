from django.db import models
from .users_model import User

class OTP(models.Model):
    otp = models.CharField(max_length=6, null = True)
    created_time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
