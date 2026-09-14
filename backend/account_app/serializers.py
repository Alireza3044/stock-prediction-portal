from django.core.validators import MinLengthValidator
from django.contrib.auth.models import User
from rest_framework import serializers

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        style={"input_type": "password"},
        validators=[MinLengthValidator(8)],
        error_messages={
            "min_length": "Password must be at least 8 characters long."
        }
    )
    password2 = serializers.CharField(
        write_only=True,
        style={"input_type": "password"},
        validators=[MinLengthValidator(8)],
        error_messages={
            "min_length": "Password must be at least 8 characters long."
        }
    )

    class Meta:
        model = User
        fields = ["username", "email", "password", "password2"]
        extra_kwargs = {
            "email": {
                "required": True,
                "allow_blank": False
            }
        }

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "A user with this email address already exists."
            )
        return value

    def validate(self, data):
        if data["password"] != data["password2"]:
            raise serializers.ValidationError(
                {"password2": "The two password fields didn't match."}
            )
        return data

    def create(self, validated_data):
        validated_data.pop("password2")
        
        user = User.objects.create_user(**validated_data)
        return user
