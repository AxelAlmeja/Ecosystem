const PASSWORD = "Reyes"; // estaa es la contra papus

// Función para verificar contraseña
function verificarPassword() {
  const input = document.getElementById("passInput").value.trim();
  if(input === PASSWORD){
    document.getElementById("donaciones-content").style.display = "block";
    alert("Contraseña correcta, ahora puedes modificar las donaciones.");
  } else {
    alert("Contraseña incorrecta");
  }
}

// Función para agregar o modificar donaciones
function agregarDonacion() {
  const nombre = document.getElementById("nombre").value.trim();
  const cantidad = parseInt(document.getElementById("cantidad").value);

  if(nombre === "" || isNaN(cantidad)){
    alert("Introduce un nombre y cantidad válidos");
    return;
  }

  const lista = document.getElementById("donaciones-list");
  const items = lista.getElementsByTagName("li");
  let encontrado = false;

  // Revisar si ya existe el nombre
  for(let i = 0; i < items.length; i++){
    if(items[i].textContent.startsWith(nombre + " -")){
      items[i].textContent = `${nombre} - ${cantidad} donaciones`;
      // Animación al actualizar
      items[i].classList.remove("donacion-anim");
      void items[i].offsetWidth; // reinicia animación
      items[i].classList.add("donacion-anim");
      encontrado = true;
      break;
    }
  }

  // Si no se encuentra, se agrega uno nuevo
  if(!encontrado){
    const li = document.createElement("li");
    li.textContent = `${nombre} - ${cantidad} donaciones`;
    li.classList.add("donacion-item", "donacion-anim"); // animación al agregar
    lista.appendChild(li);
  }

  // Limpiar inputs
  document.getElementById("nombre").value = "";
  document.getElementById("cantidad").value = "";
}
