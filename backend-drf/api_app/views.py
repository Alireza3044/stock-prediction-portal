from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from . import serializers, prediction


class PredictView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.PredictSerializer
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        ticker = serializer.validated_data["ticker"]

        try:
            price_data = prediction.get_stock_price_data(ticker)
        except ValueError:
            return Response({"error": "No data found for the given ticker.",
                            "status": status.HTTP_404_NOT_FOUND})

        base_plot_path = prediction.plot_and_get_image_path(ticker, [price_data.Close], ["b"], ["Price"])
        ma_plot_path = prediction.plot_and_get_image_path(ticker, [price_data.Close, price_data.ma100, price_data.ma200], ["b", "r", "g"], ["Price", "MA 100", "MA 200"])

        evaluations = prediction.evaluate(price_data.Close, "api_app/stock-perdictor.keras")
        pred_plot_path = prediction.plot_and_get_image_path(ticker, [evaluations["y_test"], evaluations["y_pred"]], ["b", "r"], ["Real Price", "Predicted Price"])

        return Response({
            "status": "success",
            "base_plot_path": base_plot_path,
            "ma_plot_path": ma_plot_path,
            "pred_plot_path": pred_plot_path,
            "mse": evaluations["mse"],
            "rmse": evaluations["rmse"],
            "r2_score": evaluations["r2_score"]
        })
