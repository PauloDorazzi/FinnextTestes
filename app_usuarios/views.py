from django.shortcuts import render, redirect # type: ignore
from django.contrib import messages # type: ignore

def dashboard(request):
    return render(request, 'usuario/usuario_integrado.html')

def login(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        tipo = request.POST.get("tipo")  # "usuario" ou "admin"
        # Aqui você faria a autenticação de verdade (com Django auth)
        if username and password:
            if tipo == "admin":
                return redirect("dashboard_admin")
            else:
                return redirect("dashboard_usuario")
        else:
            messages.error(request, "Usuário ou senha inválidos")
    
    return render(request, "telalogin/telalogin.html")