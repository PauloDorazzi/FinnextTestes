from django.urls import path  # type: ignore
from django.urls import include  # type: ignore
from app_usuarios import views as usuario_views
from django.contrib import admin  # type: ignore

urlpatterns = [

    path('', usuario_views.login, name='login'),
    path('usuarios/', include('app_usuarios.urls')),
    path('admin/', include('app_admin.urls')),
    path("catalogo/", include("app_catalogo.urls")),
    path("solicitacoes/", include("app_solicitacoes.urls")),
    path("perfil/", include("app_perfil.urls")),
]
urlpatterns += [
    path('django-admin/', admin.site.urls),
]
