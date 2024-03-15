from rest_framework import generics, response, permissions
from restaurant.models import User, OTP


class VerifyEmailAPIView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        otp = request.data.get("otp")
        exist_otp = OTP.objects.get(otp=otp)
        if exist_otp:
            user = User.objects.filter(email=exist_otp.user)
            user.update(is_active=True)
            exist_otp.delete()
            return response.Response("Verify email successful")
        return response.Response("Otp does not exist")
