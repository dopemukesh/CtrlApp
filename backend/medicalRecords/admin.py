from django.contrib import admin
from .models import MedicalRecords



@admin.register(MedicalRecords)
class MedicalRecordsAdmin(admin.ModelAdmin):
    list_display = ('doctor', 'patient', 'diagnosis', 'prescription', 'remarks')
    list_filter = ('doctor', 'patient', 'diagnosis', 'prescription', 'remarks')
    search_fields = ('doctor', 'patient', 'diagnosis', 'prescription', 'remarks')
    ordering = ('doctor', 'patient', 'diagnosis', 'prescription', 'remarks')
