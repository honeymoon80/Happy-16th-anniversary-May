/* =============================================
   CONFIG.JS — Matrix Romántica
   Basado en la galaxia de corazones
   ============================================= */
'use strict';

const CONFIG = {

  // ── COLORS (IGUAL que la galaxia) ─────────
  colores: ["#FFB6C1", "#FF6B81", "#FFD1DC", "#FFDAB9", "#FF85A2"],

  // ── MATRIX FALLING (frases y caracteres cayendo) ──
  matrixFalling: {
    frases: [
      "Te amo May 💗",
      "Eres mi luz ✨",
      "Siempre juntos 🌸",
      "Mi amor eterno ❤️",
      "Eres perfecta 💕",
      "Mi razón de ser 🌷",
      "Te quiero infinito 💫",
      "Eres mi todo 🌹",
      "Amor sin fin 💗",
      "Eres mi sueño ✨",
      "Contigo todo es mejor 🌸",
      "Te elijo siempre 💗",
      "Eres mi hogar 🏠",
      "Mi corazón es tuyo ❤️",
      "Gracias por existir 💕",
      "Eres mi felicidad 💗",
      "Siempre te amaré ✨",
      "Mi amor por ti es eterno 🌸",
    ],
    caracteres: "ABCDEFGHIJKLMNOPQRSTUVWXYZ012345678901010101010101💗✨🌸❤️💕🌷💫🌹",
    fallSpeed: 0.8,
    density: 0.9,
    fontSize: 14,
    fontSizeFrases: 18,
    fraseProbability: 0.15,
  },

  // ── TERMINAL IZQUIERDA ────────────────────
  terminal: {
    lines: [
      "> USER: May 💗",
      "> STATUS: Enamorado(a) ❤️",
      "> DATE: 15 de Junio, 2026",
      "> MESSAGE: Eres mi razón de ser...",
      "> SYSTEM: Conectado(a) 💕",
    ],
    typingSpeed: 80,
    lineDelay: 1000,
  },

  // ── FRASES CENTRALES ──────────────────────
  frasesCentrales: [
    "Desde que llegaste a mi vida, todo es más bonito 💗",
    "Cada día a tu lado es un regalo del universo ✨",
    "Eres mi persona favorita en este mundo 🌸",
    "Contigo aprendí que el amor sí existe ❤️",
    "Te amo más de lo que las palabras pueden expresar 💕",
    "Gracias por existir, May. Eres mi todo 💗",
  ],
  fraseTypingSpeed: 120,
  fraseDelay: 3000,

  // ── CELEBRACIÓN FINAL ──────────────────────
  final: {
    titulo: "🎉 ¡FELICES 16 MESES MAY! 🎉",
    subtitulo: "Gracias por cada sonrisa, cada abrazo y cada momento juntos 💗",
    foto: "aniversario16.webp",
    mensaje: "Eres el amor de mi vida. Te amo infinitamente.",
    confetiCount: 150,
  },

  // ── MÚSICA ────────────────────────────────
  canciones: [
    { nombre: "Nuestra Canción ❤️", archivo: "cancion1.mp3" },
    { nombre: "Para Siempre 💗", archivo: "cancion2.mp3" },
  ],

  // ── CLICK PARTICLES (IGUAL que la galaxia) ──
  emojisClick: ["💗", "✨", "🌸", "🌷", "💫", "❤️‍🔥", "💞", "🦋"],
  frasesClic: ["Te amo May", "Eres mi todo", "Siempre juntos", "Mi amor eterno"],
  mensajeFinPlaylist: "Gracias por escuchar 💗",

};
