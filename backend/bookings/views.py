from rest_framework import viewsets
from .models import Booking
from .serializers import BookingSerializer

class BookingViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing Booking instances.
    This handles all list, create, retrieve, update, and destroy operations
    using the Django ORM via the ModelSerializer.
    """
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer