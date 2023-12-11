from django.db import models
from base.models import MyUser
from cloudinary.models import CloudinaryField


class Profile(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    fullname = models.CharField(max_length=255)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10, null=True)
    contact_number = models.CharField(max_length=10, null=True)
    street_address = models.CharField(max_length=255, null=True)
    city = models.CharField(max_length=255, null=True)
    state = models.CharField(max_length=255, null=True)
    zip_code = models.CharField(max_length=255, null=True)
    country = models.CharField(max_length=255, null=True)
    profile_image = CloudinaryField('image', blank=True)
    blood_type = models.CharField(max_length=10, null=True)
    allergies = models.TextField(null=True)
    medications = models.TextField(null=True)

    def __str__(self):
        return self.user.fullname




class EmergencyContacts(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    fullname = models.CharField(max_length=255)
    relationship = models.CharField(max_length=255, null=True)
    contact_number = models.CharField(max_length=10, null=True)
    street_address = models.CharField(max_length=255, null=True)
    city = models.CharField(max_length=255, null=True)
    state = models.CharField(max_length=255, null=True)
    zip_code = models.CharField(max_length=255, null=True)
    country = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.user.fullname


