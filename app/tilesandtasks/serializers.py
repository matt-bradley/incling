from rest_framework import serializers
from .models import Tiles, Tasks


class TasksSerializer(serializers.ModelSerializer):
    #tile = serializers.SerializerMethodField()

    class Meta:
        model = Tasks
        fields = "__all__"


class TilesSerializer(serializers.ModelSerializer):
    tasks = TasksSerializer(many=True, read_only=True)
    status_live = serializers.SerializerMethodField()

    class Meta:
        model = Tiles
        fields = ('id', 'date', 'status_live', 'tasks')

    def get_status_live(self, obj):
        return obj.get_status_live_display()
