from django.urls import path  # type: ignore
from django.urls import include  # type: ignore
from app_usuarios import views as app_usuario_views
from django.contrib import admin  # type: ignore
from app_admin import views as app_admin_views 

urlpatterns = [
    #Login
    path('usuario/', include("app_usuarios.urls")),
    #Tela Admin
    path('admin/', include("app_admin.urls")),
    #Tela Solicitacoes
    path("solicitacoes/", include("app_solicitacoes.urls")),
    #Tela Perfil
    path("perfil/", include("app_perfil.urls")),
]
urlpatterns += [
    path('django-admin/', admin.site.urls),
]
