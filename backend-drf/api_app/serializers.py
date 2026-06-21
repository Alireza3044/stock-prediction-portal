from rest_framework import serializers


class PredictSerializer(serializers.Serializer):
    ticker = serializers.CharField(max_length=20)
