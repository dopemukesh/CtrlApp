from django.urls import path
from .views import *


urlpatterns = [
    path('', DoctorAPIView.as_view()),
    path('<int:doctor_id>/', GetDoctorDetails.as_view()),
    path('<int:doctor_id>/book-appointment/<int:appointment_id>/', BookAppointment.as_view()),
    path('<int:doctor_id>/appointments/', GetDoctorAppointments.as_view()),
    path('check-appointments/', GetPatientAppointments.as_view()),
    path('check-appointment/<int:appointment_id>/', checkSingleAppointment.as_view()),
]
