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


