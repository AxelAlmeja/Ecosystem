// --- Asignación de días de riego ---
const especialidades = [
  "Programación",
  "Puericultura",
  "Servicios de Hospedaje",
  "Administración de Empresas",
  "Contabilidad"
];

const asignaciones = [];

for (let dia = 1; dia <= 30; dia += 3) {
  const grupo = Math.ceil(dia / 3);
  const especialidad = especialidades[(grupo - 1) % especialidades.length];
  asignaciones.push({
    grupo: `Grupo ${grupo}`,
    especialidad,
    fecha: `${dia} de junio`
  });
}

const contenedor = document.getElementById("contenedorAsignaciones");

asignaciones.forEach(asignacion => {
  const div = document.createElement("div");
  div.classList.add("asignacion");
  div.innerHTML = `
    <p><strong>${asignacion.grupo}</strong> – Fecha: <strong>${asignacion.fecha}</strong></p>
    <p>Especialidad asignada: <strong>${asignacion.especialidad}</strong></p>
  `;
  contenedor.appendChild(div);
});

// --- Formulario de recolección de tapas ---
document.getElementById('formTapas').addEventListener('submit', function(e) {
  e.preventDefault();

  const especialidad = document.getElementById('especialidad').value;
  const grupo = document.getElementById('grupo').value;
  const turno = document.getElementById('turno').value;
  const cantidad = document.getElementById('cantidad').value;

  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("asignacion");
  resultadoDiv.innerHTML = `
    <p><strong>Especialidad:</strong> ${especialidad}</p>
    <p><strong>Grupo:</strong> ${grupo}</p>
    <p><strong>Turno:</strong> ${turno}</p>
    <p><strong>Cantidad de tapas recolectadas:</strong> ${cantidad}</p>
  `;

  document.getElementById("resultadosTapas").appendChild(resultadoDiv);

  // Limpiar formulario
  document.getElementById('formTapas').reset();
});
