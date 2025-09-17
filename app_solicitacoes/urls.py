from django.urls import path # type: ignore
from . import views

urlpatterns = [
    path('', views.listar_solicitacoes, name="listar_solicitacoes"),
    path('criar/', views.criar_solicitacao, name="criar_solicitacao"),
]
