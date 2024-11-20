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

  function createSlider(selectorImagenes, selectorTextos) {
    let currentIndex = 0;
    const imagenes = document.querySelectorAll(selectorImagenes);
    const textos = document.querySelectorAll(selectorTextos);

    // Añadir event listener a cada texto
    Array.from(textos).forEach((texto) => {
      texto.addEventListener('click', (event) => {
        const dataTextAttr = event.target
          .getAttributeNames()
          .find((attr) => attr.startsWith('data-text'));

        if (dataTextAttr) {
          const newIndex = parseInt(
            event.target.getAttribute(dataTextAttr).replace('data-text-', ''),
            10
          );

          if (!isNaN(newIndex)) {
            currentIndex = newIndex; // Actualiza el índice al clickeado
            console.log('Nuevo índice:', currentIndex);
            updateSlider(); // Actualiza el slider inmediatamente
          }
        }
      });
    });

    function updateSlider() {
      // Quitar clases de la imagen y el texto actuales
      imagenes.forEach((img, index) => {
        img.classList.toggle('display', index === currentIndex);
        img.classList.toggle('hide', index !== currentIndex);
      });

      textos.forEach((txt, index) => {
        txt.classList.toggle('text-selected', index === currentIndex);
      });

      // Animar el nuevo texto seleccionado
      animateTextSlider(textos[currentIndex]);

      // Avanzar al siguiente índice para el auto-slider
      currentIndex = (currentIndex + 1) % imagenes.length;
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
      { opacity: 0, x: 0, scale: 0.8 }, // Estado inicial
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
  const slider4 = createSlider('.slider-4', '[data-texto-4]');

  // Ejecutar la función cada 3 segundos
  setInterval(slider1, 5000);
  setInterval(slider2, 5000);
  setInterval(slider3, 5000);
  setInterval(slider4, 5000);

  const playAnimation = () => {
    const cards = document.querySelectorAll('.card');

    // Mostrar los elementos antes de animarlos
    // cards.forEach((card) => {
    //   card.style.opacity = 0;
    // });

    // Animar los elementos
    gsap.fromTo(
      '.card',
      { scale: 0, autoAlpha: 0 }, // Ocultas al inicio

      {
        autoAlpha: 1, // Hacer visibles
        scale: 1,
        stagger: 0.1,
        ease: 'elastic.out(1, 0.8)',
        // delay: 0.5,
      }
    );
  };

  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.create({
    trigger: '.cards-container', // Selector del contenedor de las tarjetas
    start: 'top 99%', // Cuando el contenedor esté al 80% de la ventana
    onEnter: playAnimation, // Ejecuta la función al entrar en la vista
  });

  const links = document.querySelectorAll('a[nav-scroll]'); // Seleccionar solo los enlaces con data-scroll

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); // Evitar el comportamiento predeterminado del enlace

      const targetId = link.getAttribute('href').slice(1); // Obtener el ID del destino
      const targetElement = document.getElementById(targetId);
      let offset = 0;
      if (targetId == 'inicio') {
        offset = 94;
      } else if (targetId == 'itinerario') {
        offset = 84;
      } else if (targetId == 'experiencias') {
        offset = 84;
      } else if (targetId == 'tokyo') {
        offset = 83;
      } else if (targetId == 'takaragawa') {
        offset = 83;
      } else if (targetId == 'kyoto') {
        offset = 83;
      }

      if (targetElement) {
        const elementPosition = targetElement.offsetTop; // Posición del elemento desde el top de la página
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth', // Desplazamiento suave
        });
      }
    });
  });

  function animateTextVertical2(selector) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
      // Dividir el texto en caracteres individuales
      const splitText = new SplitText(element, { type: 'chars' });
      const chars = splitText.chars;

      // Configurar perspectiva para el elemento
      gsap.set(element, { perspective: 400 });

      // Crear ScrollTrigger con animaciones para entrada y salida
      ScrollTrigger.create({
        trigger: element,
        start: 'top 60%',
        end: 'bottom 10%',
        toggleActions: 'play none none reverse',
        onEnter: () => resetAndAnimate(chars),
        onLeaveBack: () => resetAndAnimate(chars),
      });

      // Agregar evento click al elemento
      element.addEventListener('click', () => {
        resetAndAnimate(chars); // Ejecutar la animación al hacer clic
      });
    });

    // Función para reiniciar y animar caracteres
    function resetAndAnimate(chars) {
      // Reiniciar el estado inicial de las letras
      gsap.set(chars, { opacity: 0, y: 50, rotationX: -90 });

      // Animar las letras desde el estado reiniciado
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.2, // Retraso progresivo entre letras
      });
    }
  }

  animateTextVertical2('.kanji');
  animateTextVertical2('.kanji-tokyo');
  animateTextVertical2('.kanji-kyoto');

  //Sello

  const sellos = [
    './imagenes/fotos/sellos/proyectoWeb-08.png',
    './imagenes/fotos/sellos/proyectoWeb-14.png',
    './imagenes/fotos/sellos/proyectoWeb-29.png',
    './imagenes/fotos/sellos/proyectoWeb-28.png',
  ];

  let selloIndex = 0;
  const zonaEstampado = document.getElementById('zona-estampado');

  // Crear un elemento que siga al cursor
  const cursorSello = document.createElement('img');
  cursorSello.src = sellos[selloIndex];
  cursorSello.className = 'cursor-sello';
  cursorSello.classList.add('no-display');
  document.body.appendChild(cursorSello);

  zonaEstampado.addEventListener('mouseenter', () => {
    cursorSello.classList.remove('no-display');
  });

  zonaEstampado.addEventListener('mouseleave', () => {
    cursorSello.classList.add('no-display');
  });

  // Mover el cursor personalizado con el ratón
  document.addEventListener('mousemove', (event) => {
    cursorSello.style.left = `${event.pageX}px`;
    cursorSello.style.top = `${event.pageY}px`;
  });

  // Estampar y cambiar al siguiente sello
  zonaEstampado.addEventListener('click', (event) => {
    const x = event.offsetX;
    const y = event.offsetY;

    // Crear la imagen del sello en la posición clicada
    const estampado = document.createElement('img');
    estampado.src = sellos[selloIndex];
    estampado.className = 'cursor-sello';
    estampado.style.position = 'absolute';
    estampado.style.left = `${x}px`;
    estampado.style.top = `${y}px`;
    const sizeRandom = Math.random() * (250 - 70) + 70;
    estampado.style.transform = `rotate(${Math.random() * 360}deg)`; // Rotación aleatoria
    estampado.style.width = `${sizeRandom}px`;
    estampado.style.height = `${sizeRandom}px`;
    zonaEstampado.appendChild(estampado);

    // Cambiar al siguiente sello
    selloIndex = (selloIndex + 1) % sellos.length; // Bucle entre 0, 1 y 2
    cursorSello.src = sellos[selloIndex];
  });
});
