from django.urls import path
from .views import ProfileAPIView,GetUserProfile

urlpatterns = [
    path('', ProfileAPIView.as_view()),
    path('profile/<int:user_id>/', GetUserProfile.as_view(), name='profile'),
]
