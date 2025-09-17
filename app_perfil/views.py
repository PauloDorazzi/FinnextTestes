from django.http import JsonResponse # type: ignore

def get_perfil(request):
    return JsonResponse({
        "nome": "Paulo",
        "email": "paulo@usp.br"
    })

def atualizar_perfil(request):
    if request.method == "POST":
        # salvar alterações no banco
        return JsonResponse({"success": True, "message": "Perfil atualizado"})
    return JsonResponse({"success": False, "message": "Método inválido"})
