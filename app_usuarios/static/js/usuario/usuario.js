// Base de dados de equipamentos
const equipamentos = [
    { 
        id: 1, 
        nome: "Notebook Dell Latitude 5420", 
        categoria: "notebook",
        specs: [
            "Processador: i5-1145G7",
            "Memória: 16GB RAM",
            "Armazenamento: 512GB SSD",
            "Tela: 14\" Full HD"
        ],
        codigo: "MOD-DELL-5420",
        icone: "laptop"
    },
    { 
        id: 2, 
        nome: "Tablet Samsung Galaxy Tab S7", 
        categoria: "tablet",
        specs: [
            "Tela: 11\" LTPS",
            "Processador: Snapdragon 865+",
            "Memória: 6GB RAM",
            "Armazenamento: 128GB"
        ],
        codigo: "TAB-SAM-S7",
        icone: "tablet"
    },
    { 
        id: 3, 
        nome: "Monitor LG 24MK600M", 
        categoria: "acessorio",
        specs: [
            "Tela: 24\" Full HD",
            "Taxa de atualização: 75Hz",
            "Tipo: IPS",
            "Conexões: HDMI, VGA"
        ],
        codigo: "MON-LG-24MK",
        icone: "desktop"
    },
    { 
        id: 4, 
        nome: "Mouse sem fio Logitech MX Master 3", 
        categoria: "acessorio",
        specs: [
            "Conexão: Bluetooth/Unifying",
            "DPI: 4000",
            "Bateria: Recarregável",
            "Ergonomia: Para destros"
        ],
        codigo: "MOU-LOG-MX3",
        icone: "mouse"
    }
];

// Dados do usuário
const usuario = {
    nome: "Joana Silva",
    departamento: "TI",
    avatar: "JS",
    email: "joana.silva@usp.br",
    ramal: "3456",
    cargo: "Analista de Sistemas"
};

// Carrinho de solicitação e histórico
let carrinho = [];
let solicitacoes = [
    {
        id: 1001,
        data: "15/05/2023 14:30",
        itens: [
            { nome: "Notebook Dell Latitude 5420", quantidade: 2 },
            { nome: "Mouse sem fio Logitech MX Master 3", quantidade: 1 }
        ],
        status: "approved"
    },
    {
        id: 1002,
        data: "10/05/2023 09:15",
        itens: [
            { nome: "Tablet Samsung Galaxy Tab S7", quantidade: 3 }
        ],
        status: "pending"
    },
    {
        id: 1003,
        data: "05/05/2023 16:45",
        itens: [
            { nome: "Monitor LG 24MK600M", quantidade: 5 }
        ],
        status: "rejected"
    }
];

// Elementos DOM
const searchInput = document.getElementById('productSearch');
const catalogResults = document.getElementById('catalogResults');
const cartItems = document.getElementById('cartItems');
const submitBtn = document.getElementById('submitRequest');
const filterButtons = document.querySelectorAll('.catalog-btn');
const requestsList = document.getElementById('requestsList');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');
const navItems = document.querySelectorAll('.nav-item');
const userProfile = document.getElementById('userProfile');
const profileDropdown = document.getElementById('profileDropdown');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    exibirCatalogo();
    carregarSolicitacoes();
    atualizarPerfilUsuario();
    document.getElementById('current-year').textContent = new Date().getFullYear();

});

// Função para exibir o catálogo
function exibirCatalogo(filtro = 'all') {
    catalogResults.innerHTML = '';
    
    let resultados = equipamentos;
    if (filtro !== 'all') {
        resultados = equipamentos.filter(equip => equip.categoria === filtro);
    }
    
    if (resultados.length === 0) {
        catalogResults.innerHTML = '<div class="catalog-item">Nenhum equipamento encontrado</div>';
        return;
    }
    
    resultados.forEach(equip => {
        const item = document.createElement('div');
        item.className = 'catalog-item';
        
        const specsHTML = equip.specs.map(spec => `<li>${spec}</li>`).join('');
        
        item.innerHTML = `
            <div class="item-image">
                <i class="fas fa-${equip.icone}"></i>
            </div>
            <h3>${equip.nome}</h3>
            <ul class="item-specs">
                <li><strong>Código:</strong> ${equip.codigo}</li>
                ${specsHTML}
            </ul>
            <button class="btn btn-primary add-to-cart" data-id="${equip.id}">
                <i class="fas fa-cart-plus"></i> Adicionar
            </button>
        `;
        catalogResults.appendChild(item);
    });
    
    // Adiciona eventos aos botões
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const equip = equipamentos.find(e => e.id === id);
            adicionarAoCarrinho(equip);
        });
    });
}

// Função para carregar solicitações
function carregarSolicitacoes() {
    requestsList.innerHTML = '';
    
    if (solicitacoes.length === 0) {
        requestsList.innerHTML = '<div class="request-item">Nenhuma solicitação encontrada</div>';
        return;
    }
    
    solicitacoes.forEach(solicitacao => {
        const item = document.createElement('div');
        item.className = 'request-item';
        
        const itensTexto = solicitacao.itens.map(item => 
            `${item.nome} (${item.quantidade}x)`
        ).join(', ');
        
        let statusClass = '';
        let statusText = '';
        
        switch(solicitacao.status) {
            case 'approved':
                statusClass = 'status-approved';
                statusText = 'Aprovado';
                break;
            case 'pending':
                statusClass = 'status-pending';
                statusText = 'Pendente';
                break;
            case 'rejected':
                statusClass = 'status-rejected';
                statusText = 'Rejeitado';
                break;
        }
        
        item.innerHTML = `
            <div class="request-info">
                <strong>Solicitação #${solicitacao.id}</strong>
                <span class="request-date">${solicitacao.data}</span>
                <span class="request-items">${itensTexto}</span>
            </div>
            <div>
                <span class="request-status ${statusClass}">${statusText}</span>
            </div>
        `;
        
        requestsList.appendChild(item);
    });
}

function alternarAba(abaId) {
    // Atualiza conteúdos
    tabContents.forEach(content => content.classList.remove('active'));
    document.getElementById(abaId).classList.add('active');
    
    // Atualiza menu lateral
    navItems.forEach(item => item.classList.remove('active'));
    document.querySelector(`.nav-item[data-tab="${abaId}"]`).classList.add('active');
}

// Função para mostrar informações do perfil
function mostrarPerfil() {
    // Aqui você pode implementar um modal mais detalhado
    alert(`Informações do Usuário:\n\nNome: ${usuario.nome}\nEmail: ${usuario.email}\nDepartamento: ${usuario.departamento}\nCargo: ${usuario.cargo}\nRamal: ${usuario.ramal}`);
}

// Função para atualizar perfil do usuário
function atualizarPerfilUsuario() {
    document.querySelector('.user-avatar').textContent = usuario.avatar;
    document.querySelector('.user-name').textContent = usuario.nome;
    document.querySelector('.user-department').textContent = `Departamento de ${usuario.departamento}`;
}

// Eventos
searchInput.addEventListener('input', function() {
    const termo = this.value.trim();
    
    if (termo.length >= 2) {
        const resultados = equipamentos.filter(equip => 
            equip.nome.toLowerCase().includes(termo.toLowerCase()) ||
            equip.codigo.toLowerCase().includes(termo.toLowerCase())
        );
        
        exibirCatalogoFiltrado(resultados);
    } else {
        const filtroAtivo = document.querySelector('.catalog-btn.active').dataset.filter;
        exibirCatalogo(filtroAtivo);
    }
});

filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        exibirCatalogo(this.dataset.filter);
        searchInput.value = '';
    });
});

submitBtn.addEventListener('click', function() {
    if (carrinho.length === 0) {
        alert('Adicione itens ao carrinho antes de enviar a solicitação');
        return;
    }
    
    const novaSolicitacao = {
        id: Date.now(),
        data: new Date().toLocaleString('pt-BR'),
        itens: [...carrinho],
        status: "pending"
    };
    
    solicitacoes.unshift(novaSolicitacao);
    alert('Solicitação enviada com sucesso!');
    carrinho = [];
    atualizarCarrinho();
    carregarSolicitacoes();
});

// Eventos de navegação
tabs.forEach(tab => {
    tab.addEventListener('click', function() {
        alternarAba(this.dataset.tab);
    });
});

navItems.forEach(item => {
    item.addEventListener('click', function() {
        alternarAba(this.dataset.tab);
    });
});

// Evento do perfil
userProfile.addEventListener('click', function() {
    profileDropdown.classList.toggle('show');
});

// Fechar dropdown quando clicar fora
document.addEventListener('click', function(event) {
    if (!userProfile.contains(event.target)) {
        profileDropdown.classList.remove('show');
    }
});

// Funções do carrinho (mantidas do código anterior)
function adicionarAoCarrinho(equip) {
    const itemExistente = carrinho.find(item => item.id === equip.id);
    
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            id: equip.id,
            nome: equip.nome,
            quantidade: 1
        });
    }
    
    atualizarCarrinho();
}

function atualizarCarrinho() {
    cartItems.innerHTML = '';
    
    if (carrinho.length === 0) {
        cartItems.innerHTML = '<div class="cart-item">Carrinho vazio</div>';
        return;
    }
    
    carrinho.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${item.nome}</span>
            <div class="quantity-control">
                <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                <span>${item.quantidade}</span>
                <button class="quantity-btn increase" data-id="${item.id}">+</button>
                <button class="remove-btn" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    document.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            alterarQuantidade(id, -1);
        });
    });
    
    document.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            alterarQuantidade(id, 1);
        });
    });
    
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            removerDoCarrinho(id);
        });
    });
}

function alterarQuantidade(id, delta) {
    const item = carrinho.find(item => item.id === id);
    
    if (item) {
        item.quantidade += delta;
        
        if (item.quantidade <= 0) {
            removerDoCarrinho(id);
        } else {
            atualizarCarrinho();
        }
    }
}

function removerDoCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    atualizarCarrinho();
}

function exibirCatalogoFiltrado(resultados) {
    catalogResults.innerHTML = '';
    
    if (resultados.length === 0) {
        catalogResults.innerHTML = '<div class="catalog-item">Nenhum equipamento encontrado</div>';
        return;
    }
    
    resultados.forEach(equip => {
        const item = document.createElement('div');
        item.className = 'catalog-item';
        
        const specsHTML = equip.specs.map(spec => `<li>${spec}</li>`).join('');
        
        item.innerHTML = `
            <div class="item-image">
                <i class="fas fa-${equip.icone}"></i>
            </div>
            <h3>${equip.nome}</h3>
            <ul class="item-specs">
                <li><strong>Código:</strong> ${equip.codigo}</li>
                ${specsHTML}
            </ul>
            <button class="btn btn-primary add-to-cart" data-id="${equip.id}">
                <i class="fas fa-cart-plus"></i> Adicionar
            </button>
        `;
        catalogResults.appendChild(item);
    });
    
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const equip = equipamentos.find(e => e.id === id);
            adicionarAoCarrinho(equip);
        });
    });
}