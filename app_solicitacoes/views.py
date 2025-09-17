from django.http import JsonResponse # type: ignore

def listar_solicitacoes(request):
    status = request.GET.get("status")
    return JsonResponse({"status": status, "solicitacoes": []})

def criar_solicitacao(request):
    if request.method == "POST":
        # aqui você pegaria os dados e salvaria no banco
        return JsonResponse({"success": True, "message": "Solicitação criada"})
    return JsonResponse({"success": False, "message": "Método inválido"})
