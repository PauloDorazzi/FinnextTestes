from django.db import models

# Create your models here.
class Solicitacao(models.Model):
    descricao = models.CharField(max_length=255)
    data_criacao = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, default='Pendente')

    def __str__(self):
        return self.descricao