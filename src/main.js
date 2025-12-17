import { dialogueData, scaleFactor } from "./constants";
import { k } from "./kaboomCtx";
import { displayDialogue, setCamScale } from "./utils";
import { createMapScene } from "./scenes/mapScene";
import { sceneConfigs } from "./scenes/sceneConfig";

// Load sprites
k.loadSprite("player", "/REAL.png", {
  sliceX: 16,
  sliceY: 1,
  anims: {
    "idle-down": 0,
    "walk-down": { from: 0, to: 3, loop: true, speed: 3 },
    "idle-up": 4,
    "walk-up": { from: 4, to: 7, loop: true, speed: 3 },
    "idle-left": 8,
    "walk-left": { from: 8, to: 11, loop: true, speed: 3 },
    "idle-right": 12,
    "walk-right": { from: 12, to: 15, loop: true, speed: 3 },
  },
});

k.loadSprite("map", "/map.png");

// Load background music
k.loadSound("bgMusic", "/her.mp3");

k.setBackground(k.Color.fromHex("#588157"));

// Create all scenes
Object.values(sceneConfigs).forEach(config => {
  createMapScene(config);
});

// Start game
k.go("main");

// Get UI elements
const musicToggle = document.getElementById("music-toggle");
const volumeSlider = document.getElementById("volume-slider");

// Start music immediately
const music = k.play("bgMusic", {
  volume: 0.3,
  loop: true,
});

let isMusicPlaying = true;

// Music toggle functionality
musicToggle.addEventListener("click", () => {
  console.log("Button clicked! Current state:", isMusicPlaying); // Debug log
  
  if (isMusicPlaying) {
    // Music is playing, so pause it
    music.paused = true;
    musicToggle.textContent = "🔊 Play Music";
    isMusicPlaying = false;
    console.log("Music paused");
  } else {
    // Music is paused, so play it
    music.paused = false;
    musicToggle.textContent = "🔇 Stop Music";
    isMusicPlaying = true;
    console.log("Music playing");
  }
});

// Volume control
volumeSlider.addEventListener("input", (e) => {
  const volume = e.target.value / 100;
  music.volume = volume;
  console.log("Volume changed to:", volume);
});