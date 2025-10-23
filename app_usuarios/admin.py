from django.contrib import admin # type: ignore
from .models import Usuario
from app_solicitacoes.models import Solicitacao

# Register your models here.
admin.site.register(Usuario)
admin.site.register(Solicitacao)