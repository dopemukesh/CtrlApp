from django.db import models
from doctors.models import Doctor, Prescriptions, Diagnosis
from user_profile.models import Profile
from cloudinary.models import CloudinaryField
import uuid


class MedicalRecords(models.Model):
    ID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='med_records')
    patient = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='med_records')
    diagnosis = models.ForeignKey(Diagnosis, on_delete=models.CASCADE, related_name='med_records')
    prescription = models.ForeignKey(Prescriptions, on_delete=models.CASCADE, related_name='med_records')
    remarks = models.CharField(max_length=255)

    def __str__(self):
        return self.doctor.user.fullname + " - " + self.patient.user.fullname + " - " + str(self.diagnosis.date)


