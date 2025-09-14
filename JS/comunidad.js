document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("lista-ideas-guardadas");
  const form = document.getElementById("formulario-ideas");
  const input = document.getElementById("idea-texto");
  const borrarBtn = document.getElementById("borrar-ideas-btn");
  const contador = document.getElementById("contador-ideas");
  const feedback = document.getElementById("mensaje-feedback");

  const obtenerIdeas = () => JSON.parse(localStorage.getItem("ideasVerdes")) || [];
  const guardarIdeas = ideas => localStorage.setItem("ideasVerdes", JSON.stringify(ideas));
  const obtenerVotos = () => JSON.parse(localStorage.getItem("votosUsuario")) || {};
  const guardarVotos = votos => localStorage.setItem("votosUsuario", JSON.stringify(votos));

  function mostrarIdeas() {
    const ideas = obtenerIdeas();
    const votosUsuario = obtenerVotos();
    lista.innerHTML = "";
    if (ideas.length === 0) {
      lista.innerHTML = `<li>No hay ideas aún. ¡Sé el primero en proponer una!</li>`;
    } else {
      ideas.sort((a, b) => b.votos - a.votos || new Date(b.fecha) - new Date(a.fecha));
      ideas.forEach(idea => {
        const li = document.createElement("li");
        const fechaFormato = new Date(idea.fecha).toLocaleDateString("es-ES", {
          day: "numeric", month: "long", year: "numeric"
        });
        const haVotado = votosUsuario[idea.fecha] !== undefined;
        const claseBoton = haVotado ? "like-btn votado" : "like-btn";
        li.innerHTML = `
          <div>
            <span class="idea-texto">${idea.texto}</span>
            <span class="idea-fecha">${fechaFormato}</span>
          </div>
          <div>
            <span class="votos">${idea.votos}</span>
            <button class="${claseBoton}" data-fecha="${idea.fecha}" ${haVotado ? "disabled" : ""}>👍</button>
          </div>
        `;
        lista.appendChild(li);
      });
    }
    contador.textContent = `Total de ideas: ${ideas.length}`;
  }

  function enviarIdea() {
    const texto = input.value.trim();
    if (!texto) {
      mostrarFeedback("Por favor escribe una idea.", "error");
      return;
    }
    const ideas = obtenerIdeas();
    const nuevaIdea = { texto, votos: 0, fecha: new Date().toISOString() };
    ideas.push(nuevaIdea);
    guardarIdeas(ideas);
    mostrarIdeas();
    input.value = "";
    mostrarFeedback("✅ Tu idea fue guardada con éxito.", "exito");
  }

  function mostrarFeedback(msg, tipo) {
    feedback.textContent = msg;
    feedback.className = tipo;
    setTimeout(() => {
      feedback.className = "oculto";
    }, 2500);
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    enviarIdea();
  });

  input.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviarIdea();
    }
  });

  borrarBtn.addEventListener("click", () => {
    localStorage.removeItem("ideasVerdes");
    localStorage.removeItem("votosUsuario");
    mostrarIdeas();
    mostrarFeedback("Todas las ideas fueron borradas.", "error");
  });

  lista.addEventListener("click", e => {
    if (e.target.classList.contains("like-btn") && !e.target.disabled) {
      const fecha = e.target.dataset.fecha;
      const ideas = obtenerIdeas();
      const votosUsuario = obtenerVotos();
      const idea = ideas.find(i => i.fecha === fecha);
      if (idea) {
        idea.votos++;
        guardarIdeas(ideas);
        votosUsuario[fecha] = true;
        guardarVotos(votosUsuario);
        mostrarIdeas();
      }
    }
  });

  mostrarIdeas();
});
