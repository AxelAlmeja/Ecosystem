function toggleMenu() {
    const menu = document.getElementById("menu");
    if (menu) {
        menu.classList.toggle('menu-activo');
    }
}

function initEventListeners() {
    const botonMenu = document.querySelector('.boton-menu');
    
    if (botonMenu) {
        botonMenu.addEventListener('click', toggleMenu);
    }
}

document.addEventListener('DOMContentLoaded', initEventListeners);