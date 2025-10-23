from django.shortcuts import render , redirect # type: ignore
from django.contrib import messages # type: ignore
from .models import Login


# Create your views here.
def logins(request):
    if request.method == "POST":
        login = Login()
        login.username = request.POST.get("username")
        login.password = request.POST.get("password")
        tipo = request.POST.get("tipo")  # "usuario" ou "admin"

        # Aqui você faria uma verificação no banco
        if login.username and login.password:
            # Exemplo: checando se existe no banco
            if Login.objects.filter(username=login.username, password=login.password).exists():
                if tipo == "admin":
                    return redirect("dashboard_admin")
                else:
                    return redirect("dashboard_usuario")
            else:
                messages.error(request, "Usuário ou senha inválidos")
        else:
            messages.error(request, "Preencha todos os campos")

    return render(request, "telalogin/telalogin.html")