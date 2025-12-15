// Get the base URL from Vite
const base = import.meta.env.BASE_URL;

export const sceneConfigs = {
  main: {
    sceneName: "main",
    mapFile: `${base}map.json`,
    mapSprite: "map",
    scale: 2,
    cameraOffset: -100,
    doorTransitions: {
      // Door transitions removed - single scene portfolio
    },
    spawnPoints: {
      // Default spawn points
    }
  }
};