// Alternar entre usuário e administrador
const typeButtons = document.querySelectorAll('.login-type-btn');
const loginForm = document.getElementById('loginForm');
const btnUsuario = document.getElementById('btnUsuario');
const btnAdmin = document.getElementById('btnAdmin');

typeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        typeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Redirecionamento quando o formulário for submetido
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Verifica qual botão está ativo (usuário ou admin)
    const isUserActive = btnUsuario.classList.contains('active');
    
    // Simples validação (em uma aplicação real, você validaria no servidor)
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        alert('Por favor, preencha todos os campos');
        return;
    }
    
    // Redireciona para a tela correta usando caminhos relativos para o servidor HTTP simples
    // Assumindo que telalogin.html, usuario.html e admin.html estão na mesma pasta 'templates/'
    if (isUserActive) {
        window.location.href = '../usuario/usuario.html'; 
    } else {
        window.location.href = '../admin/admin.html';   
    }
});