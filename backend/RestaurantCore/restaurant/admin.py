from django.contrib import admin
from .models import Role, User, OTP

# Register your models here.
admin.site.register(Role)
admin.site.register(User)
admin.site.register(OTP)
