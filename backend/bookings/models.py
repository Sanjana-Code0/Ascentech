from django.db import models

class Booking(models.Model):
    """
    Model representing a Hall Booking, based on the provided image fields.
    All CRUD operations will use this ORM model.
    """
    # Applicant Details
    applicant_name = models.CharField(max_length=255)
    email = models.EmailField()
    mobile_no = models.CharField(max_length=15)
    
    # Booking Details
    hall_name = models.CharField(max_length=100)
    purpose_of_use = models.TextField()
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    
    # Financials
    rent = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    additional_charges = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    
    # Status/Reference
    application_no = models.CharField(max_length=50, unique=True)
    receipt_no = models.CharField(max_length=50)
    receipt_date = models.DateField(null=True, blank=True)
    remark = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, default='Pending') # e.g., Confirmed, Pending
    booking_time_slot = models.CharField(max_length=50, blank=True, null=True) # Combined field for 'Booking Time' and 'Slot' from image
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.application_no} - {self.applicant_name}"

    class Meta:
        ordering = ['-created_at']