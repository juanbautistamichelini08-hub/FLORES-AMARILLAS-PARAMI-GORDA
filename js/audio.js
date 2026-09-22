/**
 * AUDIO.JS - Controlador Inteligente de Audio
 * Soporta archivos MP3 en assets/audio/music.mp3 y cuenta con un
 * sintetizador ambiental romántico procedural (Web Audio API) como respaldo instantáneo.
 */

class RomanticAudioManager {
  constructor() {
    this.audioElement = document.getElementById('bg-audio');
    this.toggleButton = document.getElementById('audio-toggle');
    this.audioLabel = document.getElementById('audio-label');

    this.isPlaying = false;
    this.hasUserInteracted = false;
    this.useSynth = false;

    // Web Audio API para música procedural suave si no hay MP3
    this.audioCtx = null;
    this.synthInterval = null;
    this.ambientGain = null;

    this.init();
  }

  init() {
    // Comprobar si el archivo MP3 existe y es reproducible
    this.checkMp3Availability();

    // Event listener del botón
    if (this.toggleButton) {
      this.toggleButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.togglePlayback();
      });
    }

    // Desbloquear audio con la primera interacción del usuario en la página
    const unlockHandler = () => {
      if (!this.hasUserInteracted) {
        this.hasUserInteracted = true;
        this.start();
        document.removeEventListener('click', unlockHandler);
        document.removeEventListener('touchstart', unlockHandler);
      }
    };

    document.addEventListener('click', unlockHandler, { once: true });
    document.addEventListener('touchstart', unlockHandler, { once: true });
  }

  checkMp3Availability() {
    if (!this.audioElement) return;

    // Intentar verificar si el MP3 carga correctamente
    this.audioElement.volume = 0.55;

    this.audioElement.addEventListener('error', () => {
      // Si el MP3 no se encuentra o falla, activar el sintetizador procedural
      this.useSynth = true;
    });

    // Detectar si el archivo es válido
    this.audioElement.addEventListener('canplaythrough', () => {
      this.useSynth = false;
    });
  }

  start() {
    if (this.isPlaying) return;

    if (this.useSynth) {
      this.startProceduralSynth();
      this.updateUiState(true);
    } else if (this.audioElement) {
      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.updateUiState(true);
          })
          .catch(() => {
            // Si el MP3 falla por política o falta de archivo, activar sintetizador de respaldo
            this.useSynth = true;
            this.startProceduralSynth();
            this.updateUiState(true);
          });
      }
    }
  }

  pause() {
    if (!this.isPlaying) return;

    if (this.useSynth) {
      this.stopProceduralSynth();
    } else if (this.audioElement) {
      this.audioElement.pause();
    }
    this.updateUiState(false);
  }

  togglePlayback() {
    this.hasUserInteracted = true;
    if (this.isPlaying) {
      this.pause();
    } else {
      this.start();
    }
  }

  updateUiState(playing) {
    this.isPlaying = playing;
    if (this.toggleButton && this.audioLabel) {
      if (playing) {
        this.toggleButton.classList.add('playing');
        this.audioLabel.textContent = 'Música';
        this.toggleButton.setAttribute('title', 'Silenciar música');
      } else {
        this.toggleButton.classList.remove('playing');
        this.audioLabel.textContent = '🔇 Silenciar';
        this.toggleButton.setAttribute('title', 'Reanudar música');
      }
    }
  }

  // SINTETIZADOR AMBIENTAL PROCEDURAL (Piano / Campanas de ensueño)
  initSynth() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();

      // Master Gain
      this.ambientGain = this.audioCtx.createGain();
      this.ambientGain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);

      // Filtro pasa-bajos cálido para sonido sedoso y suave
      this.filter = this.audioCtx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(1200, this.audioCtx.currentTime);

      this.filter.connect(this.ambientGain);
      this.ambientGain.connect(this.audioCtx.destination);
    }

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playPianoNote(freq, duration = 3.5, delay = 0) {
    if (!this.audioCtx || this.audioCtx.state !== 'running') return;

    const startTime = this.audioCtx.currentTime + delay;
    const osc = this.audioCtx.createOscillator();
    const noteGain = this.audioCtx.createGain();

    // Timbre cálido mezcla de onda sinusoidal y armónicos sutiles
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    // Envolvente suave estilo piano/caja de música
    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.exponentialRampToValueAtTime(0.35, startTime + 0.08); // Ataque suave
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration); // Caída poética

    osc.connect(noteGain);
    noteGain.connect(this.filter);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
  }

  startProceduralSynth() {
    this.initSynth();

    // Escala pentatónica romántica (Re mayor / Si menor evocadora)
    const notes = [
      293.66, // D4
      329.63, // E4
      369.99, // F#4
      440.00, // A4
      493.88, // B4
      587.33, // D5
      659.25, // E5
      739.99  // F#5
    ];

    // Secuencia de arpegios que evocan calma y amor
    const chordProgressions = [
      [293.66, 369.99, 440.00, 587.33], // D maj
      [246.94, 293.66, 369.99, 440.00], // B min
      [196.00, 246.94, 293.66, 369.99], // G maj
      [220.00, 279.38, 329.63, 440.00]  // A sus
    ];

    let chordIndex = 0;
    let step = 0;

    const playStep = () => {
      if (!this.isPlaying || !this.useSynth) return;

      const currentChord = chordProgressions[chordIndex];
      const noteFreq = currentChord[step % currentChord.length];

      this.playPianoNote(noteFreq, 4.0);

      // Nota alta de campana ocasional
      if (step === 2 && Math.random() > 0.4) {
        this.playPianoNote(noteFreq * 2, 5.0, 0.4);
      }

      step++;
      if (step >= 4) {
        step = 0;
        chordIndex = (chordIndex + 1) % chordProgressions.length;
      }
    };

    playStep();
    this.synthInterval = setInterval(playStep, 1700);
  }

  stopProceduralSynth() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }
}

window.RomanticAudioManager = RomanticAudioManager;
