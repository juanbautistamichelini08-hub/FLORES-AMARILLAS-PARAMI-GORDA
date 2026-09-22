/**
 * APP.JS - Orquestador Cinematográfico de la Experiencia
 * Maneja la narrativa, la sincronización de escenas y las interacciones.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar Motores
  const scene = new RomanticScene('scene-canvas');
  const audioManager = new RomanticAudioManager();

  // Elementos DOM
  const curtain = document.getElementById('cinematic-curtain');
  const scene1 = document.getElementById('scene-1');
  const scene2 = document.getElementById('scene-2');
  const btnSurprise = document.getElementById('btn-surprise');
  const btnReplay = document.getElementById('btn-replay');
  const mobileHint = document.getElementById('mobile-hint');

  const step1 = document.getElementById('step-1');
  const step2 = document.getElementById('step-2');
  const step3 = document.getElementById('step-3');

  let touchStartY = 0;
  let hasInteractedWithTouch = false;

  // 1. SECUENCIA INICIAL DE APARICIÓN CINEMATOGRÁFICA
  // 1. Pantalla oscura -> 2. Revelar cielo/océano -> 3. Tulipanes y partículas -> 4. Mensaje
  setTimeout(() => {
    if (curtain) curtain.classList.add('revealed');
  }, 300);

  setTimeout(() => {
    // Activar tarjeta de Escena 1
    if (scene1) scene1.classList.add('active');
  }, 1400);

  // 2. DISPARADOR DE LA SEGUNDA ESCENA (Botón "Tengo algo para vos")
  function goToScene2() {
    // Asegurar que la música comience
    audioManager.start();

    // Desvanecer Escena 1
    scene1.classList.remove('active');

    // Desencadenar la lluvia mágica de pétalos en el lienzo
    scene.triggerCelebration();

    setTimeout(() => {
      scene2.classList.add('active');
      playNarrativeSequence();
    }, 900);
  }

  // 3. SECUENCIA NARRATIVA POÉTICA (Escena 2)
  function playNarrativeSequence() {
    // Reset de pasos
    [step1, step2, step3].forEach(step => {
      if (step) {
        step.classList.remove('active', 'fade-out');
      }
    });

    // Paso 1: "No pude regalarte todo un campo de flores..."
    setTimeout(() => {
      step1.classList.add('active');
    }, 400);

    // Desvanecer Paso 1 y mostrar Paso 2
    setTimeout(() => {
      step1.classList.add('fade-out');
      step1.classList.remove('active');

      setTimeout(() => {
        // Paso 2: "...así que te hice uno."
        step2.classList.add('active');
      }, 500);
    }, 3800);

    // Desvanecer Paso 2 y mostrar Paso 3 (Clímax de amor)
    setTimeout(() => {
      step2.classList.add('fade-out');
      step2.classList.remove('active');

      setTimeout(() => {
        // Paso 3: "Felices flores amarillas, mi amor 💛"
        step3.classList.add('active');
        scene.triggerCelebration();
      }, 600);
    }, 7200);
  }

  // Evento del botón sorpresa
  if (btnSurprise) {
    btnSurprise.addEventListener('click', () => {
      goToScene2();
    });
  }

  // Botón para volver a contemplar
  if (btnReplay) {
    btnReplay.addEventListener('click', () => {
      scene2.classList.remove('active');
      setTimeout(() => {
        [step1, step2, step3].forEach(step => {
          if (step) step.classList.remove('active', 'fade-out');
        });
        scene1.classList.add('active');
      }, 800);
    });
  }

  // 4. SOPORTE GESTUAL EN MÓVILES ("Deslizá para continuar ↓")
  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diffY = touchStartY - touchEndY;

    // Si desliza hacia arriba o hacia abajo con cierta intención
    if (Math.abs(diffY) > 45) {
      if (!hasInteractedWithTouch) {
        hasInteractedWithTouch = true;
        if (mobileHint) {
          mobileHint.style.transition = 'opacity 0.6s ease';
          mobileHint.style.opacity = '0';
          setTimeout(() => { mobileHint.style.display = 'none'; }, 600);
        }
      }

      // Si está en la escena 1, avanzar suavemente
      if (scene1.classList.contains('active')) {
        goToScene2();
      }
    }
  }, { passive: true });

  // Ocultar hint en el primer click
  document.addEventListener('click', () => {
    if (mobileHint && !hasInteractedWithTouch) {
      hasInteractedWithTouch = true;
      mobileHint.style.opacity = '0';
      setTimeout(() => { mobileHint.style.display = 'none'; }, 600);
    }
  }, { once: true });
});
