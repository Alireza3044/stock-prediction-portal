from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class SampleView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    def retrieve(self, request):
        return Response("Fetched the sample auth-required view.")
