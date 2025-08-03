from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import Firm
from .serializers import UserSerializer, FirmSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny 
from django.shortcuts import get_object_or_404

class RegisterView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        request.user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class FirmListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        firms = Firm.objects.filter(owner=request.user)
        serializer = FirmSerializer(firms, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = FirmSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FirmDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk, user):
        firm = get_object_or_404(Firm, pk=pk, owner=user)
        return firm

    def get(self, request, pk):
        firm = self.get_object(pk, request.user)
        serializer = FirmSerializer(firm)
        return Response(serializer.data)

    def put(self, request, pk):
        firm = self.get_object(pk, request.user)
        serializer = FirmSerializer(firm, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        firm = self.get_object(pk, request.user)
        serializer = FirmSerializer(firm, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        firm = self.get_object(pk, request.user)
        firm.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)