from rest_framework import serializers
from .models import Profile, EmergencyContacts
from base.models import MyUser


class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('fullname', 'email')

class ProfileSerializer(serializers.ModelSerializer):
    profile_image = serializers.SerializerMethodField()
    user = MyUserSerializer()

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

    class Meta:
        model = Profile
        fields = '__all__'

class UpdateProfileSerializer(serializers.ModelSerializer):
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
    class Meta:
        model = Profile
        fields = (
            'fullname','date_of_birth', 'gender', 'contact_number', 'street_address',
            'city','state','zip_code','country','profile_image','blood_type','allergies',
            'medications'
        )


class EmergencyContactsSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyContacts
        fields = '__all__'
