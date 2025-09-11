document.getElementById('formulario-perfil').addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const carrera = document.getElementById('carrera').value;
    const turno = document.querySelector('input[name="turno"]:checked').value;
    const grupo = document.getElementById('grupo').value;
    const imagenInput = document.getElementById('imagen');

    document.getElementById('nombre-perfil').textContent = nombre;
    document.getElementById('correo-perfil').textContent = correo;
    document.getElementById('carrera-perfil').textContent = carrera;
    document.getElementById('turno-perfil').textContent = turno;
    document.getElementById('grupo-perfil').textContent = grupo;

    if (imagenInput.files && imagenInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('foto-perfil').src = e.target.result;
        }
        reader.readAsDataURL(imagenInput.files[0]);
    } else {
        document.getElementById('foto-perfil').src = '';
    }

    document.getElementById('contenedor-formulario').style.display = 'none';
    document.getElementById('contenedor-perfil').style.display = 'block';
});

document.querySelector('.boton-editar').addEventListener('click', function() {
    document.getElementById('contenedor-formulario').style.display = 'block';
    document.getElementById('contenedor-perfil').style.display = 'none';
});
