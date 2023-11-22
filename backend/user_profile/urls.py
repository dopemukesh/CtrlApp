from django.urls import path
from .views import ProfileAPIView,GetUserProfile,EmergencyContactsAPIView

urlpatterns = [
    path('', ProfileAPIView.as_view()),
    path('profile/<int:user_id>/', GetUserProfile.as_view(), name='profile'),
    path('emergency_contacts/', EmergencyContactsAPIView.as_view(), name='emergency_contacts'),
]
