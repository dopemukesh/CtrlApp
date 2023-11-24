from rest_framework import serializers
from .models import *
from base.models import MyUser
from user_profile.serializers import MyUserSerializer


class DoctorSerializer(serializers.ModelSerializer):
    user = MyUserSerializer()
    license_info = serializers.SerializerMethodField()
    profile_image = serializers.SerializerMethodField()

    def get_profile_image(self, obj):
        """
        Returns the URL of the profile image for the given object.

        Args:
            obj: The object for which to retrieve the profile image.

        Returns:
            str: The URL of the profile image, or None if the object does not have a profile image.
        """
        if obj.profile_image:
            return obj.profile_image.url

    def get_license_info(self, obj):
        """
        Returns the URL of the license image for the given object.

        Args:
            obj: The object for which to retrieve the license image.

        Returns:
            str: The URL of the license image, or None if the object does not have a license image.
        """
        if obj.license_info:
            return obj.license_info.url

    class Meta:
        model = Doctor
        fields = '__all__'


class AppointmentDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ("date", "additional_info")



class AvailabilityTimeTableSerializer(serializers.ModelSerializer):
    Doctor = DoctorSerializer()
    class Meta:
        model = AvailabilityTimeTable
        fields = '__all__'


class AppointmentSerializer(serializers.ModelSerializer):
    doctor = DoctorSerializer()
    patient = MyUserSerializer()
    class Meta:
        model = Appointment
        fields = '__all__'

class DiagnosisSerializer(serializers.ModelSerializer):
    doctor = DoctorSerializer()
    patient = MyUserSerializer()
    date = AppointmentDateSerializer()
    diagnosis_image = serializers.SerializerMethodField()

    def get_diagnosis_image(self, obj):
        """
            Returns the URL of the diagnosis image for the given object.

            Args:
                obj: The object for which to retrieve the diagnosis image.

            Returns:
            str: The URL of the diagnosis image, or None if the object does not have a diagnosis image.
        """
        if obj.diagnosis_image:
            return obj.diagnosis_image.url
    class Meta:
        model = Diagnosis
        fields = '__all__'



class PrescriptionsSerializer(serializers.ModelSerializer):
    doctor = DoctorSerializer()
    patient = MyUserSerializer()
    diagnosis = DiagnosisSerializer()
    date = AppointmentDateSerializer()
    prescription_image = serializers.SerializerMethodField()

    def get_prescription_image(self, obj):
        """
            Returns the URL of the prescription image for the given object.

            Args:
                obj: The object for which to retrieve the prescription image.

            Returns:
            str: The URL of the prescription image, or None if the object does not have a prescription image.
        """
        if obj.prescription_image:
            return obj.prescription_image.url

    class Meta:
        model = Prescriptions
        fields = '__all__'
