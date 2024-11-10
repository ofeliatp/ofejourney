document.addEventListener('DOMContentLoaded', function () {
  const menuItems = document.getElementsByClassName('menu-item');

  // Recorremos todos los elementos con la clase 'menu-item'
  Array.from(menuItems).forEach(function (menuItem) {
    menuItem.addEventListener('mouseover', function () {
      this.classList.add('link-hovered'); // Añadimos la clase al elemento que dispara el evento
    });

    menuItem.addEventListener('mouseout', function () {
      this.classList.remove('link-hovered'); // Quitamos la clase al mismo elemento
    });
  });
});
