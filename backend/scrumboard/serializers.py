from rest_framework import serializers
from django.utils import timezone

from .models import Task


class TaskSerializer(serializers.Serializer):
    """
    Serializer of task model, to validate data for create and update
    """
    description = serializers.CharField()
    status = serializers.CharField(required=False)

    class Meta:
        model = Task
        fields = ['id', 'description', 'date_created', 'status']
        extra_kwargs = {
            'id': {'read_only': True},
        }

    def validate(self, data):
        # set status=pending default on create
        if data.get('status', None) is None:
            data['status'] = "pending"
        return data

    def update(self, instance, validated_data):
        instance.description = validated_data.get('description', instance.description)
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance

    def create(self, validated_data):
        now = timezone.now()
        time = now.strftime("%Y-%m-%d %H:%M:%S")
        task = Task(
            description=validated_data['description'],
            date_created=time,
            status=validated_data['status']
        )
        task.save()
        return task
