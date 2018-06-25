from rest_framework import serializers
from .models import Tiles, Tasks


class TilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tiles
        fields = '__all__'


class TasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = '__all__'
