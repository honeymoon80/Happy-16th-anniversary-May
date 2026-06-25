/* =============================================
   SCRIPT.JS — Matrix Romántica
   Basado en la galaxia de corazones
   ============================================= */
'use strict';

// ════════════════════════════════════════════
// DOM REFS
// ════════════════════════════════════════════
let matrixCanvas, matrixCtx;
let terminalText;
let fraseTexto;
let clickCanvas, clickCtx;
let finalModal, finalTitulo, finalSubtitulo, finalFoto, finalMensaje, finalFxCanvas, finalFxCtx;
let audio, playerToggle, playerPanel, playerDisc, playerSongName;
let playerPlay, playerPrev, playerNext, playerProgressFill, playerProgressThumb, playerProgressTrack;
let playerCurTime, playerTotalTime, playerVol;

let isPlaying = false;
let currentSongIdx = 0;
let playerMinimized = true;
let finalActive = false;

// ════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  resolveDomRefs();
  initMatrix();
  initTerminal();
  initFrases();
  initPlayer();
  initClickParticles();
  resizeAll();
  window.addEventListener('resize', resizeAll);
});

function resolveDomRefs() {
  matrixCanvas = document.getElementById('matrixCanvas');
  matrixCtx = matrixCanvas.getContext('2d');

  terminalText = document.getElementById('terminalText');

  fraseTexto = document.getElementById('fraseTexto');

  clickCanvas = document.getElementById('clickFxCanvas');
  clickCtx = clickCanvas.getContext('2d');

  finalModal = document.getElementById('finalModal');
  finalTitulo = document.getElementById('finalTitulo');
  finalSubtitulo = document.getElementById('finalSubtitulo');
  finalFoto = document.getElementById('finalFoto');
  finalMensaje = document.getElementById('finalMensaje');
  finalFxCanvas = document.getElementById('finalFxCanvas');
  finalFxCtx = finalFxCanvas ? finalFxCanvas.getContext('2d') : null;

  audio = document.getElementById('galaxyAudio');
  playerToggle = document.getElementById('playerToggle');
  playerPanel = document.getElementById('playerPanel');
  playerDisc = document.getElementById('playerDisc');
  playerSongName = document.getElementById('playerSongName');
  playerPlay = document.getElementById('playerPlay');
  playerPrev = document.getElementById('playerPrev');
  playerNext = document.getElementById('playerNext');
  playerProgressFill = document.getElementById('playerProgressFill');
  playerProgressThumb = document.getElementById('playerProgressThumb');
  playerProgressTrack = document.getElementById('playerProgressTrack');
  playerCurTime = document.getElementById('playerCurTime');
  playerTotalTime = document.getElementById('playerTotalTime');
  playerVol = document.getElementById('playerVol');
}

function resizeAll() {
  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;
  clickCanvas.width = window.innerWidth;
  clickCanvas.height = window.innerHeight;
  if (finalFxCanvas) {
    finalFxCanvas.width = window.innerWidth;
    finalFxCanvas.height = window.innerHeight;
  }
}

// ════════════════════════════════════════════
// 1. MATRIX FALLING (fondo con frases)
// ════════════════════════════════════════════
let matrixColumns = [];
let matrixRunning = false;

function initMatrix() {
  const cfg = CONFIG.matrixFalling;
  const cols = Math.floor(matrixCanvas.width / (cfg.fontSize + 4) * cfg.density);
  matrixColumns = [];

  for (let i = 0; i < cols; i++) {
    const isPhrase = Math.random() < cfg.fraseProbability;
    matrixColumns.push({
      x: Math.random() * matrixCanvas.width,
      y: Math.random() * matrixCanvas.height * -1,
      speed: cfg.fallSpeed + Math.random() * 0.8,
      chars: isPhrase ? getRandomFrase() : getRandomChars(),
      isPhrase: isPhrase,
      charIndex: 0,
      opacity: 0.1 + Math.random() * 0.5,
      size: isPhrase ? cfg.fontSizeFrases : cfg.fontSize,
      color: getRandomPastelColor(),
    });
  }

  matrixRunning = true;
  requestAnimationFrame(loopMatrix);
}

function getRandomFrase() {
  const frases = CONFIG.matrixFalling.frases;
  return frases[Math.floor(Math.random() * frases.length)];
}

function getRandomChars() {
  const chars = CONFIG.matrixFalling.caracteres;
  const len = 8 + Math.floor(Math.random() * 20);
  let result = '';
  for (let i = 0; i < len; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

function getRandomPastelColor() {
  const colors = CONFIG.colores;
  return colors[Math.floor(Math.random() * colors.length)];
}

function loopMatrix() {
  if (!matrixRunning) return;

  const cfg = CONFIG.matrixFalling;
  matrixCtx.fillStyle = 'rgba(26, 10, 26, 0.06)';
  matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

  matrixColumns.forEach(col => {
    col.y += col.speed;

    if (col.y > matrixCanvas.height + 50) {
      col.y = -50;
      col.isPhrase = Math.random() < cfg.fraseProbability;
      col.chars = col.isPhrase ? getRandomFrase() : getRandomChars();
      col.x = Math.random() * matrixCanvas.width;
      col.opacity = 0.1 + Math.random() * 0.5;
      col.color = getRandomPastelColor();
      col.size = col.isPhrase ? cfg.fontSizeFrases : cfg.fontSize;
    }

    matrixCtx.font = `${col.size}px 'Courier New', monospace`;
    matrixCtx.fillStyle = col.color;
    matrixCtx.globalAlpha = col.opacity;
    matrixCtx.textAlign = 'center';

    if (col.isPhrase) {
      matrixCtx.shadowColor = col.color;
      matrixCtx.shadowBlur = 8;
      matrixCtx.fillText(col.chars, col.x, col.y);
      matrixCtx.shadowBlur = 0;
    } else {
      const idx = Math.floor(col.y / col.size) % col.chars.length;
      matrixCtx.fillText(col.chars[idx] || '0', col.x, col.y);
    }
  });

  matrixCtx.globalAlpha = 1;

  requestAnimationFrame(loopMatrix);
}

// ════════════════════════════════════════════
// 2. TERMINAL IZQUIERDA
// ════════════════════════════════════════════
let terminalLines = [];
let terminalLineIndex = 0;
let terminalCharIndex = 0;
let terminalRunning = false;

function initTerminal() {
  terminalLines = CONFIG.terminal.lines;
  terminalLineIndex = 0;
  terminalCharIndex = 0;
  terminalRunning = true;
  loopTerminal();
}

function loopTerminal() {
  if (!terminalRunning) return;

  if (terminalLineIndex < terminalLines.length) {
    const line = terminalLines[terminalLineIndex];
    const currentText = line.substring(0, terminalCharIndex);

    const lines = terminalText.innerHTML.split('<br>');
    if (lines.length > terminalLineIndex) {
      lines[terminalLineIndex] = `<span class="line">${currentText}</span>`;
    } else {
      lines.push(`<span class="line">${currentText}</span>`);
    }
    terminalText.innerHTML = lines.join('<br>');

    terminalCharIndex++;

    if (terminalCharIndex > line.length) {
      terminalLineIndex++;
      terminalCharIndex = 0;
      setTimeout(() => loopTerminal(), CONFIG.terminal.lineDelay);
      return;
    }

    setTimeout(() => loopTerminal(), CONFIG.terminal.typingSpeed);
  } else {
    terminalRunning = false;
  }
}

// ════════════════════════════════════════════
// 3. FRASES CENTRALES
// ════════════════════════════════════════════
let fraseIndex = 0;
let fraseCharIndex = 0;
let frasesList = [];
let fraseRunning = false;

function initFrases() {
  frasesList = CONFIG.frasesCentrales;
  fraseIndex = 0;
  fraseCharIndex = 0;
  fraseRunning = true;
  loopFrases();
}

function loopFrases() {
  if (!fraseRunning) return;

  if (fraseIndex < frasesList.length) {
    const frase = frasesList[fraseIndex];
    const currentText = frase.substring(0, fraseCharIndex);

    fraseTexto.innerHTML = currentText + '<span class="cursor-blink"></span>';

    fraseCharIndex++;

    if (fraseCharIndex > frase.length) {
      fraseIndex++;
      fraseCharIndex = 0;
      setTimeout(() => {
        if (fraseIndex < frasesList.length) {
          loopFrases();
        } else {
          fraseRunning = false;
          mostrarFinal();
        }
      }, CONFIG.fraseDelay);
      return;
    }

    setTimeout(() => loopFrases(), CONFIG.fraseTypingSpeed);
  } else {
    fraseRunning = false;
  }
}

// ════════════════════════════════════════════
// 4. CELEBRACIÓN FINAL (IGUAL que la galaxia)
// ════════════════════════════════════════════
let finalConfeti = [];
let finalCorazones = [];
let finalFxRunning = false;

function mostrarFinal() {
  if (finalActive) return;
  finalActive = true;

  const cfg = CONFIG.final;

  finalTitulo.textContent = cfg.titulo;
  finalSubtitulo.textContent = cfg.subtitulo;
  finalFoto.src = `assets/img/${cfg.foto}`;
  finalMensaje.textContent = cfg.mensaje;

  finalModal.classList.remove('hidden');

  iniciarConfeti(cfg.confetiCount);
  iniciarCorazones();
  iniciarFinalFx();
}

function iniciarConfeti(count) {
  const colors = CONFIG.colores;
  finalConfeti = [];

  for (let i = 0; i < count; i++) {
    finalConfeti.push({
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * 100,
      w: 6 + Math.random() * 8,
      h: 4 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: 1 + Math.random() * 3,
      drift: (Math.random() - 0.5) * 1.5,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
    });
  }

  if (!finalFxRunning) {
    finalFxRunning = true;
    loopFinalFx();
  }
}

function loopFinalFx() {
  const ctx = finalFxCtx;
  if (!ctx) return;

  ctx.clearRect(0, 0, finalFxCanvas.width, finalFxCanvas.height);

  finalConfeti.forEach(c => {
    c.y += c.speed;
    c.x += c.drift + Math.sin(c.y / 50) * 0.5;
    c.rotation += c.rotSpeed;

    if (c.y > finalFxCanvas.height + 20) {
      c.y = -20;
      c.x = Math.random() * finalFxCanvas.width;
    }

    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate((c.rotation * Math.PI) / 180);
    ctx.fillStyle = c.color;
    ctx.globalAlpha = 0.8;
    ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
    ctx.restore();
  });

  finalCorazones.forEach(c => {
    c.y -= c.speed;
    c.x += Math.sin(c.y / 30) * 0.3;
    if (c.y < -20) {
      c.y = finalFxCanvas.height + 20;
      c.x = Math.random() * finalFxCanvas.width;
    }
    ctx.font = `${c.size}px sans-serif`;
    ctx.globalAlpha = c.opacity;
    ctx.textAlign = 'center';
    ctx.fillText('💗', c.x, c.y);
  });

  ctx.globalAlpha = 1;

  if (!finalModal.classList.contains('hidden')) {
    requestAnimationFrame(loopFinalFx);
  } else {
    finalFxRunning = false;
  }
}

function iniciarCorazones() {
  finalCorazones = [];
  for (let i = 0; i < 25; i++) {
    finalCorazones.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: 16 + Math.random() * 24,
      speed: 0.3 + Math.random() * 0.5,
      opacity: 0.1 + Math.random() * 0.3,
    });
  }
}

function iniciarFinalFx() {
  if (!finalFxCtx) return;
  finalFxCanvas.width = window.innerWidth;
  finalFxCanvas.height = window.innerHeight;
  finalFxRunning = true;
}

// ════════════════════════════════════════════
// 5. REPRODUCTOR DE MÚSICA (IGUAL que la galaxia)
// ════════════════════════════════════════════
function initPlayer() {
  if (!CONFIG.canciones.length) return;

  playerToggle.addEventListener('click', togglePlayerPanel);
  playerPlay.addEventListener('click', togglePlay);
  playerPrev.addEventListener('click', () => changeSong(-1));
  playerNext.addEventListener('click', () => changeSong(1));

  playerVol.addEventListener('input', (e) => {
    audio.volume = e.target.value;
    const pct = e.target.value * 100;
    e.target.style.background =
      `linear-gradient(90deg,#FF6B81 ${pct}%,rgba(255,182,193,0.2) ${pct}%)`;
  });

  playerProgressTrack.addEventListener('click', (e) => {
    if (!audio.duration) return;
    const r = playerProgressTrack.getBoundingClientRect();
    audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration;
  });

  audio.addEventListener('timeupdate', updatePlayerProgress);
  audio.addEventListener('play', () => {
    isPlaying = true;
    playerPlay.textContent = '⏸';
    playerDisc.classList.add('playing');
  });
  audio.addEventListener('pause', () => {
    isPlaying = false;
    playerPlay.textContent = '▶';
    playerDisc.classList.remove('playing');
  });
  audio.addEventListener('ended', () => {
    if (currentSongIdx >= CONFIG.canciones.length - 1) {
      changeSong(0);
    } else {
      changeSong(1);
    }
  });

  loadSong(0, false);
  setTimeout(() => audio.play().catch(() => {}), 500);
}

function loadSong(idx, autoplay) {
  currentSongIdx = ((idx % CONFIG.canciones.length) + CONFIG.canciones.length) % CONFIG.canciones.length;
  const song = CONFIG.canciones[currentSongIdx];
  audio.src = `assets/music/${song.archivo}`;
  playerSongName.textContent = song.nombre;
  if (autoplay) audio.play().catch(() => {});
}

function togglePlay() {
  if (isPlaying) audio.pause();
  else audio.play().catch(() => {});
}

function changeSong(dir) {
  loadSong(currentSongIdx + dir, true);
}

function togglePlayerPanel() {
  playerMinimized = !playerMinimized;
  playerPanel.classList.toggle('minimized', playerMinimized);
}

function updatePlayerProgress() {
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  playerProgressFill.style.width = pct + '%';
  playerProgressThumb.style.left = pct + '%';
  playerCurTime.textContent = fmtTime(audio.currentTime);
  playerTotalTime.textContent = fmtTime(audio.duration);
}

function fmtTime(s) {
  if (isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const ss = Math.floor(s % 60);
  return m + ':' + (ss < 10 ? '0' : '') + ss;
}

// ════════════════════════════════════════════
// 6. CLICK PARTICLES (COPIADO EXACTO DE LA GALAXIA)
// ════════════════════════════════════════════
let clickParticles = [];
let clickFxLoopRunning = false;
const MAX_CLICK_PARTICLES = 500;

function initClickParticles() {
  document.addEventListener('click', (e) => {
    if (finalActive) return;
    if (e.target.closest('#playerWrap, #playerPanel, #playerToggle')) return;
    spawnClickParticles(e.clientX, e.clientY, 32);
  });
  document.addEventListener('touchstart', (e) => {
    if (finalActive) return;
    if (e.target.closest('#playerWrap, #playerPanel, #playerToggle')) return;
    const t = e.touches[0];
    spawnClickParticles(t.clientX, t.clientY, 32);
  }, { passive: true });
}

function spawnClickParticles(x, y, count) {
  const safeCount = Math.min(count, 15);
  const emojis = CONFIG.emojisClick;
  const frases = CONFIG.frasesClic;

  for (let i = 0; i < safeCount; i++) {
    if (clickParticles.length >= MAX_CLICK_PARTICLES) break;

    const useEmoji = Math.random() > 0.4;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3.4 + 1.4;

    clickParticles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1.5,
      gravity: 0.05,
      life: 1,
      decay: 0.022,
      size: useEmoji ? (Math.random() * 14 + 16) : (Math.random() * 5 + 11),
      text: useEmoji
        ? emojis[Math.floor(Math.random() * emojis.length)]
        : frases[Math.floor(Math.random() * frases.length)],
      isEmoji: useEmoji,
      color: CONFIG.colores[Math.floor(Math.random() * CONFIG.colores.length)],
    });
  }

  if (!clickFxLoopRunning) {
    clickFxLoopRunning = true;
    requestAnimationFrame(loopClickParticles);
  }
}

function loopClickParticles() {
  clickCtx.clearRect(0, 0, clickCanvas.width, clickCanvas.height);
  clickCtx.textAlign = 'center';
  clickCtx.textBaseline = 'middle';

  for (let i = clickParticles.length - 1; i >= 0; i--) {
    const p = clickParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.life -= p.decay;

    if (p.life <= 0) {
      clickParticles.splice(i, 1);
      continue;
    }

    clickCtx.globalAlpha = Math.max(0, p.life);
    clickCtx.font = p.isEmoji
      ? `${p.size}px sans-serif`
      : `600 ${p.size}px 'Courier New', monospace`;
    clickCtx.fillStyle = p.color;
    clickCtx.shadowColor = p.color;
    clickCtx.shadowBlur = 10;
    clickCtx.fillText(p.text, p.x, p.y);
  }

  clickCtx.globalAlpha = 1;
  clickCtx.shadowBlur = 0;

  if (clickParticles.length > 0) {
    requestAnimationFrame(loopClickParticles);
  } else {
    clickFxLoopRunning = false;
  }
  }
