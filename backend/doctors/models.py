from django.db import models
from base.models import MyUser
from cloudinary.models import CloudinaryField
from user_profile.models import Profile


class AvailabilityTimeTable(models.Model):
    doctor = models.ForeignKey('Doctor', on_delete=models.CASCADE, related_name='availability_timetables')
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return f"{self.doctor} - {self.date} - {self.start_time} - {self.end_time}"

class Doctor(models.Model):
    user = models.OneToOneField(MyUser, on_delete=models.CASCADE)
    license_info = CloudinaryField('image', blank=True)
    specialization = models.CharField(max_length=255)
    hospital = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    zip_code = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    profile_image = CloudinaryField('image', blank=True)
    experience = models.CharField(max_length=255)
    timings = models.ManyToManyField(AvailabilityTimeTable, blank=True, related_name='doctors')
    approved = models.BooleanField(default=False)

    def __str__(self):
        return self.user.fullname


class Appointment(models.Model):
    doctor = models.ForeignKey('Doctor', on_delete=models.CASCADE, related_name='appointment')
    patient = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='appointment')
    date = models.name = models.ForeignKey(AvailabilityTimeTable, related_name='appointment', on_delete=models.CASCADE)
    additional_info = models.TextField(blank=True)

    def __str__(self):
        return self.doctor.user.fullname + " - " + self.patient.user.fullname + " - " + str(self.date)



class Diagnosis(models.Model):
    doctor = models.ForeignKey('Doctor', on_delete=models.CASCADE, related_name='diagnosis')
    patient = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='diagnosis')
    date = models.name = models.ForeignKey(AvailabilityTimeTable, related_name='diagnosis', on_delete=models.CASCADE)
    symptoms = models.CharField(max_length=255)
    diagnosis = models.CharField(max_length=255)
    diagnosis_image = CloudinaryField('image', blank=True)
    remarks = models.CharField(max_length=255)
    additional_info = models.TextField(blank=True)

    def __str__(self):
        return self.doctor.user.fullname + " - " + self.patient.user.fullname + " - " + str(self.date)



class Prescriptions(models.Model):
    doctor = models.ForeignKey('Doctor', on_delete=models.CASCADE, related_name='medical_records')
    patient = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='medical_records')
    diagnosis = models.ForeignKey(Diagnosis, on_delete=models.CASCADE, related_name='medical_records')
    date = models.name = models.ForeignKey(AvailabilityTimeTable, related_name='medical_records', on_delete=models.CASCADE)
    prescription = models.CharField(max_length=255)
    prescription_image = CloudinaryField('image', blank=True)
    remarks = models.CharField(max_length=255)
    additional_info = models.TextField(blank=True)

    def __str__(self):
        return self.doctor.user.fullname + " - " + self.patient.user.fullname + " - " + str(self.date)
