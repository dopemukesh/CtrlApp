from django.contrib import admin
from .models import Profile, EmergencyContacts



@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user' ,'fullname', 'date_of_birth','gender')
    list_filter = ('date_of_birth', 'gender', 'contact_number', 'street_address', 'city', 'state')
    search_fields = ('date_of_birth', 'gender', 'contact_number', 'street_address', 'city', 'state', )
    ordering = ('date_of_birth', 'gender', 'contact_number','street_address', 'city','state')
    date_hierarchy = 'date_of_birth'


@admin.register(EmergencyContacts)
class EmergencyContactsAdmin(admin.ModelAdmin):
    list_display = ('user','fullname', 'relationship', 'contact_number', 'street_address', 'city', 'state')
    list_filter = ('contact_number', 'street_address', 'city', 'state')
    search_fields = ('contact_number', 'street_address', 'city', 'state', )
    ordering = ('contact_number', 'street_address', 'city','state')

