from django.db import models #type: ignore  

# Create your models here.
class Solicitacao(models.Model):
    titulo = models.CharField(max_length=200)
    descricao = models.TextField()
    data_criacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titulo  