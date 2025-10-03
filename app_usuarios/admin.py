from django.contrib import admin # type: ignore
from .models import Solicitacao, Usuario

# Register your models here.
admin.site.register(Usuario)
admin.site.register(Solicitacao)