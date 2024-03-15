from rest_framework import permissions
from rest_framework import response
from rest_framework import generics
from django.core.mail import send_mail
from django.conf import settings
from restaurant.models import OTP, User
from random import choice
import string


def generate_otp():
    otp = "".join(choice(string.digits) for _ in range(6))
    return otp


class SendEmailAPIView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        otp = generate_otp()
        user = User.objects.get(email=request.data.get("email"))
        OTP.objects.update_or_create(user=user, defaults={"otp": otp})
        send_mail(
            subject="Verify your email",
            message="Your OTP is: " + str(otp),
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[request.data.get("email")],
            fail_silently=False,
        )
        return response.Response("Sending email successfully")
