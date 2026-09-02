/* ==========================================================================
   CONFIGURACIÓ I DADES DE LA CANÇÓ
   ========================================================================== */

const LYRICS = [
  { time: 0, text: "Els teus llavis tenen un gust diferent i els" },
  { time: 5.0, text: "teus ulls brillen entre la gent" },
  { time: 10.0, text: "En el teu somriure vaig trobar el meu" },
  { time: 15.0, text: "Sota la teva gràcia em sento en pau" },
  { time: 20.0, text: "com si el món sencer s'aturés a la teva vora" },
  { time: 25.0, text: "Cada segon al teu costat és un regal" }
];

const FINAL_MESSAGE = "Andrea, gràcies per fer que cada moment al teu costat sigui especial i ple de llum.";
const FINAL_QUESTION = "Vols continuar escrivint aquesta història amb mi?";


/* ==========================================================================
   ELEMENTS DEL DOM
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
   FLUX DE L'EXPERIÈNCIA (CANVI DE PESTANYA A L'ACCIÓ DEL CLIC)
   ========================================================================== */
photoBtn.addEventListener("click", () => {
  // 1. Canvi visibilitat d'escenes immediat
  coverSection.classList.add("scene--hidden");
  experienceSection.classList.remove("scene--hidden");
  experienceSection.removeAttribute("aria-hidden");

  // 2. Moure el vídeo si existeix
  if (mediaFrame && video) {
    mediaFrame.appendChild(video);
    video.classList.remove("photo__video");
    video.classList.add("photo__video--main");
  }

  // 3. Forçar la lletra a dalt de tot des del principi
  currentIndex = -1;
  if (lyricsTrack) {
    lyricsTrack.style.transform = "translateY(0px)";
  }

  // 4. Intentar iniciar l'àudio de manera segura
  if (audio) {
    audio.play().then(() => {
      if (iconPlay && iconPause) {
        iconPlay.hidden = true;
        iconPause.hidden = false;
      }
    }).catch((err) => {
      console.log("El navegador ha demanat interacció manual per a l'àudio:", err);
    });
  }
});


/* ==========================================================================
   SINCRONITZACIÓ DE LA LLETRA I SCROLL
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

      // Mantenir a dalt les primeres línies i anar desplaçant progressivament
      if (currentIndex <= 1) {
        lyricsTrack.style.transform = "translateY(0px)";
      } else if (currentIndex > 1 && lyricsNodes[currentIndex]) {
        const activeNode = lyricsNodes[currentIndex];
        const offsetTop = activeNode.offsetTop;
        lyricsTrack.style.transform = `translateY(-${offsetTop - 30}px)`;
      }
    }
  });

  audio.addEventListener("ended", () => {
    experienceSection.classList.add("scene--hidden");
    finaleSection.classList.remove("scene--hidden");
    finaleSection.removeAttribute("aria-hidden");

    if (finalMessageEl) finalMessageEl.textContent = FINAL_MESSAGE;
    if (finalQuestionEl) finalQuestionEl.textContent = FINAL_QUESTION;
  });

  audio.addEventListener("loadedmetadata", () => {
    if (durationEl) durationEl.textContent = formatTime(audio.duration);
  });
}


/* ==========================================================================
   CONTROLS DE REPRODUCCIÓ
   ========================================================================== */
if (playPauseBtn) {
  playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      if (video) video.play();
      iconPlay.hidden = true;
      iconPause.hidden = false;
    } else {
      audio.pause();
      if (video) video.pause();
      iconPlay.hidden = false;
      iconPause.hidden = true;
    }
  });
}

if (progressSlider) {
  progressSlider.addEventListener("input", () => {
    if (audio && audio.duration) {
      const seekTime = (progressSlider.value / 100) * audio.duration;
      audio.currentTime = seekTime;
    }
  });
}

if (muteBtn) {
  muteBtn.addEventListener("click", () => {
    if (audio) {
      audio.muted = !audio.muted;
      iconVol.hidden = audio.muted;
      iconMuted.hidden = !audio.muted;
    }
  });
}

if (volumeSlider) {
  volumeSlider.addEventListener("input", () => {
    if (audio) {
      audio.volume = volumeSlider.value;
      audio.muted = volumeSlider.value == 0;
      iconVol.hidden = audio.muted;
      iconMuted.hidden = !audio.muted;
    }
  });
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

renderLyrics();
