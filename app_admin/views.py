from django.shortcuts import render # type: ignore

# Create your views here.

# Create your views here.
def dashboard(request):
    return render(request, 'admin/admin.html')