/* ==========================================================================
   CONFIGURACIÓ I DADES DE LA CANÇÓ
   ========================================================================== */

// 1. LLETRA DE LA CANÇÓ AMB TIMESTAMPS (en segons)
const LYRICS = [
  { time: 0, text: "" },
  { time: 8.5, text: "Sota la teva gràcia" },
  { time: 13.0, text: "em sento en pau," },
  { time: 17.5, text: "com si el món sencer" },
  { time: 21.0, text: "s'aturés a la teva vora." },
  { time: 26.5, text: "Cada segon al teu costat" },
  { time: 31.0, text: "és un regal que no vull perdre." },
  { time: 36.5, text: "I si el temps ens ho permet," },
  { time: 41.0, text: "vull caminar sempre amb tu." }
];

// 2. MISSATGE FINAL I PREGUNTA
const FINAL_MESSAGE = "Andrea, gràcies per fer que cada moment al teu costat sigui especial i ple de llum.";
const FINAL_QUESTION = "Vols continuar escrivint aquesta història amb mi?";


/* ==========================================================================
   ELEMENTS DEL DOM
   ========================================================================== */
const app = document.getElementById("app");
const coverSection = document.getElementById("cover");
const experienceSection = document.getElementById("experience");
const finaleSection = document.getElementById("finale");

const photoBtn = document.getElementById("photo");
const mediaFrame = document.getElementById("mediaFrame");
const video = document.getElementById("video");
const audio = document.getElementById("audio");

const lyricsTrack = document.getElementById("lyricsTrack");
const lyricsWrap = document.getElementById("lyricsWrap");

const playPauseBtn = document.getElementById("playPauseBtn");
const iconPlay = playPauseBtn.querySelector(".icon--play");
const iconPause = playPauseBtn.querySelector(".icon--pause");

const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const progressSlider = document.getElementById("progress");

const muteBtn = document.getElementById("muteBtn");
const iconVol = muteBtn.querySelector(".icon--vol");
const iconMuted = muteBtn.querySelector(".icon--muted");
const volumeSlider = document.getElementById("volume");

const finalMessageEl = document.getElementById("finalMessage");
const finalQuestionEl = document.getElementById("finalQuestion");

let lyricsNodes = [];
let currentIndex = -1;


/* ==========================================================================
   INICIALITZACIÓ DE LA LLETRA
   ========================================================================== */
function renderLyrics() {
  lyricsTrack.innerHTML = "";
  lyricsNodes = [];

  LYRICS.forEach((line, index) => {
    const p = document.createElement("p");
    p.className = "lyrics__line";
    p.textContent = line.text;
    p.dataset.index = index;
    lyricsTrack.appendChild(p);
    lyricsNodes.push(p);
  });
}


/* ==========================================================================
   FLUX DE L'EXPERIÈNCIA (CANVI D'ESCENES)
   ========================================================================== */

// Iniciar experiència en fer clic a la portada
photoBtn.addEventListener("click", () => {
  // Mou el vídeo del marc de portada al marc principal de l'experiència
  mediaFrame.appendChild(video);

  // Canvia l'estat d'amplificació visual si cal
  video.classList.remove("photo__video");
  video.classList.add("photo__video--main");

  // Transició d'escenes
  coverSection.classList.add("scene--hidden");
  experienceSection.classList.remove("scene--hidden");
  experienceSection.removeAttribute("aria-hidden");

  // Activa el so del vídeo si estava en silenci i reprodueix l'àudio
  audio.play().catch((err) => console.log("Error en reproduir àudio:", err));
});


/* ==========================================================================
   SINCRONITZACIÓ DE LA LLETRA I REPRODUCCIÓ
   ========================================================================== */
audio.addEventListener("timeupdate", () => {
  const time = audio.currentTime;

  // Actualitza barra de progrés i temps
  if (audio.duration) {
    progressSlider.value = (time / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(time);
  }

  // Troba la línia activa actual
  let activeIndex = -1;
  for (let i = 0; i < LYRICS.length; i++) {
    if (time >= LYRICS[i].time) {
      activeIndex = i;
    } else {
      break;
    }
  }

  // Canvia la línia activa només quan hi ha un canvi d'índex
  if (activeIndex !== currentIndex) {
    currentIndex = activeIndex;

    lyricsNodes.forEach((node, i) => {
      node.classList.toggle("lyrics__line--active", i === currentIndex);
      node.classList.toggle("lyrics__line--past", i < currentIndex);
    });

    // Fa l'scroll suau cap a la línia activa
    if (currentIndex >= 0 && lyricsNodes[currentIndex]) {
      const activeNode = lyricsNodes[currentIndex];
      const offsetTop = activeNode.offsetTop;
      const containerHeight = lyricsWrap.clientHeight;
      const nodeHeight = activeNode.clientHeight;

      lyricsTrack.style.transform = `translateY(${
        containerHeight / 2 - offsetTop - nodeHeight / 2
      }px)`;
    }
  }
});

// Quan s'acaba la cançó -> Escena final
audio.addEventListener("ended", () => {
  experienceSection.classList.add("scene--hidden");
  finaleSection.classList.remove("scene--hidden");
  finaleSection.removeAttribute("aria-hidden");

  finalMessageEl.textContent = FINAL_MESSAGE;
  finalQuestionEl.textContent = FINAL_QUESTION;
});


/* ==========================================================================
   CONTROLS DE REPRODUCCIÓ I VOLUM
   ========================================================================== */

// Actualitza la durada total un cop carregat l'àudio
audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

// Play / Pausa
playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    video.play();
    iconPlay.hidden = true;
    iconPause.hidden = false;
  } else {
    audio.pause();
    video.pause();
    iconPlay.hidden = false;
    iconPause.hidden = true;
  }
});

// Control del slider de progrés
progressSlider.addEventListener("input", () => {
  if (audio.duration) {
    const seekTime = (progressSlider.value / 100) * audio.duration;
    audio.currentTime = seekTime;
  }
});

// Mute / Unmute
muteBtn.addEventListener("click", () => {
  audio.muted = !audio.muted;
  iconVol.hidden = audio.muted;
  iconMuted.hidden = !audio.muted;
});

// Slider de Volum
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
  audio.muted = volumeSlider.value == 0;
  iconVol.hidden = audio.muted;
  iconMuted.hidden = !audio.muted;
});


/* ==========================================================================
   FUNCIONS AUXILIARS
   ========================================================================== */
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// Inicialitza la lletra en carregar la pàgina
renderLyrics();
