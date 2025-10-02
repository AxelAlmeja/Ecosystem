document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario-perfil');
    const contenedorFormulario = document.getElementById('contenedor-formulario');
    const contenedorPerfil = document.getElementById('contenedor-perfil');
    const botonEditar = document.querySelector('.boton-editar');
    const botonBorrar = document.getElementById('borrar-perfil-btn'); 
    
    function mostrarFeedback(mensaje, tipo = 'success') {
        console.log(`[${tipo.toUpperCase()}]: ${mensaje}`);
        alert(mensaje); 
    }

    function borrarPerfil() {
        document.getElementById('control-number').value = ''; 
        document.getElementById('correo').value = '';
        document.getElementById('contraseña').value = '';
        document.getElementById('numero').value = '';
        document.getElementById('imagen').value = ''; 

        document.getElementById('control-number-perfil').textContent = ''; 
        document.getElementById('correo-perfil').textContent = '';
        document.getElementById('numero-perfil').textContent = '';
        document.getElementById('foto-perfil').src = ''; 

        contenedorFormulario.style.display = 'flex'; 
        contenedorPerfil.style.display = 'none';

        mostrarFeedback('Datos de perfil borrados correctamente.', 'info');
    }

    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();

            const controlNumber = document.getElementById('control-number').value; 
            const correo = document.getElementById('correo').value;
            const numero = document.getElementById('numero').value;
            const imagenInput = document.getElementById('imagen');

            document.getElementById('control-number-perfil').textContent = controlNumber; 
            document.getElementById('correo-perfil').textContent = correo;
            document.getElementById('numero-perfil').textContent = numero;

            if (imagenInput.files && imagenInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('foto-perfil').src = e.target.result;
                }
                reader.readAsDataURL(imagenInput.files[0]);
            } else {
                document.getElementById('foto-perfil').src = 'placeholder.png';
            }

            contenedorFormulario.style.display = 'none';
            contenedorPerfil.style.display = 'flex'; 
            
            mostrarFeedback('Perfil guardado exitosamente.');
        });
    }

    if (botonEditar) {
        botonEditar.addEventListener('click', function() {
            contenedorFormulario.style.display = 'flex';
            contenedorPerfil.style.display = 'none';
        });
    }

    if (botonBorrar) {
        botonBorrar.addEventListener('click', borrarPerfil);
    }
});