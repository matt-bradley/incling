from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import Tasks, Tiles
from .serializers import TasksSerializer, TilesSerializer


# Create your views here.

class TasksViewset(viewsets.ModelViewSet):
    queryset = Tasks.objects.all()
    serializer_class = TasksSerializer

    def perform_create(self, serializer):
        print(serializer.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)


class TilesViewset(viewsets.ModelViewSet):
    queryset = Tiles.objects.all()
    serializer_class = TilesSerializer
