from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={"input_type": "password"}, min_length=8)
    password2 = serializers.CharField(write_only=True, style={"input_type": "password"}, min_length=8)

    class Meta:
        model = User
        fields = ["username", "email", "password", "password2"]

    def save(self):
        u = self.validated_data["username"]
        e = self.validated_data["email"]
        p = self.validated_data["password"]
        p2 = self.validated_data["password2"]

        if User.objects.filter(email=e).exists():
            raise serializers.ValidationError("There's an already existing account with this email.")
        if p != p2:
            raise serializers.ValidationError("Passwords do not match.")
        
        user = User.objects.create_user(username=u, email=e, password=p)
        Token.objects.create(user=user)

        return user
