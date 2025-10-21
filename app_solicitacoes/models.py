from django.db import models #type: ignore
from app_usuarios.models import Usuario
from app_catalogo.models import Produto
class Solicitacao(models.Model):
    STATUS_CHOICES = [
        ('pendente', 'Pendente'),
        ('aprovada', 'Aprovada'),
        ('negada', 'Negada'),
        ('consolidada', 'Consolidada'),
        ('comprada', 'Comprada'),
        ('entregue', 'Entregue'),
    ]

    codigo = models.CharField(max_length=20, unique=True, editable=False)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='solicitacoes')
    justificativa = models.TextField()
    data_solicitacao = models.DateTimeField(auto_now_add=True)
    data_aprovacao = models.DateTimeField(null=True, blank=True)
    data_negacao = models.DateTimeField(null=True, blank=True)
    data_compra = models.DateTimeField(null=True, blank=True)
    data_entrega = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pendente')
    observacoes_administrador = models.TextField(blank=True)
    total_estimado = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'solicitacoes'
        verbose_name = 'Solicitação'
        verbose_name_plural = 'Solicitações'
        ordering = ['-created_at']

    def __str__(self):
        return f"Solicitação {self.codigo} - {self.usuario.get_full_name()}"

    def save(self, *args, **kwargs):
        if not self.codigo:
            # Gera código automático: SOL-YYYYMMDD-XXXX
            from django.utils import timezone # Import aqui para evitar importação circular #type: ignore
            hoje = timezone.now().strftime('%Y%m%d')
            ultimo = Solicitacao.objects.filter(codigo__startswith=f'SOL-{hoje}').count()
            self.codigo = f'SOL-{hoje}-{ultimo + 1:04d}'
        super().save(*args, **kwargs)


class SolicitacaoItem(models.Model):
    solicitacao = models.ForeignKey(Solicitacao, on_delete=models.CASCADE, related_name='itens')
    produto = models.ForeignKey(Produto, on_delete=models.CASCADE)
    quantidade = models.IntegerField()
    preco_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    total_item = models.DecimalField(max_digits=10, decimal_places=2)
    observacoes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'solicitacao_itens'
        verbose_name = 'Item de Solicitação'
        verbose_name_plural = 'Itens de Solicitação'

    def __str__(self):
        return f"{self.produto.nome} ({self.quantidade}x)"

    def save(self, *args, **kwargs):
        # Calcula total do item automaticamente
        self.total_item = self.preco_unitario * self.quantidade
        super().save(*args, **kwargs)
        
        # Atualiza total da solicitação
        self.solicitacao.total_estimado = sum(
            item.total_item for item in self.solicitacao.itens.all()
        )
        self.solicitacao.save()