window.onload = function() {
  const perfilGuardado = document.getElementById("perfilGuardado");

  if (localStorage.getItem("nombre")) {
    document.getElementById("mostrarNombre").textContent = localStorage.getItem("nombre");
    document.getElementById("mostrarCorreo").textContent = localStorage.getItem("correo");
    document.getElementById("mostrarNumero").textContent = localStorage.getItem("numero");
    document.getElementById("fotoPerfil").src = localStorage.getItem("foto");

    
    perfilGuardado.style.display = "block";
  } else {
    
    perfilGuardado.style.display = "none";
  }

  
  document.getElementById("nombre").value = "";
  document.getElementById("correo").value = "";
  document.getElementById("contraseña").value = "";
  document.getElementById("numero").value = "";
}


function guardarPerfil() {
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const contraseña = document.getElementById("contraseña").value;
  const numero = document.getElementById("numero").value;
  const foto = document.getElementById("foto").files[0];

  localStorage.setItem("nombre", nombre);
  localStorage.setItem("correo", correo);
  localStorage.setItem("contraseña", contraseña);
  localStorage.setItem("numero", numero);

  if (foto) {
    const reader = new FileReader();
    reader.onload = function(e) {
      localStorage.setItem("foto", e.target.result);
      mostrarDatos(nombre, correo, numero, e.target.result);
    }
    reader.readAsDataURL(foto);
  } else {
    mostrarDatos(nombre, correo, numero, localStorage.getItem("foto"));
  }


  document.getElementById("nombre").value = "";
  document.getElementById("correo").value = "";
  document.getElementById("contraseña").value = "";
  document.getElementById("numero").value = "";

  
  document.getElementById("perfilGuardado").style.display = "block";
}


function mostrarDatos(nombre, correo, numero, foto) {
  document.getElementById("mostrarNombre").textContent = nombre;
  document.getElementById("mostrarCorreo").textContent = correo;
  document.getElementById("mostrarNumero").textContent = numero;
  document.getElementById("fotoPerfil").src = foto;
}


function borrarPerfil() {
  localStorage.clear();
  document.getElementById("mostrarNombre").textContent = "";
  document.getElementById("mostrarCorreo").textContent = "";
  document.getElementById("mostrarNumero").textContent = "";
  document.getElementById("fotoPerfil").src = "";

  
  document.getElementById("perfilGuardado").style.display = "none";
}

