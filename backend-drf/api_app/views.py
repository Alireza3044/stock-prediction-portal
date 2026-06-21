from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import PredictSerializer


class PredictView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PredictSerializer
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        ticker = serializer.validated_data["ticker"]
        
        return Response({"response": "You've passed: " + ticker})
