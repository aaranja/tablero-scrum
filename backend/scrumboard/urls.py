from django.urls import path

from .views import TaskView

urlpatterns = [
    path('tasks/delete=<int:pk>', TaskView.as_view()),
    path('tasks', TaskView.as_view())
]
