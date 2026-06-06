from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token

from . import serializers


class RegisterView(CreateAPIView):
    serializer_class = serializers.RegisterSerializer
    permission_classes = [AllowAny]
