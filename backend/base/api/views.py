from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenVerifyView
from .serializers import RegisterSerializer, MyUserSerializer
from base.models import MyUser
from rest_framework.permissions import IsAuthenticated


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



class ChangePassword(APIView):
    """
        Handles the POST request to change the user's password.

        Args:
            request (Request): The HTTP request object.

        Returns:
            Response: The HTTP response object with a JSON message indicating the result of the password change.

        Raises:
            None
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")
        if not user.check_password(old_password):
            return Response({"error": "Old password is incorrect"}, status=400)
        user.set_password(new_password)
        user.save()
        return Response({"message": "Password changed successfully"}, status=200)


class TokenVerificationView(TokenVerifyView):
    """
    Custom view to verify the validity of a token.
    """
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        # Check the response status to determine token validity
        if response.status_code == 200:
            # Token is valid
            return Response({"message": True}, status=200)
        elif response.status_code == 401:
            # Token is invalid or has expired
            return Response({"message": False}, status=401)
        else:
            # Handle other response statuses if needed
            return Response({"message": False}, status=401)



class GetUserInfo(APIView):
    """
        Handles the GET request to retrieve the user's information.

        Args:
            request (Request): The HTTP request object.

        Returns:
            Response: The HTTP response object with the user's information.

        Raises:
            None
    """
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            user = request.user
            serializer = MyUserSerializer(user)
            return Response(serializer.data)
        except:
            return Response({"error": "User not found"}, status=404)
