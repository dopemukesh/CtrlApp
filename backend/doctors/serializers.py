from rest_framework import serializers
from .models import *
from base.models import MyUser
from user_profile.serializers import MyUserSerializer


class DoctorSerializer(serializers.ModelSerializer):
    user = MyUserSerializer()
    class Meta:
        model = Doctor
        fields = '__all__'

    
