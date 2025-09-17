from django.urls import path, include# type: ignore
from . import views

urlpatterns = [
    path(' ', views.dashboard, name='dashboard_usuario'),
    path("catalogo/", include("app_catalogo.urls")),
    path("solicitacoes/", include("app_solicitacoes.urls")),
    path("perfil/", include("app_perfil.urls")),
    ]