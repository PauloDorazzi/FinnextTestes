from django.shortcuts import render, redirect # type: ignore
from django.contrib import messages # type: ignore
from .models import Login
from django.contrib.auth import authenticate, login as logins # type: ignore
import json


def dashboard(request):
    return render(request, 'usuario/usuario_integrado.html')


def logins(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        btnAdmin = request.POST.get("btnAdmin")
        btnUsuario = request.POST.get("btnUsuario")
        
        if username and password:
            # Autenticação segura
            user = authenticate(request, username=username, password=password)
            
            if user is not None:
                logins(request, user)  # Cria a sessão
                
                # Redireciona conforme o tipo selecionado
                if btnAdmin == 'id : btnAdmin':
                    return redirect("app_admin:dashboard_admin")  # Nome da URL
                else:
                    return redirect("pagina_logado_usuario")  # Nome da URL
            else:
                messages.error(request, "Usuário ou senha inválidos")
        else:
            messages.error(request, "Preencha todos os campos")

    return render(request, "telalogin/telalogin.html")