from django.db import models #type: ignore
from django.contrib.auth.models import AbstractUser #type: ignore
import uuid
class Login(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    username = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    

    def __str__(self):
        return f"{self.codigo} - {self.nome}"


class Usuario(AbstractUser):
    TIPO_CHOICES = [
        ('requisitante', 'Requisitante'),
        ('admin', 'Administrador'),
        ('sti', 'STI'),
    ]
    
    numero_usp = models.CharField(max_length=20, unique=True, null=True, blank=True)
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES, default='admin')
    ramal = models.CharField(max_length=10, blank=True)
    avatar = models.CharField(max_length=5, blank=True)  # Iniciais do nome
    ativo = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'usuarios'
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'

    def __str__(self):
        return f"{self.get_full_name()} ({self.username})"

    def save(self, *args, **kwargs):
        # Gera avatar automaticamente (iniciais)
        if not self.avatar and self.first_name:
            names = self.get_full_name().split()
            if len(names) >= 2:
                self.avatar = f"{names[0][0]}{names[-1][0]}".upper()
            else:
                self.avatar = names[0][:2].upper()
        super().save(*args, **kwargs)