import PropTypes from "prop-types";
import { forwardRef, useContext, useEffect, useLayoutEffect, useRef } from "react";
import StartGame from "./main";
import { EventBus } from "./EventBus"; // Event bus for communication
import { PostContext } from "../context/PostContext";

export const PhaserGame = forwardRef(function PhaserGame({ currentActiveScene }, ref) {
    
  const game = useRef(); 
  const { playerHealth, setPlayerHealth } = useContext(PostContext);

  // Create the Phaser game using useLayoutEffect
  useLayoutEffect(() => {
    if (!game.current) {
      // Initialize Phaser game
      game.current = StartGame("game-container");

      if (ref !== null) {
        ref.current = { game: game.current, scene: null };
      }
    }

    return () => {
      if (game.current) {
        // Destroy Phaser game instance on cleanup
        game.current.destroy(true);
        game.current = undefined;
      }
    };
  }, [ref]);

  // Handle scene transitions and EventBus setup
  useEffect(() => {
    const handleSceneReady = (currentScene) => {
      if (currentActiveScene instanceof Function) {
        currentActiveScene(currentScene); // Pass the current active scene to parent
      }
      if (ref.current) {
        ref.current.scene = currentScene; // Update the scene reference
      }
    };

    EventBus.on("current-scene-ready", handleSceneReady);

    // Start the MainMenu scene with context
    if (game.current) {
      game.current.scene.start("Coin", { context: { playerHealth, setPlayerHealth } });
    }

    return () => {
      EventBus.off("current-scene-ready",playerHealth,setPlayerHealth, handleSceneReady); // Cleanup EventBus listener
    };
  }, [currentActiveScene,playerHealth, setPlayerHealth, ref]);

    // Update the active scene context when playerHealth changes
    useEffect(() => {
        if (game.current?.scene) {
          const activeScene = game.current.scene.getScene("Coin");
          if (activeScene && activeScene.updateContext) {
            activeScene.updateContext({ playerHealth }); // Call the scene's updateContext method
          }
        }
      }, [playerHealth, setPlayerHealth]); // Run this effect only when playerHealth changes

  return <div id="game-container"></div>; // The container for the Phaser game
});

// Prop validation
PhaserGame.propTypes = {
  currentActiveScene: PropTypes.func,
};
