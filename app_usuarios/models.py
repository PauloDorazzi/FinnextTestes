from django.db import models #type: ignore
import uuid
# Create your models here.
class Login(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    senha = models.CharField(max_length=100)

    def __str__(self):
        return self.email
class Usuario(models.Model):
    nome = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    senha = models.CharField(max_length=100)

    def __str__(self):
        return self.nome