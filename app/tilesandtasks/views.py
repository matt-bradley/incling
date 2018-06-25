from django.shortcuts import render
from rest_framework import viewsets
from .models import Tasks, Tiles
from .serializers import TasksSerializer, TilesSerializer


# Create your views here.

class TasksViewset(viewsets.ModelViewSet):
    queryset = Tasks.objects.all()
    serializer_class = TasksSerializer


class TilesViewset(viewsets.ModelViewSet):
    queryset = Tiles.objects.all()
    serializer_class = TilesSerializer
