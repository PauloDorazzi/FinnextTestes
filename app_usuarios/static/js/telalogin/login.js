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

    // Pega os campos
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Por favor, preencha todos os campos');
        return;
    }

    // Cria um input oculto para enviar o tipo
    const tipoInput = document.createElement("input");
    tipoInput.type = "hidden";
    tipoInput.name = "tipo";
    tipoInput.value = isUserActive ? "usuario" : "admin";
    loginForm.appendChild(tipoInput);

    // Agora deixa o formulário ser enviado normalmente
    loginForm.submit();
});
