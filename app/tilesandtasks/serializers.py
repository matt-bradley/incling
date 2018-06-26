from rest_framework import serializers
from .models import Tiles, Tasks


class TasksSerializer(serializers.ModelSerializer):
    tile = serializers.SerializerMethodField()

    class Meta:
        model = Tasks
        fields = "__all__"

    def get_tile(self, obj):
        out = {
            'date': obj.tile.date,
            'id': obj.tile.id,
            'status_live': obj.tile.status_live
        }
        return out

    def set_tile(self, obj):
        print(obj)
        return obj


class TilesSerializer(serializers.ModelSerializer):
    tasks = TasksSerializer(many=True, read_only=True)
    status_live = serializers.SerializerMethodField()

    class Meta:
        model = Tiles
        fields = ('id', 'date', 'status_live', 'tasks')

    def get_status_live(self, obj):
        return obj.get_status_live_display()
