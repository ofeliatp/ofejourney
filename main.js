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

  //ANIMACIÓN TEXTOS H1

  gsap.config({
    trialWarn: false,
  });

  // https://gsap.com/docs/v3/Eases/CustomEase/
  gsap.registerPlugin(CustomEase);

  gsap.registerPlugin(MorphSVGPlugin);

  gsap.registerPlugin(ScrollTrigger);

  gsap.registerPlugin(SplitText);

  function animateText(selector) {
    // Obtener todos los elementos que coinciden con el selector
    const elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
      // Crear una nueva línea de tiempo para cada elemento
      const tltext = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 80%', // Iniciar la animación cuando el top del texto está en el 80% de la ventana
          end: 'bottom bottom', // Finalizar la animación cuando el bottom del texto está en el fondo de la ventana
          toggleActions: 'play none none reverse', // Acciones de animación
        },
      });

      // Dividir el texto en caracteres
      const mySplitText = new SplitText(element, { type: 'words,chars' });
      const chars = mySplitText.chars;

      // Ajustar perspectiva
      gsap.set(element, { perspective: 400 });

      // Animación inicial del texto
      tltext.from(chars, {
        duration: 0.8,
        opacity: 0,
        scale: 0,
        y: 80,
        rotationX: 180,
        transformOrigin: '0% 50% -50',
        ease: 'back',
        stagger: 0.01,
      });
    });
  }

  // Llamar a la función para animar cada texto con su selector correspondiente
  animateText('.v-text');

  // animacion SLIDER

  function moverElemento(id, posX, posY) {
    const elemento = document.getElementById(id);

    // Configurar el elemento para que tenga posición absoluta
    elemento.style.position = 'absolute';

    // Asignar las posiciones X y Y
    elemento.style.left = posX + 'px';
    elemento.style.top = posY + 'px';
  }

  const efecto = document.getElementById('efecto');
  const barraRoja = document.querySelector('.barra-roja');

  window.addEventListener('scroll', function () {});

  function createSlider(selectorImanges, selectorTextos) {
    let currentIndex = 0;
    const imagenes = document.querySelectorAll(selectorImanges);
    const textos = document.querySelectorAll(selectorTextos);

    function updateSlider() {
      // Quitar clases de la imagen y el texto actuales
      imagenes[currentIndex].classList.remove('display');
      imagenes[currentIndex].classList.add('hide');
      textos[currentIndex].classList.remove('text-selected');

      // Calcular el siguiente índice
      currentIndex = (currentIndex + 1) % imagenes.length;

      // Añadir clases al siguiente elemento
      imagenes[currentIndex].classList.remove('hide');
      imagenes[currentIndex].classList.add('display');
      textos[currentIndex].classList.add('text-selected');
      animateTextSlider(textos[currentIndex]);
    }
    return updateSlider;
  }
  function animateTypingEffect(element) {
    gsap.set(element, { opacity: 1, visibility: 'visible' });

    // Dividir el texto en caracteres individuales
    const split = new SplitText(element, { type: 'chars' });
    const chars = split.chars;

    // Animar cada letra con un efecto de escritura
    gsap.fromTo(
      chars,
      { opacity: 0, y: 50 }, // Estado inicial
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.05, // Retraso progresivo entre letras
        onComplete: () => {
          // Fusionar las letras nuevamente y mantener el estilo final
          split.revert();
          gsap.set(element, { opacity: 1, y: 0, visibility: 'visible' }); // Mantener el texto visible
        },
      }
    );
  }

  function animateScaleRotateText(element) {
    // Reiniciar el texto (quitar cualquier estilo previo)
    gsap.set(element, { clearProps: 'all' });

    // Animar el texto seleccionado
    gsap.fromTo(
      element,
      { opacity: 0, scale: 0.8, rotation: -45 }, // Estado inicial
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: 'power2.out',
      }
    );
  }
  function animateTextSplit(element) {
    // Crear un SplitText para el texto seleccionado
    const split = new SplitText(element, { type: 'chars' }); // Divide el texto en letras
    const chars = split.chars; // Obtiene las letras individuales

    // Animar cada letra de forma secuencial
    gsap.fromTo(
      chars,
      { opacity: 0, y: 50, rotationX: -90 }, // Estado inicial: abajo, rotadas, invisibles
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1,
        ease: 'back.out(1.7)',
        stagger: 0.05, // Retraso progresivo entre letras
        onComplete: () => split.revert(), // Revertir SplitText después de la animación
      }
    );
  }
  function animateWaveText(textElement) {
    // Divide el texto en caracteres individuales
    const split = new SplitText(textElement, { type: 'chars' });
    const chars = split.chars;

    // Animación de onda
    gsap.fromTo(
      chars,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'sine.inOut',
        stagger: 0.05, // Retraso entre cada letra
        repeat: -1, // Repetir indefinidamente
        yoyo: true, // Hacer el efecto inverso
        onComplete: () => split.revert(), // Revertir el SplitText al final
      }
    );
  }
  function animateTextSlider(element) {
    gsap.fromTo(
      element,
      { opacity: 0, x: -50, scale: 0.8 }, // Estado inicial
      { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: 'power3.out' } // Animación final
    );
  }

  function animateTextSlider2(element) {
    gsap.fromTo(
      element,
      { opacity: 0, y: 50, rotation: -15, scale: 0.8 }, // Estado inicial
      {
        opacity: 1,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.4, // Animación más rápida
        ease: 'elastic.out(1, 0.4)', // Rebote suave al final
      }
    );
  }

  function animateWaveTextWithPerspective(element) {
    // Configurar la perspectiva para el contenedor
    gsap.set(element, { perspective: 500 });

    // Reiniciar las propiedades del texto
    gsap.set(element, { opacity: 1, y: 0, rotationX: 0, scale: 1 });

    // Dividir el texto en letras individuales
    const split = new SplitText(element, { type: 'chars' });
    const chars = split.chars;

    // Animar cada letra con ondas y escalado
    gsap.fromTo(
      chars,
      { opacity: 0, y: 50, rotationX: -45, scale: 0.8 }, // Estado inicial
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        duration: 1,
        ease: 'elastic.out(1, 0.5)', // Rebote suave
        stagger: 0.05, // Retraso progresivo entre letras
      }
    );
  }

  // Inicializar el slider

  const slider1 = createSlider('.slider-1', '[data-texto-1]');
  const slider2 = createSlider('.slider-2', '[data-texto-2]');
  const slider3 = createSlider('.slider-3', '[data-texto-3]');

  // Ejecutar la función cada 3 segundos
  setInterval(slider1, 3000);
  setInterval(slider2, 3000);
  setInterval(slider3, 3000);

  // fotos experiencias
});
