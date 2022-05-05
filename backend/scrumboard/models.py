from django.db import models


# Create your models here.
class Task(models.Model):
    description = models.CharField(max_length=253)
    date_created = models.DateTimeField()
    status = models.CharField(max_length=30, default="pending")

    def __str__(self):
        return self.description
