document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.admin-sidebar');
    
    mobileMenuBtn.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    // Submenus
    const hasSubmenu = document.querySelectorAll('.has-submenu > a');
    
    hasSubmenu.forEach(item => {
        item.addEventListener('click', function(e) {
            const submenu = this.nextElementSibling;
            const parentLi = this.parentElement;
            
            // Fecha outros submenus abertos
            document.querySelectorAll('.has-submenu').forEach(li => {
                if (li !== parentLi) {
                    li.classList.remove('active');
                }
            });
            
            // Alterna o submenu atual
            parentLi.classList.toggle('active');
            e.preventDefault();
        });
    });
    
    // Modal de Solicitação
    const modal = document.getElementById('request-modal');
    const openModalButtons = document.querySelectorAll('.btn-primary.btn-sm');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.classList.add('active');
        });
    });
    
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    });
    
    // Fechar modal ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Simular dados dinâmicos para o sistema de compras
    setInterval(() => {
        // Atualizar estatísticas
        const pendingRequests = document.getElementById('pending-requests');
        const totalEquipment = document.getElementById('total-equipment');
        const approvedRequests = document.getElementById('approved-requests');
        const monthlyBudget = document.getElementById('monthly-budget');
        
        // Simular variação nos números
        const currentPending = parseInt(pendingRequests.textContent);
        const currentApproved = parseInt(approvedRequests.textContent);
        
        // 20% de chance de adicionar uma nova solicitação pendente
        if (Math.random() < 0.2) {
            pendingRequests.textContent = currentPending + 1;
        }
        
        // 10% de chance de aprovar uma solicitação pendente
        if (Math.random() < 0.1 && currentPending > 0) {
            pendingRequests.textContent = currentPending - 1;
            approvedRequests.textContent = currentApproved + 1;
        }
        
        // Atualizar orçamento (pequenas variações)
        const currentBudget = parseInt(monthlyBudget.textContent.replace(/[^\d]/g, ''));
        const budgetChange = Math.floor(Math.random() * 5000) - 2500; // Variação entre -2500 e +2500
        monthlyBudget.textContent = `R$ ${(currentBudget + budgetChange).toLocaleString('pt-BR')}`;
    }, 3000);
    
    // Atualizar o ano no footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Fechar menu ao clicar em um item (mobile)
    const menuLinks = document.querySelectorAll('.sidebar-menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                sidebar.classList.remove('active');
            }
        });
    });
    
    // Sistema de Navegação
    const contentBody = document.getElementById('content-body');
    const pageTitle = document.getElementById('page-title');
    const breadcrumbCurrent = document.getElementById('breadcrumb-current');
    
    // Salva o conteúdo original do dashboard
    const dashboardContent = contentBody.innerHTML;
    
    // Mapeamento de templates e títulos
    const routes = {
        '#dashboard': {
            template: null, // Usa o conteúdo padrão já existente
            title: 'Dashboard de Compras',
            breadcrumb: 'Dashboard'
        },
        '#solicitacoes': {
            template: 'solicitacoes-template',
            title: 'Solicitações',
            breadcrumb: 'Solicitações'
        },
        '#produtos-listar': {
            template: 'produtos-listar-template',
            title: 'Lista de Produtos',
            breadcrumb: 'Produtos / Listar'
        },
        '#produtos-novo': {
            template: 'produtos-novo-template',
            title: 'Cadastrar Novo Produto',
            breadcrumb: 'Produtos / Novo'
        },
        '#produtos-categorias': {
            template: 'produtos-categorias-template',
            title: 'Categorias de Produtos',
            breadcrumb: 'Produtos / Categorias'
        },
        '#relatorios-compras': {
            template: 'relatorios-compras-template',
            title: 'Relatórios de Compras',
            breadcrumb: 'Relatórios / Compras'
        },
        '#configuracoes': {
            template: 'configuracoes-template',
            title: 'Configurações do Sistema',
            breadcrumb: 'Configurações'
        },
        '#usuarios': {
            template: 'usuarios-template',
            title: 'Gestão de Usuários',
            breadcrumb: 'Usuários'
        }
    };
    
    // Função para carregar a página
    function loadPage(hash) {
        // Verifica se a rota existe, senão usa o dashboard
        const route = routes[hash] || routes['#dashboard'];
        
        // Atualiza título e breadcrumb
        pageTitle.textContent = route.title;
        breadcrumbCurrent.textContent = route.breadcrumb;
        
        // Se for o dashboard, restaura o conteúdo original
        if (hash === '#dashboard' || !hash) {
            contentBody.innerHTML = dashboardContent;
            // Reativa os event listeners para os elementos do dashboard
            activateDashboardEvents();
        } else {
            // Carrega o template para outras páginas
            const template = document.getElementById(route.template);
            if (template) {
                contentBody.innerHTML = template.innerHTML;
                // Reativa os event listeners para os elementos do template
                activateTemplateEvents();
            }
        }
        
        // Atualiza menu ativo
        updateActiveMenu(hash);
    }
    
    // Função para ativar eventos nos templates carregados
    function activateTemplateEvents() {
        // Adicione aqui qualquer inicialização necessária para os elementos do template
        const filterBtn = document.querySelector('.filters-row .btn-primary');
        if (filterBtn) {
            filterBtn.addEventListener('click', function() {
                const department = document.getElementById('filter-department').value;
                const status = document.getElementById('filter-status').value;
                
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Filtrando...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-filter"></i> Filtrar';
                    this.disabled = false;
                    alert(`Filtros aplicados:\nDepartamento: ${department || 'Todos'}\nStatus: ${status || 'Todos'}`);
                }, 1000);
            });
        }
    }
    
    // Função para ativar eventos no dashboard
    function activateDashboardEvents() {
        // Reativa o filtro do dashboard
        const filterBtn = document.querySelector('.filters-row .btn-primary');
        if (filterBtn) {
            filterBtn.addEventListener('click', function() {
                const department = document.getElementById('filter-department').value;
                const status = document.getElementById('filter-status').value;
                
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Filtrando...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-filter"></i> Filtrar';
                    this.disabled = false;
                    alert(`Filtros aplicados:\nDepartamento: ${department || 'Todos'}\nStatus: ${status || 'Todos'}`);
                }, 1000);
            });
        }
    }
    
    // Função para atualizar o menu ativo
    function updateActiveMenu(hash) {
        // Remove a classe active de todos os itens
        document.querySelectorAll('.sidebar-menu li').forEach(item => {
            item.classList.remove('active');
        });
        
        // Adiciona a classe active ao item correspondente
        const menuItem = document.querySelector(`.sidebar-menu a[href="${hash}"]`);
        if (menuItem) {
            menuItem.parentElement.classList.add('active');
            
            // Se for um submenu, ativa também o item pai
            const submenuParent = menuItem.closest('.submenu');
            if (submenuParent) {
                submenuParent.previousElementSibling.parentElement.classList.add('active');
            }
        } else if (!hash || hash === '#dashboard') {
            // Ativa o dashboard por padrão
            document.querySelector('.sidebar-menu a[href="#dashboard"]').parentElement.classList.add('active');
        }
    }
    
    // Atualiza quando a hash muda
    window.addEventListener('hashchange', function() {
        loadPage(window.location.hash);
    });
    
    // Carrega a página inicial
    function handleInitialLoad() {
        const hash = window.location.hash || '#dashboard';
        loadPage(hash);
    }
    
    // Carrega a página inicial
    handleInitialLoad();
});