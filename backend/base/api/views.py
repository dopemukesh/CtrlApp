from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RegisterSerializer
from base.models import MyUser
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


class RegisterUser(APIView):
    """
        Handles HTTP POST requests to create a new user.

        Args:
            request (HttpRequest): The HTTP request object containing the data for user registration.

        Returns:
            Response: If the request data is valid, returns a success response with the message "User created successfully" and a status code of 201.
            If the request data is invalid, returns a response with the serializer errors and a status code of 400.
    """
    serializer_class = RegisterSerializer
    queryset = MyUser.objects.all()
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"}, status=201)
        return Response(serializer.errors, status=400)




