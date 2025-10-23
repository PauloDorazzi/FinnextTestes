from django.urls import path #type: ignore
from django.contrib.auth import views as auth_views  #type: ignore
from . import views

urlpatterns = [
    
    path('usuario/', views.dashboard, name='dashboard_usuario'),
]
