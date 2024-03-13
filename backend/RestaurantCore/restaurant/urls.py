from django.urls import path
from .apis.list_restaurant_api import ListCreateRestaurant
from .apis.detail_restaurant_api import DetailRestaurantAPIView 
from .apis.detail_menu_api import DetailMenuAPIView
from .apis.list_menu_api import MenuAPIView 
from .apis.user_register_api import UserRegister
from .apis.verify_email_api import VerifyEmailAPIView
from .apis.send_email_api import SendEmailAPIView

urlpatterns = [
    path("restaurant/", ListCreateRestaurant.as_view(), name="restaurant-list"),
    path("restaurant/<int:pk>/", DetailRestaurantAPIView.as_view(), name="restaurant-detail"),
    path("restaurant/<int:pk>/list-menu/", MenuAPIView.as_view(), name="restaurant-detail"),
    path("restaurant/<int:pk>/list-menu/<int:fk>/", DetailMenuAPIView.as_view(), name="menu-detail"),
    path("auth/register/", UserRegister.as_view(), name="user-register"),
    path("auth/send-email/", SendEmailAPIView.as_view()),
    path("auth/verify-email/", VerifyEmailAPIView.as_view()),
] 
