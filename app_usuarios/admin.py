from django.contrib import admin # type: ignore
from app_usuarios.models import Usuario
from app_solicitacoes.models import Solicitacao
from . import models

# Register your models here.
admin.site.register(models.Usuario)
admin.site.register(Solicitacao)
admin.site.register(models.Login)