from django.test import TestCase
from rest_framework.test import APIClient
from datetime import datetime

factory = APIClient()
# Create

tile = factory.post('/tiles/', {'date': datetime.now(), 'status_live': 'p'})

task = factory.post('/tasks/',
                    {'title': 'new idea', 'order': 1, 't_type': 'Development', 'desc': 'desc', 'tile': tile.data['id']})

# Delete Task From tile / Delete task

delete_task = factory.delete('/tasks/' + str(task.data['id']), )

# Delete Tile
delete_tile = factory.delete('/tiles/' + str(tile.data['id']), )
