from django.urls import path
from .views import *


urlpatterns = [
    path('doctor/', DoctorAPIView.as_view()),
]
