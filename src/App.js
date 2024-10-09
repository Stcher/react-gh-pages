import React from "react";
import "./App.css";
import { useGameLogic } from "./js/gameLogic";

function App() {
  // Use the game logic hook
  const {
    totalMatches,
    message,
    isPlayerTurn,
    gameOver,
    updatePile,
    playerMove,
    restartGame,
  } = useGameLogic();

  return (
    <div className="App">
      <div className="pile">{updatePile(totalMatches)}</div>
      <div className="message">{message}</div>
      {gameOver ? (
        <div className="restart">
          <button onClick={restartGame}>Restart Game</button>
        </div>
      ) : (
        <div className="controls">
          <button onClick={() => playerMove(1)} disabled={!isPlayerTurn}>
            Take 1 match
          </button>
          <button onClick={() => playerMove(2)} disabled={!isPlayerTurn}>
            Take 2 matches
          </button>
          <button onClick={() => playerMove(3)} disabled={!isPlayerTurn}>
            Take 3 matches
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
