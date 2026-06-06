from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include("account_app.urls")),
    path('api/v1/', include('api_app.urls')),
]
