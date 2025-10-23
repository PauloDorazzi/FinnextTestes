from django.shortcuts import render, redirect # type: ignore
from django.contrib import messages # type: ignore

def dashboard(request):
    return render(request, 'usuario/usuario_integrado.html')

