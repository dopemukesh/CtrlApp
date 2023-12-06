from django.urls import path
from . import views
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path("", views.IndexView.as_view(), name="index"),
    path('verify-token/', views.TokenVerificationView.as_view(), name='token-verification'),
    path("change-password/", views.ChangePassword.as_view(), name="change-password"),
    path('register/', views.RegisterUser.as_view(), name='register'),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

