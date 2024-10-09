import { useState, useEffect } from "react";

// Hook to manage game logic
export const useGameLogic = () => {
  const [totalMatches, setTotalMatches] = useState(25);
  const [playerMatches, setPlayerMatches] = useState(0);
  const [computerMatches, setComputerMatches] = useState(0);
  const [message, setMessage] = useState("Your turn! Pick 1, 2, or 3 matches.");
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  // Function to update the visual pile of matches (using emoji)
  const updatePile = (matches) => {
    return "🔥".repeat(matches);
  };

  // Function to check if the game is over
  const checkGameOver = () => {
    if (totalMatches === 0) {
      let resultMessage = `Game over! You have ${playerMatches} matches, computer has ${computerMatches}. `;
      if (playerMatches % 2 === 0 && computerMatches % 2 !== 0) {
        resultMessage += "You win!";
      } else {
        resultMessage += "Computer wins!";
      }
      setMessage(resultMessage);
      setGameOver(true);
      return true;
    }
    return false;
  };

  // Player move function
  const playerMove = (matchesTaken) => {
    if (matchesTaken > totalMatches) {
      setMessage("Not enough matches left!");
      return;
    }

    setTotalMatches(totalMatches - matchesTaken);
    setPlayerMatches(playerMatches + matchesTaken);
    setIsPlayerTurn(false);
  };

  // Computer move, randomly picks 1, 2, or 3 matches
  const computerMove = () => {
    const matchesTaken = getRandomMatches(totalMatches);
    setTotalMatches(totalMatches - matchesTaken);
    setComputerMatches(computerMatches + matchesTaken);
    setIsPlayerTurn(true);
  };

  // Function to choose random number between 3 matches
  const getRandomMatches = (matchesLeft) => {
    return Math.floor(Math.random() * Math.min(3, matchesLeft)) + 1;
  };

  // Restart game
  const restartGame = () => {
    setTotalMatches(25);
    setPlayerMatches(0);
    setComputerMatches(0);
    setMessage("Your turn! Pick 1, 2, or 3 matches.");
    setIsPlayerTurn(true);
    setGameOver(false);
  };

  // useEffect to trigger the computer's move after the player’s turn
  useEffect(() => {
    if (!isPlayerTurn && totalMatches > 0) {
      setTimeout(computerMove, 1000);
    }
  }, [isPlayerTurn]);

  // Check if the game is over after totalMatches changes
  useEffect(() => {
    if (totalMatches === 0) {
      checkGameOver();
    }
  }, [totalMatches]);

  return {
    totalMatches,
    playerMatches,
    computerMatches,
    message,
    isPlayerTurn,
    gameOver,
    updatePile,
    playerMove,
    restartGame,
  };
};
