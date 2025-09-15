from django.urls import path # type: ignore
from app_admin import views as admin_views
from app_usuarios import views as usuario_views

urlpatterns = [
    path('', usuario_views.login, name='login'),
    path('admin/', admin_views.dashboard, name='dashboard_admin'),
    path('usuario/', usuario_views.dashboard, name='dashboard_usuario'),
]
