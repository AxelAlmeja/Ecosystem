document.addEventListener('DOMContentLoaded', function () {
  const tarjetas = document.querySelectorAll('.tarjeta');
  const btnAnterior = document.getElementById('anteriorBtn');
  const btnSiguiente = document.getElementById('siguienteBtn');
  let indiceActual = 0;

  function actualizarClasesCarrusel() {
    tarjetas.forEach((tarjeta, i) => {
      tarjeta.classList.remove('activa', 'izquierda', 'derecha', 'atras');
      if (i === indiceActual) {
        tarjeta.classList.add('activa');
      } else if (i === (indiceActual - 1 + tarjetas.length) % tarjetas.length) {
        tarjeta.classList.add('izquierda');
      } else if (i === (indiceActual + 1) % tarjetas.length) {
        tarjeta.classList.add('derecha');
      } else {
        tarjeta.classList.add('atras');
      }
    });
  }

  btnAnterior.addEventListener('click', () => {
    indiceActual = (indiceActual - 1 + tarjetas.length) % tarjetas.length;
    actualizarClasesCarrusel();
  });

  btnSiguiente.addEventListener('click', () => {
    indiceActual = (indiceActual + 1) % tarjetas.length;
    actualizarClasesCarrusel();
  });

  actualizarClasesCarrusel();
});
