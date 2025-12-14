from rest_framework.routers import DefaultRouter
from .views import BookingViewSet

router = DefaultRouter()
# Register the BookingViewSet to handle /bookings/ and /bookings/{pk}/
router.register(r'bookings', BookingViewSet)

urlpatterns = router.urls