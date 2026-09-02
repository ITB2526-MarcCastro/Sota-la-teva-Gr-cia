/* ============================================================================
   SCRIPT.JS
   Estructura del fitxer:
     1. CONFIGURACIÓ
     2. LLETRA DE LA CANÇÓ        <- amb els teus tempos de la captura
     3. MISSATGE FINAL            <- EDITA AQUÍ EL TEU MISSATGE I PREGUNTA
     4. REFERÈNCIES AL DOM
     5. ESTAT
     6. INICI DE L'EXPERIÈNCIA (clic a la fotografia)
     7. SINCRONITZACIÓ VÍDEO + ÀUDIO
     8. LLETRA SINCRONITZADA (requestAnimationFrame)
     9. CONTROLS PERSONALITZATS
    10. AUTO-AMAGAR CONTROLS
    11. FINAL DE LA CANÇÓ
    12. UTILITATS
   ============================================================================ */


/* ============================================================================
   1. CONFIGURACIÓ
   ============================================================================ */
const CONFIG = {
  coverTransitionMs: 900,
  finaleLeadSeconds: 0.4,
  controlsHideDelayMs: 2600,
};


/* ============================================================================
   2. LLETRA DE LA CANÇÓ
   ============================================================================ */
const lyrics = [
  // Captura 1 (0:22 - 0:41)
  { start: 22.0, end: 25.0, text: "Ens vam trobar per amics en comú i" },
  { start: 25.0, end: 28.0, text: "aquella nit vaig saber qui eres tu" },
  { start: 28.0, end: 31.0, text: "Parlant fluixet, tan a prop l'un de" },
  { start: 31.0, end: 34.0, text: "l'altre i sense adonar-me'n, en Cupit va" },
  { start: 34.0, end: 36.0, text: "flechar-me" },
  { start: 36.0, end: 38.0, text: "L'endemà a la fira et vaig tornar a" },
  { start: 38.0, end: 41.0, text: "trobar i entre mirades alguna cosa va" },
  { start: 41.0, end: 43.0, text: "començar" },

  // Captura 2 (0:43 - 1:01)
  { start: 43.0, end: 46.0, text: "Cap dels dos volia aquella nit acabar i" },
  { start: 46.0, end: 50.0, text: "tota la nit només et volia mirar" },
  { start: 50.0, end: 53.0, text: "I sense avís em vas fer canviar" },
  { start: 53.0, end: 55.0, text: "Em vas donar la pau que no sabia" },
  { start: 55.0, end: 57.0, text: "trobar" },
  { start: 57.0, end: 59.0, text: "A poc a poc ho vaig tenir més" },
  { start: 59.0, end: 61.0, text: "clar, que és amb tu amb qui em" },
  { start: 61.0, end: 63.0, text: "vull quedar" },

  // Captura 3 (1:03 - 1:25)
  { start: 63.0, end: 66.0, text: "No sabràs distingir entre petons i" },
  { start: 66.0, end: 69.0, text: "paraules si em deixes eternament" },
  { start: 69.0, end: 71.0, text: "estimar-te" },
  { start: 71.0, end: 75.0, text: "Em diràs que estic boig per esperar-te," },
  { start: 75.0, end: 78.0, text: "però deixa'm viure sota la teva gràcia" },
  { start: 78.0, end: 82.0, text: "Cada instant amb tu a la meva vida" },
  { start: 82.0, end: 85.0, text: "em fa canviar tota la melodia" },
  { start: 85.0, end: 87.0, text: "I si apostar per tu és perdre la" },

  // Captura 4 (1:27 - 1:57)
  { start: 87.0, end: 91.0, text: "partida, jo tornaria a jugar-la cada" },
  { start: 91.0, end: 96.0, text: "dia" },
  { start: 96.0, end: 105.0, text: "Els" },
  { start: 105.0, end: 109.0, text: "teus llavis tenen un gust diferent i els" },
  { start: 109.0, end: 112.0, text: "teus ulls brillen entre la gent" },
  { start: 112.0, end: 115.0, text: "En el teu somriure vaig trobar el meu" },
  { start: 115.0, end: 117.0, text: "fre, quan em mires el temps ja no" },
  { start: 117.0, end: 118.0, text: "val res" },

  // Captura 5 (1:58 - 2:25)
  { start: 118.0, end: 125.0, text: "Cada segon al teu costat vola massa pressa" },
  { start: 125.0, end: 130.0, text: "I la teva calma es va tornar promesa" },
  { start: 130.0, end: 133.0, text: "No sabràs distingir entre petons i" },
  { start: 133.0, end: 136.0, text: "paraules si em deixes eternament" },
  { start: 136.0, end: 138.0, text: "estimar-te" },
  { start: 138.0, end: 141.0, text: "Em diràs que estic boig per esperar-te," },
  { start: 141.0, end: 145.0, text: "però deixa'm viure sota la teva gràcia" },
  { start: 145.0, end: 148.0, text: "Cada instant amb tu a la meva vida" },

  // Captura 6 (2:28 - 2:56)
  { start: 148.0, end: 152.0, text: "em fa canviar tota la melodia" },
  { start: 152.0, end: 154.0, text: "I si apostar per tu és perdre la" },
  { start: 154.0, end: 162.0, text: "partida, jo tornaria a jugar-la cada dia" },
  { start: 162.0, end: 165.0, text: "A mi que sempre m'agradava accelerar, però" },
  { start: 165.0, end: 168.0, text: "tenir-te a prop m'ha fet frenar" },
  { start: 168.0, end: 171.0, text: "Ja no vull córrer si et puc esperar," },
  { start: 171.0, end: 176.0, text: "si el millor del camí és veure't passar" },
  { start: 176.0, end: 182.0, text: "I si em preguntes què vull recordar," },

  // Captura 7 (2:56 - 3:30)
  { start: 182.0, end: 188.0, text: "serà cada vegada que em vas fer volar" },
  { start: 188.0, end: 195.0, text: "No em penedeixo de res del passat," },
  { start: 195.0, end: 198.0, text: "repetiria cada pas" },
  { start: 198.0, end: 201.0, text: "errat" },
  { start: 201.0, end: 204.0, text: "Només per tenir-te avui al meu" },
  { start: 204.0, end: 210.0, text: "costat," },
  { start: 210.0, end: 220.0, text: "al teu costat" }
];


/* ============================================================================
   3. MISSATGE FINAL
   ========================================================================
   EDITA AQUÍ el text que vols que surti quan s'acabi la cançó.
   ======================================================================== */
const finalMessage = "Gràcies per cada moment al teu costat.";
const finalQuestion = "Vols continuar escrivint aquesta història amb mi?";


/* ============================================================================
   4. REFERÈNCIES AL DOM
   ============================================================================ */
const coverScene = document.getElementById('cover');
const experienceScene = document.getElementById('experience');
const finaleScene = document.getElementById('finale');

const photoBtn = document.getElementById('photo');
const video = document.getElementById('video');
const mediaFrame = document.getElementById('mediaFrame');

const audio = document.getElementById('audio');

const lyricsWrap = document.getElementById('lyricsWrap');
const lyricsTrack = document.getElementById('lyricsTrack');

const controls = document.getElementById('controls');
const playPauseBtn = document.getElementById('playPauseBtn');
const iconPlay = playPauseBtn.querySelector('.icon--play');
const iconPause = playPauseBtn.querySelector('.icon--pause');

const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

const muteBtn = document.getElementById('muteBtn');
const iconVol = muteBtn.querySelector('.icon--vol');
const iconMuted = muteBtn.querySelector('.icon--muted');
const volumeSlider = document.getElementById('volume');

const finalMessageEl = document.getElementById('finalMessage');
const finalQuestionEl = document.getElementById('finalQuestion');


/* ============================================================================
   5. ESTAT
   ============================================================================ */
let hasStarted = false;
let isSeekingByUser = false;
let lyricLineEls = [];
let currentLineIndex = -1;
let rafId = null;
let controlsHideTimer = null;
let finaleTriggered = false;


/* ============================================================================
   6. INICI DE L'EXPERIÈNCIA
   ============================================================================ */
function startExperience() {
  if (hasStarted) return;
  hasStarted = true;

  buildLyricsDOM();

  photoBtn.style.transform = 'scale(1.015)';

  audio.currentTime = 0;
  audio.play().catch(() => {
    audio.play();
  });

  mediaFrame.appendChild(video);
  video.classList.add('photo__video');

  coverScene.classList.add('is-leaving');

  window.setTimeout(() => {
    coverScene.setAttribute('aria-hidden', 'true');
    experienceScene.classList.add('is-active');
    experienceScene.removeAttribute('aria-hidden');
    showControls();
    scheduleControlsHide();
  }, CONFIG.coverTransitionMs * 0.55);

  startLyricsLoop();
}

photoBtn.addEventListener('click', startExperience);
photoBtn.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    startExperience();
  }
});


/* ============================================================================
   7. SINCRONITZACIÓ VÍDEO + ÀUDIO
   ============================================================================ */
audio.addEventListener('play', () => {
  if (video.paused) video.play().catch(() => {});
});

audio.addEventListener('pause', () => {
  if (!video.paused) video.pause();
});

audio.addEventListener('seeked', () => {
  if (audio.currentTime < 0.15) {
    video.currentTime = 0;
  }
});


/* ============================================================================
   8. LLETRA SINCRONITZADA
   ============================================================================ */
function buildLyricsDOM() {
  lyricsTrack.innerHTML = '';
  lyricLineEls = lyrics.map((line) => {
    const p = document.createElement('p');
    p.className = 'lyrics__line';
    p.textContent = line.text;
    lyricsTrack.appendChild(p);
    return p;
  });

  // Posicionem la pista a la PRIMERA línia abans que soni cap paraula.
  // Sense això, el navegador centra per defecte el bloc sencer de lletra
  // (CSS top:50%), i durant els primers segons es veuria una línia del
  // mig o del final de la cançó, revelant contingut que encara no toca.
  requestAnimationFrame(() => {
    const firstLine = lyricLineEls[0];
    if (firstLine) {
      const offset = firstLine.offsetTop + firstLine.offsetHeight / 2;
      lyricsTrack.style.transform = `translateY(calc(-1 * ${offset}px))`;
    }
  });
}

function updateLyrics() {
  const t = audio.currentTime;

  let activeIndex = -1;
  for (let i = 0; i < lyrics.length; i++) {
    if (t >= lyrics[i].start && t < lyrics[i].end) {
      activeIndex = i;
      break;
    }
  }

  if (activeIndex === -1) {
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (t >= lyrics[i].start) {
        activeIndex = -2;
        break;
      }
    }
  }

  if (activeIndex !== currentLineIndex && activeIndex !== -2) {
    currentLineIndex = activeIndex;
    renderCurrentLine();
  }
}

function renderCurrentLine() {
  lyricLineEls.forEach((el, i) => {
    el.classList.remove('is-current', 'is-past');
    if (i === currentLineIndex) {
      el.classList.add('is-current');
    } else if (i < currentLineIndex) {
      el.classList.add('is-past');
    }
  });

  if (currentLineIndex >= 0 && lyricLineEls[currentLineIndex]) {
    const lineEl = lyricLineEls[currentLineIndex];
    const offset = lineEl.offsetTop + lineEl.offsetHeight / 2;
    lyricsTrack.style.transform = `translateY(calc(-1 * ${offset}px))`;
  }
}

function lyricsAnimationLoop() {
  updateLyrics();
  checkFinale();
  rafId = requestAnimationFrame(lyricsAnimationLoop);
}

function startLyricsLoop() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(lyricsAnimationLoop);
}


/* ============================================================================
   9. CONTROLS PERSONALITZATS
   ============================================================================ */
audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  if (isSeekingByUser) return;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  }
});

playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

audio.addEventListener('play', () => {
  iconPlay.hidden = true;
  iconPause.hidden = false;
  playPauseBtn.setAttribute('aria-label', 'Pausa');
});

audio.addEventListener('pause', () => {
  iconPlay.hidden = false;
  iconPause.hidden = true;
  playPauseBtn.setAttribute('aria-label', 'Reproduir');
});

progress.addEventListener('input', () => {
  isSeekingByUser = true;
  const pct = Number(progress.value) / 100;
  if (audio.duration) {
    currentTimeEl.textContent = formatTime(pct * audio.duration);
  }
});

progress.addEventListener('change', () => {
  if (audio.duration) {
    audio.currentTime = (Number(progress.value) / 100) * audio.duration;
    video.currentTime = audio.currentTime % (video.duration || audio.currentTime || 1);
  }
  isSeekingByUser = false;
});

muteBtn.addEventListener('click', () => {
  audio.muted = !audio.muted;
  iconVol.hidden = audio.muted;
  iconMuted.hidden = !audio.muted;
  muteBtn.setAttribute('aria-label', audio.muted ? 'Activar so' : 'Silenciar');
});

volumeSlider.addEventListener('input', () => {
  audio.volume = Number(volumeSlider.value);
  if (audio.volume === 0) {
    audio.muted = true;
    iconVol.hidden = true;
    iconMuted.hidden = false;
  } else if (audio.muted) {
    audio.muted = false;
    iconVol.hidden = false;
    iconMuted.hidden = true;
  }
});


/* ============================================================================
   10. AUTO-AMAGAR CONTROLS
   ============================================================================ */
function showControls() {
  controls.classList.remove('is-hidden');
}

function scheduleControlsHide() {
  window.clearTimeout(controlsHideTimer);
  controlsHideTimer = window.setTimeout(() => {
    if (!audio.paused) {
      controls.classList.add('is-hidden');
    }
  }, CONFIG.controlsHideDelayMs);
}

function handleActivity() {
  if (!experienceScene.classList.contains('is-active')) return;
  showControls();
  scheduleControlsHide();
}

experienceScene.addEventListener('mousemove', handleActivity);
experienceScene.addEventListener('touchstart', handleActivity, { passive: true });
experienceScene.addEventListener('click', handleActivity);
controls.addEventListener('mouseenter', () => window.clearTimeout(controlsHideTimer));
controls.addEventListener('mouseleave', scheduleControlsHide);


/* ============================================================================
   11. FINAL DE LA CANÇÓ
   ============================================================================ */
function checkFinale() {
  if (finaleTriggered) return;
  if (!audio.duration) return;
  if (audio.currentTime >= audio.duration - CONFIG.finaleLeadSeconds) {
    finaleTriggered = true;
    runFinale();
  }
}

audio.addEventListener('ended', () => {
  if (!finaleTriggered) {
    finaleTriggered = true;
    runFinale();
  }
});

function runFinale() {
  finalMessageEl.textContent = finalMessage;
  finalQuestionEl.textContent = finalQuestion;

  lyricsWrap.style.transition = 'opacity 1200ms ease';
  lyricsWrap.style.opacity = '0';

  controls.classList.add('is-hidden');

  window.setTimeout(() => {
    experienceScene.style.transition = 'opacity 1200ms ease';
    experienceScene.style.opacity = '0';

    window.setTimeout(() => {
      experienceScene.classList.remove('is-active');
      experienceScene.setAttribute('aria-hidden', 'true');

      finaleScene.classList.add('is-active');
      finaleScene.removeAttribute('aria-hidden');

      window.setTimeout(() => {
        finalMessageEl.classList.add('is-visible');
      }, 300);

      window.setTimeout(() => {
        finalQuestionEl.classList.add('is-visible');
      }, 1800);

    }, 1200);
  }, 2600);
}


/* ============================================================================
   12. UTILITATS
   ============================================================================ */
function formatTime(seconds) {
  if (!isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}
