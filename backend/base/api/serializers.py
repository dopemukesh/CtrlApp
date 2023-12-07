from rest_framework import serializers
from base.models import MyUser
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=MyUser.objects.all())]
        )
    fullname = serializers.CharField(required=True, max_length=255)
    date_of_birth = serializers.DateField(required=True)
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = MyUser
        fields = ('fullname', 'email', 'date_of_birth', 'password', 'password2')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = MyUser.objects.create(
            fullname=validated_data['fullname'],
            email=validated_data['email'],
            date_of_birth=validated_data['date_of_birth'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['id', 'fullname', 'email', 'date_of_birth']
