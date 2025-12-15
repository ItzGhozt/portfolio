import { k } from "../kaboomCtx";
import { dialogueData, scaleFactor } from "../constants";
import { displayDialogue, setCamScale } from "../utils";

export function createMapScene(config) {
  k.scene(config.sceneName, async (previousDoor) => {
    const mapData = await (await fetch(config.mapFile)).json();
    const layers = mapData.layers;
    
    // Use scene-specific scale or default to global scaleFactor
    const sceneScale = config.scale || scaleFactor;
    
    // Calculate player scale to maintain consistent visual size
    // If outdoor is scale 2 with player at 2*1.5=3, and indoor is scale 3,
    // then indoor player should be 2*1.5*(2/3) = 2
    const basePlayerScale = scaleFactor * 1.5;  // Your original player scale
    const playerScale = basePlayerScale * (scaleFactor / sceneScale);

    const map = k.add([
      k.sprite(config.mapSprite), 
      k.pos(0), 
      k.scale(sceneScale)  // Use dynamic scale
    ]);

    const player = k.make([
      k.sprite("player", { anim: "idle-down" }),
      k.area({
        shape: new k.Rect(k.vec2(0, 3), 10, 10),
      }),
      k.body(),
      k.anchor("center"),
      k.pos(),
      k.scale(playerScale),  // Adjusted scale to maintain visual consistency
      {
        speed: 150,
        direction: "down",
        isInDialogue: false,
      },
      "player",
    ]);

    for (const layer of layers) {
      if (layer.name === "boundaries") {
        for (const boundary of layer.objects) {
          const boundaryObj = [
            k.area({
              shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
            }),
            k.body({ isStatic: true }),
            k.pos(boundary.x, boundary.y),
            boundary.name,
          ];
          
          if (!dialogueData[boundary.name]) {
            boundaryObj.push("boundary");
          }
          
          map.add(boundaryObj);

          // Handle door transitions
          const doorTransition = config.doorTransitions?.[boundary.name];
          if (doorTransition) {
            player.onCollide(boundary.name, () => {
              k.go(doorTransition.scene, boundary.name);
            });
          }

          // Handle regular dialogue (non-doors)
          if (boundary.name && dialogueData[boundary.name] && !doorTransition) {
            player.onCollide(boundary.name, () => {
              player.isInDialogue = true;
              displayDialogue(
                dialogueData[boundary.name],
                () => (player.isInDialogue = false)
              );
            });
          }
        }
        continue;
      }

      if (layer.name === "Spawnpoint" || layer.name === "spawnpoint") {  // Check both cases
        let playerAdded = false;
        
        for (const entity of layer.objects) {
          // Check various spawn point names
          if (entity.name === "Spawn" || entity.name === "spawn" || entity.name === "player") {
            // Check if we came from a specific door
            if (previousDoor && config.spawnPoints?.[previousDoor]) {
              const spawn = config.spawnPoints[previousDoor];
              player.pos = k.vec2(spawn.x * sceneScale, spawn.y * sceneScale);
            } else {
              player.pos = k.vec2(
                (map.pos.x + entity.x) * sceneScale,
                (map.pos.y + entity.y) * sceneScale
              );
            }
            
            if (!playerAdded) {
              k.add(player);
              playerAdded = true;
            }
            break;
          }
        }
        
        // Fallback: if no spawn point found, add player at default position
        if (!playerAdded) {
          // Use spawn from config if coming through a door
          if (previousDoor && config.spawnPoints?.[previousDoor]) {
            const spawn = config.spawnPoints[previousDoor];
            player.pos = k.vec2(spawn.x * sceneScale, spawn.y * sceneScale);
          } else {
            player.pos = k.vec2(100 * sceneScale, 100 * sceneScale);
          }
          k.add(player);
        }
        continue;
      }
    }

    // Camera setup
    setCamScale(k);
    k.onResize(() => setCamScale(k));
    
    // Adjust camera offset based on scene
    const cameraOffset = config.cameraOffset || -100;
    k.onUpdate(() => k.camPos(player.worldPos().x, player.worldPos().y + cameraOffset));

    // Mouse controls
    k.onMouseDown((mouseBtn) => {
      if (mouseBtn !== "left" || player.isInDialogue) return;
      const worldMousePos = k.toWorld(k.mousePos());
      const mouseAngle = player.pos.angle(worldMousePos);
      const lowerBound = 50;
      const upperBound = 125;

      if (mouseAngle > lowerBound && mouseAngle < upperBound) {
        player.play("walk-up");
        player.direction = "up";
        return;
      }
      if (mouseAngle < -lowerBound && mouseAngle > -upperBound) {
        player.play("walk-down");
        player.direction = "down";
        return;
      }
      if (Math.abs(mouseAngle) > upperBound) {
        player.play("walk-right");
        player.direction = "right";
        return;
      }
      if (Math.abs(mouseAngle) < lowerBound) {
        player.play("walk-left");
        player.direction = "left";
        return;
      }
    });

    const stopAnims = () => {
      const idleAnims = {
        down: "idle-down",
        up: "idle-up",
        left: "idle-left",
        right: "idle-right"
      };
      player.play(idleAnims[player.direction]);
    };

    k.onMouseRelease(stopAnims);

    k.onKeyRelease(() => {
      const anyKeyPressed = 
        k.isKeyDown("right") || k.isKeyDown("d") ||
        k.isKeyDown("left") || k.isKeyDown("a") ||
        k.isKeyDown("up") || k.isKeyDown("w") ||
        k.isKeyDown("down") || k.isKeyDown("s");
      
      if (!anyKeyPressed) stopAnims();
    });

    k.onKeyDown(() => {
      if (player.isInDialogue) return;
      
      if (k.isKeyDown("right") || k.isKeyDown("d")) {
        if (player.curAnim() !== "walk-right") player.play("walk-right");
        player.direction = "right";
        player.move(player.speed, 0);
        return;
      }
      if (k.isKeyDown("left") || k.isKeyDown("a")) {
        if (player.curAnim() !== "walk-left") player.play("walk-left");
        player.direction = "left";
        player.move(-player.speed, 0);
        return;
      }
      if (k.isKeyDown("up") || k.isKeyDown("w")) {
        if (player.curAnim() !== "walk-up") player.play("walk-up");
        player.direction = "up";
        player.move(0, -player.speed);
        return;
      }
      if (k.isKeyDown("down") || k.isKeyDown("s")) {
        if (player.curAnim() !== "walk-down") player.play("walk-down");
        player.direction = "down";
        player.move(0, player.speed);
      }
    });
  });
}