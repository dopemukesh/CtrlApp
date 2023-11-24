from django.urls import path
from .views import *


urlpatterns = [
    path('', DoctorAPIView.as_view()),
    path('<int:doctor_id>/', GetDoctorDetails.as_view()),
]
