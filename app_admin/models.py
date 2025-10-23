from django.db import models 
from app_usuarios.models import Login
# Create your models here.


class Admin(models.Model):
    nome = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    login = models.OneToOneField(Login, on_delete=models.CASCADE)

    def __str__(self):
        return self.nome
