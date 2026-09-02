/* ==========================================================================
   CONFIGURACIÓ DE LA LLETRA I MISSATGES
   ========================================================================== */
const LYRICS = [
  { time: 0, text: "Els teus llavis tenen un gust diferent..." },
  { time: 5.0, text: "i els teus ulls brillen entre la gent..." },
  { time: 10.0, text: "En el teu somriure vaig trobar el meu..." },
  { time: 15.0, text: "Sota la teva gràcia em sento en pau..." },
  { time: 20.0, text: "com si el món sencer s'aturés a la teva vora..." }
];

const FINAL_MESSAGE = "Andrea, gràcies per fer que cada moment al teu costat sigui especial i ple de llum.";
const FINAL_QUESTION = "Vols continuar escrivint aquesta història amb mi?";

/* ==========================================================================
   ELEMENTS
   ========================================================================== */
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
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const progressSlider = document.getElementById("progress");

let lyricsNodes = [];
let currentIndex = -1;

/* ==========================================================================
   GENERAR LLETRA
   ========================================================================== */
function renderLyrics() {
  if (!lyricsTrack) return;
  lyricsTrack.innerHTML = "";
  lyricsNodes = [];

  LYRICS.forEach((line, index) => {
    const p = document.createElement("p");
    p.className = "lyrics__line";
    p.textContent = line.text;
    lyricsTrack.appendChild(p);
    lyricsNodes.push(p);
  });
}

/* ==========================================================================
   CLIC PER CANVIAR DE PESTANYA
   ========================================================================== */
photoBtn.addEventListener("click", () => {
  // 1. Mostrar la segona escena
  coverSection.classList.add("scene--hidden");
  experienceSection.classList.remove("scene--hidden");

  // 2. Moure el vídeo
  if (mediaFrame && video) {
    mediaFrame.appendChild(video);
  }

  // 3. Reproduir so i vídeo
  if (audio) {
    audio.play();
  }
  if (video) {
    video.play();
  }
});

/* ==========================================================================
   SINCRONITZACIÓ DE LA LLETRA
   ========================================================================== */
if (audio) {
  audio.addEventListener("timeupdate", () => {
    const time = audio.currentTime;

    if (audio.duration && progressSlider && currentTimeEl) {
      progressSlider.value = (time / audio.duration) * 100;
      currentTimeEl.textContent = formatTime(time);
    }

    let activeIndex = -1;
    for (let i = 0; i < LYRICS.length; i++) {
      if (time >= LYRICS[i].time) {
        activeIndex = i;
      } else {
        break;
      }
    }

    if (activeIndex !== currentIndex) {
      currentIndex = activeIndex;

      lyricsNodes.forEach((node, i) => {
        node.classList.toggle("lyrics__line--active", i === currentIndex);
        node.classList.toggle("lyrics__line--past", i < currentIndex);
      });

      if (currentIndex >= 0 && lyricsNodes[currentIndex]) {
        const activeNode = lyricsNodes[currentIndex];
        const offsetTop = activeNode.offsetTop;
        lyricsTrack.style.transform = `translateY(-${offsetTop - 40}px)`;
      }
    }
  });

  audio.addEventListener("loadedmetadata", () => {
    if (durationEl) durationEl.textContent = formatTime(audio.duration);
  });
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

renderLyrics();
