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
   FLUX DE L'EXPERIÈNCIA (ENTRADA A LA PESTANYA 2)
   ========================================================================== */
photoBtn.addEventListener("click", () => {
  mediaFrame.appendChild(video);

  video.classList.remove("photo__video");
  video.classList.add("photo__video--main");

  coverSection.classList.add("scene--hidden");
  experienceSection.classList.remove("scene--hidden");
  experienceSection.removeAttribute("aria-hidden");

  // Força que el text comenci a dalt de tot
  currentIndex = -1;
  lyricsTrack.style.transform = "translateY(0px)";

  audio.play().catch((err) => console.log("Error en reproduir àudio:", err));
});


/* ==========================================================================
   SINCRONITZACIÓ DE LA LLETRA
   ========================================================================== */
audio.addEventListener("timeupdate", () => {
  const time = audio.currentTime;

  if (audio.duration) {
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

    // Mostrar les primeres línies a dalt de tot i anar pujant
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

  finalMessageEl.textContent = FINAL_MESSAGE;
  finalQuestionEl.textContent = FINAL_QUESTION;
});


/* ==========================================================================
   CONTROLS DE REPRODUCCIÓ
   ========================================================================== */
audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

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

progressSlider.addEventListener("input", () => {
  if (audio.duration) {
    const seekTime = (progressSlider.value / 100) * audio.duration;
    audio.currentTime = seekTime;
  }
});

muteBtn.addEventListener("click", () => {
  audio.muted = !audio.muted;
  iconVol.hidden = audio.muted;
  iconMuted.hidden = !audio.muted;
});

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
  audio.muted = volumeSlider.value == 0;
  iconVol.hidden = audio.muted;
  iconMuted.hidden = !audio.muted;
});

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

renderLyrics();
