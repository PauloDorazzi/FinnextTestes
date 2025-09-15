from django.shortcuts import render

def dashboard(request):
    return render(request, 'usuario/usuario.html')

def login(request):
    return render(request, 'telalogin/telalogin.html')