from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import PredictSerializer
from .prediction import get_data


class PredictView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PredictSerializer
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        ticker = serializer.validated_data["ticker"]

        try:
            df = get_data(ticker)
        except ValueError:
            return Response({"error": "No data found for the given ticker.",
                            "status": status.HTTP_404_NOT_FOUND})
        
        return Response({"response": "You've passed: " + ticker, "status": "success"})
