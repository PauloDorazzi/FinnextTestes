from django.db import models #type: ignore
import uuid

class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    login = models.OneToOneField(Login, on_delete=models.CASCADE)

    def __str__(self):
        return self.nome