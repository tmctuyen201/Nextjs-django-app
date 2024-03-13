from django.db import models
from .users_model import User

class Role(models.Model):
    is_owner = models.BooleanField(default=False)
    is_customer = models.BooleanField(default=False)
    is_employee = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE )
