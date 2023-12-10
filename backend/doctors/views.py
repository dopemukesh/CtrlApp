from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Doctor, AvailabilityTimeTable,Appointment, SelectedTime
from rest_framework.views import APIView
from .serializers import (
    DoctorSerializer, AvailabilityTimeTableSerializer,AppointmentSerializer
    )
from base.models import MyUser
from user_profile.models import Profile
from datetime import datetime, time
import json
from django.utils import timezone

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
            doctors = Doctor.objects.select_related('user').filter(approved=True)
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
            doctor = Doctor.objects.select_related('user').get(id=doctor_id)
            availability = AvailabilityTimeTable.objects.filter(doctor=doctor, is_available=True)
            serializer = DoctorSerializer(doctor)
            availability_serializer = AvailabilityTimeTableSerializer(availability, many=True)

            context = {
                'doctor': serializer.data,
                'availability': availability_serializer.data
            }
            return Response(context, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)



class BookAppointment(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, doctor_id, appointment_id):
        """
            Book an appointment for a specific doctor.

            Args:
                request (Request): The HTTP request object.
                doctor_id (int): The ID of the doctor to book the appointment for.
                appointment_id (int): The ID of the appointment to book.

            Returns:
                Response: The serialized appointment object if successful, or an error message if not.

            Raises:
                Exception: If there is an error booking the appointment.
        """
        data = json.loads(request.body)
        try:
            doctor = Doctor.objects.get(id=doctor_id)
            appointment_date = AvailabilityTimeTable.objects.get(id=appointment_id)
            appointment_patient = request.user
            user_time_str = data.get('user_time')
            datetime_obj = datetime.strptime(user_time_str, '%I:%M %p')
            selected_time = datetime_obj.time()



            try:
                appointment_book = Appointment.objects.create(
                    doctor=doctor,
                    patient=appointment_patient,
                    date=appointment_date,
                    additional_info=additional_info
                )

                appointment_book.save()
                appointment_date.is_available = True
                appointment_date.save()
                add_selected_date = SelectedTime.objects.create(
                    availability=appointment_date,
                    selected_time=additional_info
                )
                add_selected_date.save()
                serializer = AppointmentSerializer(appointment_book)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Exception as e:
                return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

class GetDoctorAppointments(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, doctor_id):
        """
            Retrieves all appointments for a specific doctor.

            Args:
                request (Request): The HTTP request object.
                doctor_id (int): The ID of the doctor to retrieve appointments for.

            Returns:
                Response: The serialized appointment objects if successful, or an error message if not.

            Raises:
                Exception: If there is an error retrieving the appointments.
        """
        try:
            doctor = Doctor.objects.get(id=doctor_id)
            appointments = Appointment.objects.filter(doctor=doctor)
            serializer = AppointmentSerializer(appointments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

class GetPatientAppointments(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
            Retrieves all appointments for a specific patient.

            Args:
                request (Request): The HTTP request object.

            Returns:
                Response: The serialized appointment objects if successful, or an error message if not.

            Raises:
                Exception: If there is an error retrieving the appointments.
        """
        try:
            patient = request.user
            appointments = Appointment.objects.filter(patient=patient)
            serializer = AppointmentSerializer(appointments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)


class checkSingleAppointment(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, appointment_id):
        """
            Checks if an appointment is available for a specific doctor.

            Args:
                request (Request): The HTTP request object.
                doctor_id (int): The ID of the doctor to check availability for.
                appointment_id (int): The ID of the appointment to check.

            Returns:
                Response: The serialized availability object if available, or an error message if not.

            Raises:
                Exception: If there is an error checking the availability.
        """
        try:
            user = request.user
            appointment = Appointment.objects.get(id=appointment_id)
            try:
                if appointment.patient != user:
                    return Response("You are not authorized to check this appointment", status=status.HTTP_400_BAD_REQUEST)
                else:
                    serializer = AppointmentSerializer(appointment)
                    return Response(serializer.data, status=status.HTTP_200_OK)

            except Exception as e:
                return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, appointment_id):
        """
            Updates an appointment for a specific doctor.

            Args:
                request (Request): The HTTP request object.
                doctor_id (int): The ID of the doctor to update the appointment for.
                appointment_id (int): The ID of the appointment to update.

            Returns:
                Response: The serialized appointment object if successful, or an error message if not.

            Raises:
                Exception: If there is an error updating the appointment.
        """
        data = json.loads(request.body)
        try:
            user = request.user
            appointment = Appointment.objects.get(id=appointment_id)
            try:
                if appointment.patient != user:
                    return Response("You are not authorized to update this appointment", status=status.HTTP_400_BAD_REQUEST)
                else:
                    appointment.additional_info = data.get('additional_info')
                    appointment.save()
                    serializer = AppointmentSerializer(appointment)
                    return Response(serializer.data, status=status.HTTP_200_OK)

            except Exception as e:
                return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, appointment_id):
        """
            Deletes an appointment for a specific doctor.

            Args:
                request (Request): The HTTP request object.
                doctor_id (int): The ID of the doctor to delete the appointment for.
                appointment_id (int): The ID of the appointment to delete.

            Returns:
                Response: A success message if successful, or an error message if not.

            Raises:
                Exception: If there is an error deleting the appointment.
        """
        try:
            user = request.user
            appointment = Appointment.objects.get(id=appointment_id)
            try:
                if appointment.patient != user:
                    return Response("You are not authorized to delete this appointment", status=status.HTTP_400_BAD_REQUEST)
                else:
                    appointment.delete()
                    return Response("Appointment deleted successfully", status=status.HTTP_200_OK)

            except Exception as e:
                return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
                return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

