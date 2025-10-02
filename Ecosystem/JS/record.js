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

const contenedorAsignaciones = document.getElementById("contenedorAsignaciones");

asignaciones.forEach(asignacion => {
  const div = document.createElement("div");
  div.classList.add("asignacion");
  div.innerHTML = `
    <p><strong>${asignacion.grupo}</strong> – Fecha: <strong>${asignacion.fecha}</strong></p>
    <p>Especialidad asignada: <strong>${asignacion.especialidad}</strong></p>
  `;
  contenedorAsignaciones.appendChild(div);
});


const TASA_TAPAS_POR_KILO = 1000;

function obtenerRecolecciones() {
  const recoleccionesJSON = localStorage.getItem('recoleccionesTapas') || '[]';
  return JSON.parse(recoleccionesJSON);
}

function guardarRecolecciones(recolecciones) {
  localStorage.setItem('recoleccionesTapas', JSON.stringify(recolecciones));
}

function actualizarEstadisticas() {
  const recolecciones = obtenerRecolecciones();
  
  const totalTapas = recolecciones.reduce((sum, r) => sum + r.cantidad, 0);
  const totalKilos = totalTapas / TASA_TAPAS_POR_KILO;

  document.getElementById('totalTapas').textContent = totalTapas.toLocaleString('es-MX');
  document.getElementById('totalKilos').textContent = `${totalKilos.toFixed(2)} kg`;

  const rankingMap = {};
  recolecciones.forEach(r => {
    const key = `${r.especialidad} - ${r.grupo} - ${r.turno}`;
    if (!rankingMap[key]) {
      rankingMap[key] = 0;
    }
    rankingMap[key] += r.cantidad;
  });

  const rankingArray = Object.entries(rankingMap)
    .map(([equipo, cantidad]) => ({ equipo, cantidad }))
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 10); 

  const listaRanking = document.getElementById('listaMejoresRecolectores');
  listaRanking.innerHTML = '';

  if (rankingArray.length === 0) {
    listaRanking.innerHTML = '<li>Aún no hay registros de recolección.</li>';
  } else {
    rankingArray.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${item.equipo}</span>
        <span class="ranking-cantidad">${item.cantidad.toLocaleString('es-MX')} tapas</span>
      `;
      listaRanking.appendChild(li);
    });
  }
}

document.getElementById('formTapas').addEventListener('submit', function(e) {
  e.preventDefault();

  const especialidad = document.getElementById('especialidad').value;
  const grupo = document.getElementById('grupo').value;
  const turno = document.getElementById('turno').value;
  const cantidad = parseInt(document.getElementById('cantidad').value, 10);

  const nuevaRecoleccion = {
    especialidad,
    grupo,
    turno,
    cantidad,
    fecha: new Date().toISOString()
  };

  const recolecciones = obtenerRecolecciones();
  recolecciones.push(nuevaRecoleccion);
  guardarRecolecciones(recolecciones);

  actualizarEstadisticas();

  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("asignacion");
  resultadoDiv.innerHTML = `
    <p>¡Registro de tapas exitoso!</p>
    <p><strong>Especialidad:</strong> ${especialidad}</p>
    <p><strong>Grupo:</strong> ${grupo}</p>
    <p><strong>Turno:</strong> ${turno}</p>
    <p><strong>Cantidad:</strong> ${cantidad.toLocaleString('es-MX')} tapas</p>
  `;
  
  const registroContenedor = document.getElementById("resultadoRegistro");
  registroContenedor.innerHTML = '';
  registroContenedor.appendChild(resultadoDiv);

  document.getElementById('formTapas').reset();
});

document.addEventListener('DOMContentLoaded', actualizarEstadisticas);