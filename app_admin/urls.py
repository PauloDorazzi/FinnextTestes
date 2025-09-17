from django.urls import path # type: ignore
from . import views

urlpatterns = [
    path(' ', views.dashboard, name='dashboard_admin'),
]