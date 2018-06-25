from django.contrib import admin

# Register your models here.
from django.contrib import admin
from tilesandtasks.models import Tiles, Tasks


admin.site.register(Tiles)
admin.site.register(Tasks)