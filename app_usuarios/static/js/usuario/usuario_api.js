// API Client para o sistema de usuário
class UsuarioAPI {
    constructor() {
        this.baseURL = '/api/usuario';
    }

    async getCSRFToken() {
        // Tenta obter o token CSRF do Django
        const token = document.querySelector('[name=csrfmiddlewaretoken]')?.value;
        if (token) return token;
        
        // Se não encontrar, tenta obter via cookie
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'csrftoken') {
                return value;
            }
        }
        return '';
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': await this.getCSRFToken()
            },
            credentials: 'same-origin' // Inclui cookies de sessão
        };

        const finalOptions = { ...defaultOptions, ...options };
        
        try {
            const response = await fetch(url, finalOptions);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || `HTTP ${response.status}`);
            }
            
            return data;
        } catch (error) {
            console.error('Erro na requisição:', error);
            throw error;
        }
    }

    // Catálogo de produtos
    async getCatalogo(filtros = {}) {
        const params = new URLSearchParams();
        if (filtros.categoria && filtros.categoria !== 'all') {
            params.append('categoria', filtros.categoria);
        }
        if (filtros.busca) {
            params.append('busca', filtros.busca);
        }
        
        const queryString = params.toString();
        const endpoint = queryString ? `/catalogo/?${queryString}` : '/catalogo/';
        
        return await this.request(endpoint);
    }

    // Solicitações
    async getMinhasSolicitacoes(filtros = {}) {
        const params = new URLSearchParams();
        if (filtros.status) {
            params.append('status', filtros.status);
        }
        
        const queryString = params.toString();
        const endpoint = queryString ? `/solicitacoes/?${queryString}` : '/solicitacoes/';
        
        return await this.request(endpoint);
    }

    async criarSolicitacao(dados) {
        return await this.request('/solicitacoes/criar/', {
            method: 'POST',
            body: JSON.stringify(dados)
        });
    }

    // Perfil
    async getPerfil() {
        return await this.request('/perfil/');
    }

    async atualizarPerfil(dados) {
        return await this.request('/perfil/atualizar/', {
            method: 'POST',
            body: JSON.stringify(dados)
        });
    }
}

// Instância global da API
const api = new UsuarioAPI();

// Funções atualizadas para usar a API real
async function carregarCatalogo(filtro = 'all', busca = '') {
    try {
        const response = await api.getCatalogo({ categoria: filtro, busca });
        
        if (response.success) {
            return response.data;
        } else {
            throw new Error(response.message);
        }
    } catch (error) {
        console.error('Erro ao carregar catálogo:', error);
        alert('Erro ao carregar produtos: ' + error.message);
        return [];
    }
}

async function carregarMinhasSolicitacoes() {
    try {
        const response = await api.getMinhasSolicitacoes();
        
        if (response.success) {
            return response.data;
        } else {
            throw new Error(response.message);
        }
    } catch (error) {
        console.error('Erro ao carregar solicitações:', error);
        alert('Erro ao carregar solicitações: ' + error.message);
        return [];
    }
}

async function carregarPerfilUsuario() {
    try {
        const response = await api.getPerfil();
        
        if (response.success) {
            return response.data;
        } else {
            throw new Error(response.message);
        }
    } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        return null;
    }
}

async function enviarSolicitacao(itens, justificativa) {
    try {
        const dados = {
            itens: itens.map(item => ({
                produto_id: item.id,
                quantidade: item.quantidade
            })),
            justificativa: justificativa
        };

        const response = await api.criarSolicitacao(dados);
        
        if (response.success) {
            return response;
        } else {
            throw new Error(response.message);
        }
    } catch (error) {
        console.error('Erro ao enviar solicitação:', error);
        throw error;
    }
}

// Função para exibir produtos do catálogo
async function exibirCatalogo(filtro = 'all', busca = '') {
    const catalogResults = document.getElementById('catalogResults');
    catalogResults.innerHTML = '<div class="catalog-item">Carregando produtos...</div>';
    
    try {
        const produtos = await carregarCatalogo(filtro, busca);
        
        if (produtos.length === 0) {
            catalogResults.innerHTML = '<div class="catalog-item">Nenhum produto encontrado</div>';
            return;
        }
        
        catalogResults.innerHTML = '';
        
        produtos.forEach(produto => {
            const item = document.createElement('div');
            item.className = 'catalog-item';
            
            item.innerHTML = `
                <div class="item-image">
                    <i class="fas fa-${produto.icone}"></i>
                </div>
                <h3>${produto.nome}</h3>
                <ul class="item-specs">
                    <li><strong>Código:</strong> ${produto.codigo}</li>
                    <li><strong>Preço:</strong> ${produto.preco_formatado}</li>
                    <li><strong>Estoque:</strong> ${produto.estoque} unidades</li>
                    ${produto.descricao ? `<li>${produto.descricao}</li>` : ''}
                </ul>
                <button class="btn btn-primary add-to-cart" data-id="${produto.id}">
                    <i class="fas fa-cart-plus"></i> Adicionar
                </button>
            `;
            
            catalogResults.appendChild(item);
        });
        
        // Adicionar eventos aos botões
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                const produto = produtos.find(p => p.id === id);
                if (produto) {
                    adicionarAoCarrinho(produto);
                }
            });
        });
        
    } catch (error) {
        catalogResults.innerHTML = '<div class="catalog-item">Erro ao carregar produtos</div>';
    }
}

// Função para carregar solicitações
async function carregarSolicitacoes() {
    const requestsList = document.getElementById('requestsList');
    requestsList.innerHTML = '<div class="request-item">Carregando solicitações...</div>';
    
    try {
        const solicitacoes = await carregarMinhasSolicitacoes();
        
        if (solicitacoes.length === 0) {
            requestsList.innerHTML = '<div class="request-item">Nenhuma solicitação encontrada</div>';
            return;
        }
        
        requestsList.innerHTML = '';
        
        solicitacoes.forEach(solicitacao => {
            const item = document.createElement('div');
            item.className = 'request-item';
            
            const itensTexto = solicitacao.itens.map(item => 
                `${item.produto} (${item.quantidade}x)`
            ).join(', ');
            
            let statusClass = '';
            let statusText = solicitacao.status;
            
            switch(solicitacao.status_code) {
                case 'approved':
                    statusClass = 'status-approved';
                    statusText = 'Aprovado';
                    break;
                case 'pending':
                    statusClass = 'status-pending';
                    statusText = 'Pendente';
                    break;
                case 'denied':
                    statusClass = 'status-rejected';
                    statusText = 'Negado';
                    break;
                case 'purchased':
                    statusClass = 'status-approved';
                    statusText = 'Comprado';
                    break;
                case 'delivered':
                    statusClass = 'status-approved';
                    statusText = 'Entregue';
                    break;
            }
            
            item.innerHTML = `
                <div class="request-info">
                    <strong>Solicitação #${solicitacao.id}</strong>
                    <span class="request-date">${solicitacao.data}</span>
                    <span class="request-items">${itensTexto}</span>
                    ${solicitacao.observacoes_admin ? `<div class="request-notes">Observações: ${solicitacao.observacoes_admin}</div>` : ''}
                </div>
                <div>
                    <span class="request-status ${statusClass}">${statusText}</span>
                </div>
            `;
            
            requestsList.appendChild(item);
        });
        
    } catch (error) {
        requestsList.innerHTML = '<div class="request-item">Erro ao carregar solicitações</div>';
    }
}

// Função para atualizar perfil do usuário
async function atualizarPerfilUsuario() {
    try {
        const perfil = await carregarPerfilUsuario();
        
        if (perfil) {
            document.querySelector('.user-avatar').textContent = perfil.avatar;
            document.querySelector('.user-name').textContent = perfil.nome_completo;
            document.querySelector('.user-department').textContent = `Departamento de ${perfil.departamento}`;
        }
    } catch (error) {
        console.error('Erro ao carregar perfil:', error);
    }
}

// Função para enviar solicitação
async function enviarSolicitacaoCompleta() {
    const carrinho = window.carrinho || [];
    
    if (carrinho.length === 0) {
        alert('Adicione itens ao carrinho antes de enviar a solicitação');
        return;
    }
    
    const justificativa = prompt('Digite a justificativa para esta solicitação:');
    if (!justificativa) {
        alert('Justificativa é obrigatória');
        return;
    }
    
    try {
        const response = await enviarSolicitacao(carrinho, justificativa);
        alert('Solicitação enviada com sucesso!');
        
        // Limpar carrinho
        window.carrinho = [];
        atualizarCarrinho();
        
        // Recarregar solicitações
        carregarSolicitacoes();
        
    } catch (error) {
        alert('Erro ao enviar solicitação: ' + error.message);
    }
}

// Inicialização quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Carregar dados iniciais
    exibirCatalogo();
    carregarSolicitacoes();
    atualizarPerfilUsuario();
    
    // Atualizar ano no footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Event listeners para filtros
    const filterButtons = document.querySelectorAll('.catalog-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            exibirCatalogo(this.dataset.filter);
        });
    });
    
    // Event listener para busca
    const searchInput = document.getElementById('productSearch');
    searchInput.addEventListener('input', function() {
        const termo = this.value.trim();
        const filtroAtivo = document.querySelector('.catalog-btn.active').dataset.filter;
        exibirCatalogo(filtroAtivo, termo);
    });
    
    // Event listener para envio de solicitação
    const submitBtn = document.getElementById('submitRequest');
    if (submitBtn) {
        submitBtn.addEventListener('click', enviarSolicitacaoCompleta);
    }
    
    // Event listeners para navegação
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            alternarAba(tabId);
        });
    });
    
    // Event listener para perfil
    const userProfile = document.getElementById('userProfile');
    const profileDropdown = document.getElementById('profileDropdown');
    if (userProfile && profileDropdown) {
        userProfile.addEventListener('click', function() {
            profileDropdown.classList.toggle('show');
        });
    }
    
    // Fechar dropdown quando clicar fora
    document.addEventListener('click', function(event) {
        if (userProfile && !userProfile.contains(event.target)) {
            profileDropdown.classList.remove('show');
        }
    });
});

// Função para alternar abas (mantida do código original)
function alternarAba(abaId) {
    const tabContents = document.querySelectorAll('.tab-content');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Atualiza conteúdos
    tabContents.forEach(content => content.classList.remove('active'));
    document.getElementById(abaId).classList.add('active');
    
    // Atualiza menu lateral
    navItems.forEach(item => item.classList.remove('active'));
    document.querySelector(`.nav-item[data-tab="${abaId}"]`).classList.add('active');
}
