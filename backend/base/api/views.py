from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
        Generates a token for the given user.

        Parameters:
            user (User): The user for whom the token is generated.

        Returns:
        dict: The generated token with custom claims for fullname and email.
    """
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['fullname'] = user.fullname
        token['email'] = user.email

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class IndexView(APIView):
    def get(self, request, *args, **kwargs):
        return Response({"message": "Hello, world!"})
