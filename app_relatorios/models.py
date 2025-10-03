from django.db import models

# Create your models here.
class Relatorio(models.Model):
    titulo = models.CharField(max_length=255)
    data_geracao = models.DateTimeField(auto_now_add=True)
    conteudo = models.TextField()

    def __str__(self):
        return self.titulo