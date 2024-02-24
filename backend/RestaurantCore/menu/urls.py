from rest_framework import routers
from menu.views import MenuViewSet

router = routers.SimpleRouter()
router.register(r"menu", MenuViewSet, basename = 'menu')
urlpatterns = router.urls
