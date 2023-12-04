from django.contrib import admin
from django.urls import path, include
from django.urls import re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings
from django.conf.urls.static import static

schema_view = get_schema_view(
   openapi.Info(
      title="Ctrl Application API",
      default_version='v1',
      description="This is the backend of the Ctrl Application API",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="b.kayongo@alustudent.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    # api swagger
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    path('admin/', admin.site.urls),
    path('user/', include('base.api.urls')),
    path('profile/', include('user_profile.urls')),
    path('doctors/', include('doctors.urls')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
