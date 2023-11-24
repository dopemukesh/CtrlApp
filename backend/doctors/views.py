from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Doctor
from rest_framework.views import APIView
from .serializers import DoctorSerializer
from base.models import MyUser

class DoctorAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
            Retrieve the profile of the authenticated user.

            Args:
                request (HttpRequest): The HTTP request object.

            Returns:
            JsonResponse: The profile data of the user if found, or an error message if not found.
        """
        try:
            doctors = Doctor.objects.all()
            serializer = DoctorSerializer(doctors, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
