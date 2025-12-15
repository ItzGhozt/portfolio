import { dialogueData, scaleFactor } from "./constants";
import { k } from "./kaboomCtx";
import { displayDialogue, setCamScale } from "./utils";
import { createMapScene } from "./scenes/mapScene";
import { sceneConfigs } from "./scenes/sceneConfig";

const base = '/'; 

// Load sprites from root
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
k.setBackground(k.Color.fromHex("#588157"));

// Create all scenes
Object.values(sceneConfigs).forEach(config => {
  createMapScene(config);
});

// Start game
k.go("main");