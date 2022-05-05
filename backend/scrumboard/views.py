from rest_framework import views, status
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer


class TaskView(views.APIView):
    serializer = TaskSerializer

    @staticmethod
    def serialize_task(task):
        return {"id": task.id,
                "description": task.description,
                "date_created": task.date_created,
                "status": task.status}

    def get(self, request):
        """
        Method to return all task
        """
        task_queryset = Task.objects.all()
        qpending = task_queryset.filter(status="pending")
        qprocessing = task_queryset.filter(status="processing")
        qcompleted = task_queryset.filter(status="completed")

        data = {
            'pending': qpending.values(),
            'processing': qprocessing.values(),
            'completed': qcompleted.values()
        }

        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        """
        Post method to create a new task
        """
        serializer = self.serializer(None, self.request.data)
        if serializer.is_valid():
            new_task = serializer.save()

        else:
            print(serializer.error_messages)
        return Response(self.serialize_task(new_task), status=status.HTTP_200_OK)

    def patch(self, request):
        """
        Method to update a status task
        """
        task_id = self.request.data['id']
        new_status = self.request.data['status']
        task = Task.objects.get(id=task_id)
        serializer = self.serializer(task, {"status": new_status}, partial=True)
        data = {
            "status": task.status
        }
        if serializer.is_valid():
            print("es válido")
            new_task = serializer.save()
            data["task"] = self.serialize_task(new_task)
        else:
            print(serializer.errors)
        return Response(data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        """
        Method to delete a task from board
        """
        task = Task.objects.get(id=pk)
        if task is not None:
            task.delete()
        return Response({"id": pk}, status=status.HTTP_200_OK)
