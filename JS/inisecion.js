document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = passwordInput.value;
            const rememberMe = document.getElementById('rememberMe').checked;

            if (username === '' || password === '') {
                alert('Por favor, ingresa tanto el usuario como la contraseña.');
                return;
            }

            console.log('Usuario:', username);
            console.log('Contraseña:', password);
            console.log('Recordarme:', rememberMe);

            alert('Intento de inicio de sesión:\nUsuario: ' + username + '\nContraseña: ' + password + '\nRecordarme: ' + rememberMe);
        });
    }

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }
});
