from django.urls import path # type: ignore
from . import views

urlpatterns = [
    path('', views.get_perfil, name="perfil"),
    path('atualizar/', views.atualizar_perfil, name="atualizar_perfil"),
]
