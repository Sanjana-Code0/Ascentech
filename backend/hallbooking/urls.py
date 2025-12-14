from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # API endpoints handled by DRF Router from the 'bookings' app
    path('api/', include('bookings.urls')),
]