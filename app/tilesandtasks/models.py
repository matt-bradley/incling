from django.db import models


# Create your models here.

class Tiles(models.Model):
    LIVE = 'L'
    PENDING = 'P'
    ARCHIVED = 'A'
    STATUS_CHOICES = (
        (LIVE, 'Live'),
        (PENDING, 'Pending'),
        (ARCHIVED, 'Archived')
    )

    date = models.DateTimeField()
    status_live = models.CharField(max_length=1, choices=STATUS_CHOICES, default=PENDING)


class Tasks(models.Model):
    title = models.CharField(max_length=120)
    order = models.CharField(max_length=120)
    t_type = models.CharField(max_length=100)
    desc = models.CharField(max_length=300)
    tile = models.ForeignKey(Tiles, on_delete=models.CASCADE, related_name='tasks')

    class Meta:
        unique_together = ('tile', 'order')

