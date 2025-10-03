from django.db import models #type: ignore
import uuid

class Login(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    username = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
