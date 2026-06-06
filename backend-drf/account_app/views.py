from django.contrib.auth.models import User

from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny

from . import serializers


class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.RegisterSerializer
    permission_classes = [AllowAny]
