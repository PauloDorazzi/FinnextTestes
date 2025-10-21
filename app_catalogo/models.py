from django.db import models # type: ignore

# Create your models here.
class Produto(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField()
    codigo = models.CharField(max_length=50, unique=True)
    imagem = models.ImageField(upload_to='produtos/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'produtos'
        verbose_name = 'Produto'
        verbose_name_plural = 'Produtos'
        ordering = ['nome']

    def __str__(self):
        return self.nome