from django.contrib import admin
from .models import AvailabilityTimeTable, Doctor, Appointment, Prescriptions


@admin.register(AvailabilityTimeTable)
class AvailabilityTimeTableAdmin(admin.ModelAdmin):
    list_display = ('doctor', 'date', 'start_time', 'end_time')
    list_filter = ('doctor', 'date')
    search_fields = ('doctor', 'date')
    ordering = ('doctor', 'date')
    list_editable = ('start_time', 'end_time')
    readonly_fields = ('start_time', 'end_time')
    fields = ('doctor', 'date','start_time', 'end_time')
    date_hierarchy = 'date'
    ordering = ('doctor', 'date')


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ('user', 'specialization', 'hospital', 'address', 'city', 'state')
    list_filter = ('user', 'specialization', 'hospital', 'address', 'city', 'state')
    search_fields = ('user', 'specialization', 'hospital', 'address', 'city', 'state')
    ordering = ('user', 'specialization', 'hospital', 'address', 'city', 'state')


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('doctor', 'patient', 'date')
    list_filter = ('doctor', 'patient', 'date')
    search_fields = ('doctor', 'patient', 'date')
    ordering = ('doctor', 'patient', 'date')


@admin.register(Prescriptions)
class PrescriptionsAdmin(admin.ModelAdmin):
    list_display = ('doctor', 'patient', 'date')
    list_filter = ('doctor', 'patient', 'date')
    search_fields = ('doctor', 'patient', 'date')
    ordering = ('doctor', 'patient', 'date')
