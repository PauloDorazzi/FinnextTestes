from django.shortcuts import render, redirect # type: ignore
from django.contrib.auth.decorators import login_required, user_passes_test # type: ignore
from django.contrib import messages # type: ignore
from django.http import HttpRequest, HttpResponse # type: ignore
# Create your views here.

# Create your views here.
def dashboard(request):
    return render(request, 'admin/admin.html')

def is_admin(user):
    return user.is_staff

@login_required
@user_passes_test(is_admin, login_url='usuarios:login')
def dashboard(request:HttpRequest):
    """Dashboard administrativo - só acessível por staff"""
    return render(request, 'app_admin/dashboard.html')

@login_required
@user_passes_test(is_admin, login_url='usuarios:login')
def listar_solicitacoes(request:HttpRequest):
    """Lista solicitações - só acessível por staff"""
    return render(request, 'app_admin/solicitacoes.html')

@login_required
@user_passes_test(is_admin, login_url='usuarios:login')
def relatorios(request:HttpRequest):
    """Relatórios - só acessível por staff"""
    return render(request, 'app_admin/relatorios.html')