import React from 'react';
import Dino from './components/Dino';
import Cactus from './components/Cactus';
import { useGame } from './GameContext';
import './App.css';
import Score from './components/Score';
import Background from './components/Background';

const App = () => {
  const { gameOver, resetGame } = useGame();

  const handleRestart = () => {
    resetGame(); // reset gameOver to false
    window.location.reload(); // easiest full reset for now
  };

  return (
    <div className="game-container">
      <Background />
      <Score />
      <Dino />
      <Cactus />

      {gameOver && (
        <div className="game-over-screen">
          <h1>Game Over</h1>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default App;
