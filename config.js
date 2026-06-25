/* =============================================
   CONFIG.JS — Matrix Romántica
   TODA la personalización está aquí
   ============================================= */
'use strict';

const CONFIG = {

  // ── COLORS (igual que la galaxia) ─────────
  colores: ["#FFB6C1", "#FF6B81", "#FFD1DC", "#FFDAB9", "#FF85A2"],

  // ── MATRIX FALLING (frases y caracteres cayendo) ──
  matrixFalling: {
    // FRASES ROMÁNTICAS que caerán en el fondo
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
    ],
    // Caracteres adicionales que caerán
    caracteres: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789💗✨🌸❤️💕🌷💫🌹",
    fallSpeed: 0.8,          // Velocidad de caída
    density: 0.5,            // Cantidad de elementos (0-1)
    fontSize: 14,            // Tamaño de caracteres
    fontSizeFrases: 18,      // Tamaño de frases
    fraseProbability: 0.25,  // 25% de que caiga una frase
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
    typingSpeed: 80,          // ms por letra
    lineDelay: 1000,          // ms entre líneas
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
  fraseTypingSpeed: 60,      // ms por letra
  fraseDelay: 2500,          // ms entre frases

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

  // ── CLICK PARTICLES (igual que la galaxia) ──
  emojisClick: ["💗", "✨", "🌸", "🌷", "💫", "❤️‍🔥", "💞", "🦋"],
  frasesClic: ["Te amo May", "Eres mi todo", "Siempre juntos", "Mi amor eterno"],
  mensajeFinPlaylist: "Gracias por escuchar 💗",

};
