import React from 'react';
import Dino from './components/Dino';
import Cactus from './components/Cactus';
import { useGame } from './GameContext';
import './App.css';
import Score from './components/Score';
import Background from './components/Background';

const App = () => {
  const { gameOver, resetGame } = useGame();
  const dinoRef = React.useRef();
  const gameOverSoundRef = React.useRef(null);
  const prevGameOverRef = React.useRef(false);


  React.useEffect(() => {
    gameOverSoundRef.current = new Audio('/gameover.mp3')
  },[]);
  React.useEffect(() => {
      if (!prevGameOverRef.current && gameOver) {
        // Game just ended
        gameOverSoundRef.current.currentTime = 0;
        gameOverSoundRef.current.play().catch((e) =>
          console.warn('Game over sound failed:', e)
        );
      }
      prevGameOverRef.current = gameOver;
    }, [gameOver]);


  const handleRestart = () => {
    resetGame();
    window.location.reload();
  };

  // Trigger jump by calling Dino's jump method
  const triggerJump = () => {
    if (dinoRef.current && typeof dinoRef.current.jump === 'function') {
      dinoRef.current.jump();
    }
  };

  return (
    <div
      className="game-container"
      onTouchStart={triggerJump}
      onClick={triggerJump}
    >
      <Background />
      <Score />
      <Dino ref={dinoRef} />
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
