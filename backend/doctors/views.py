from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Doctor, AvailabilityTimeTable,Appointment
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
            doctors = Doctor.objects.filter(approved=True)
            print(doctors)
            serializer = DoctorSerializer(doctors, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)


class GetDoctorDetails(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, doctor_id):
        """
            Retrieves a specific doctor object and serializes it using the DoctorSerializer.

            Args:
                request (Request): The HTTP request object.
                doctor_id (int): The ID of the doctor to retrieve.

            Returns:
                Response: The serialized doctor object if found, or an error message if not found.

            Raises:
                Exception: If there is an error retrieving the doctor object.
        """
        try:
            doctor = Doctor.objects.get(id=doctor_id)
            serializer = DoctorSerializer(doctor)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)



class BookAppointment(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, doctor_id, appointment_time):
        try:
            patient = request.user
            try:
                doctor = Doctor.objects.get(id=doctor_id)
                appointment_time = appointment_time

            except Exception as e:
                return Response(str(e), status=status.HTTP_400_BAD_REQUEST)


        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

