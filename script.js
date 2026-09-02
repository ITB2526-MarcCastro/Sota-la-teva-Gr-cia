/* ==========================================================================
   RESET I VARIABLES GENERALS
   ========================================================================== */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --bg-color: #d8c2b0;
  --text-primary: #8c6d58;
  --text-active: #ffffff;
  --accent-color: #a67c65;
  --frame-bg: #ffffff;
  --shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  --font-family: 'serif', system-ui, -apple-system, sans-serif;
}

body {
  background-color: var(--bg-color);
  color: var(--text-primary);
  font-family: var(--font-family);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
}

main {
  width: 100%;
  max-width: 1200px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 20px;
}

/* ==========================================================================
   ESCENES (TRANSICIONS)
   ========================================================================== */
.scene {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.8s ease, visibility 0.8s ease;
}

.scene--hidden {
  opacity: 0;
  visibility: hidden;
  position: absolute;
  pointer-events: none;
}

/* ==========================================================================
   PORTADA (ESCENA 1)
   ========================================================================== */
.scene--cover {
  flex-direction: column;
}

.cover__stage {
  text-align: center;
}

.photo {
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  position: relative;
  transition: transform 0.3s ease;
}

.photo:hover {
  transform: scale(1.02);
}

.photo__frame {
  display: inline-block;
  background: var(--frame-bg);
  padding: 16px 16px 60px 16px;
  box-shadow: var(--shadow);
  border-radius: 4px;
  position: relative;
}

.photo__video {
  width: 300px;
  height: 380px;
  object-fit: cover;
  object-position: 50% 10%;
  border-radius: 2px;
  display: block;
}

.photo__hint {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 1.1rem;
  color: var(--text-primary);
  font-style: italic;
  pointer-events: none;
}

.cover__whisper {
  margin-top: 15px;
  font-size: 0.9rem;
  opacity: 0.7;
  letter-spacing: 1px;
}

/* ==========================================================================
   EXPERIÈNCIA PRINCIPAL (ESCENA 2)
   ========================================================================== */
.scene--experience {
  flex-direction: column;
  width: 100%;
}

.experience__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  margin-bottom: 40px;
}

.experience__media {
  display: flex;
  justify-content: center;
}

.photo__frame--main {
  padding: 12px 12px 45px 12px;
}

.photo__video--main {
  width: 320px;
  height: 400px;
  object-fit: cover;
  object-position: 50% 10%;
}

/* ==========================================================================
   LLETRA AMB AMAGAT TOTAL PER DEFECTE
   ========================================================================== */
.experience__lyrics {
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.lyrics {
  width: 100%;
  text-align: center;
  position: relative;
}

.lyrics__track {
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

/* ❌ AMAGAT PER DEFECTE: La lletra no es veu fins que s'activa */
.lyrics__line {
  font-size: 1.4rem;
  line-height: 1.8;
  margin: 15px 0;
  color: var(--text-primary);
  opacity: 0; /* Totalment invisible */
  visibility: hidden;
  transform: translateY(15px);
  transition: opacity 0.6s ease, transform 0.6s ease, color 0.6s ease, visibility 0.6s ease;
}

/* ✅ LÍNIA ACTIVA: Apareix quan la cançó arriba al segon exacte */
.lyrics__line--active {
  opacity: 1;
  visibility: visible;
  color: var(--text-active);
  font-size: 1.6rem;
  font-weight: bold;
  transform: translateY(0);
}

/* 📜 LÍNIES PASSADES: Queden lleugerament en segon pla */
.lyrics__line--past {
  opacity: 0.35;
  visibility: visible;
  transform: translateY(-10px);
}

/* ==========================================================================
   CONTROLS D'ÀUDIO
   ========================================================================== */
.controls {
  display: flex;
  align-items: center;
  gap: 15px;
  background: rgba(255, 255, 255, 0.4);
  padding: 10px 24px;
  border-radius: 30px;
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.controls__play,
.controls__volume {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 22px;
  height: 22px;
  fill: currentColor;
}

.controls__time {
  font-size: 0.85rem;
  min-width: 35px;
}

.controls__progress,
.controls__volume-slider {
  accent-color: var(--accent-color);
  cursor: pointer;
}

.controls__progress {
  width: 200px;
}

.controls__volume-slider {
  width: 70px;
}

/* ==========================================================================
   PANTALLA FINAL (ESCENA 3)
   ========================================================================== */
.scene--finale {
  text-align: center;
  max-width: 600px;
}

.finale__content {
  background: rgba(255, 255, 255, 0.5);
  padding: 40px;
  border-radius: 12px;
  box-shadow: var(--shadow);
}

.finale__message {
  font-size: 1.3rem;
  line-height: 1.6;
  margin-bottom: 25px;
}

.finale__question {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--accent-color);
}

/* ==========================================================================
   RESPONSIVE (MÒBILS)
   ========================================================================== */
@media (max-width: 768px) {
  .experience__grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .photo__video--main {
    width: 240px;
    height: 300px;
  }

  .experience__lyrics {
    height: 250px;
  }

  .lyrics__line {
    font-size: 1.1rem;
  }

  .lyrics__line--active {
    font-size: 1.3rem;
  }

  .controls__progress {
    width: 100px;
  }
}
