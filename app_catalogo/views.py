from django.shortcuts import render # type: ignore
from django.http import JsonResponse # type: ignore
import pandas as pd # type: ignore

def catalogo(request):
    # Carrega o Excel (ajuste o caminho)
    df = pd.read_excel("dados/catalogo.xlsx")

    # Converte para lista de dicionários
    produtos = df.to_dict(orient="records")

    return render(request, "usuario/catalogo.html", {"produtos": produtos})

def listar_catalogo(request):
    categoria = request.GET.get("categoria")
    busca = request.GET.get("busca")
    data = {
        "categoria": categoria,
        "busca": busca,
        "produtos": ["Produto A", "Produto B"]
    }
    return JsonResponse(data)

