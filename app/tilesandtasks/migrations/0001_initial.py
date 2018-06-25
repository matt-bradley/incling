# Generated by Django 2.0.6 on 2018-06-24 15:13

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Tasks',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=120)),
                ('order', models.CharField(max_length=120)),
                ('t_type', models.CharField(max_length=100)),
                ('desc', models.CharField(max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name='Tiles',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField()),
                ('status_live', models.CharField(choices=[('L', 'Live'), ('P', 'Pending'), ('A', 'Archived')], default='P', max_length=1)),
            ],
        ),
    ]