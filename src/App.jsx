import React, { useState } from 'react';
import Dino from './components/Dino';
import Cactus from './components/Cactus';
import { useGame } from './GameContext';
import './App.css';
import Score from './components/Score';
import Background from './components/Background';

const App = () => {
  const { gameOver, resetGame, score, gameStarted, setGameStarted } = useGame();
  const dinoRef = React.useRef();
  const gameOverSoundRef = React.useRef(null);
  const prevGameOverRef = React.useRef(false);
  const achievementSoundRef = React.useRef(null);

  const [ milestoneMessage, setMilestoneMessage ] = useState('');
  const [ nextMilestone, setNextMilestone ] = useState(100);

  React.useEffect(() => {
    achievementSoundRef.current = new Audio('/achievement.mp3');
  });

  React.useEffect(() => {
    if (score >= nextMilestone) {
      setMilestoneMessage(`🎉 ${nextMilestone} Points!`);
      setNextMilestone((prev) => prev + 100);
      achievementSoundRef.current.currentTime = 0;
      achievementSoundRef.current.play().catch((e) => {
        console.warn('Jump sound failed:', e)
      });
      setTimeout(() => {
        setMilestoneMessage('');
      }, 1500);
    }
  },[score, nextMilestone]);


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
    // window.location.reload();
  };

  // Trigger jump by calling Dino's jump method
  const triggerJump = () => {
    if (dinoRef.current && typeof dinoRef.current.jump === 'function') {
      dinoRef.current.jump();
    }
  };

  return (
    <div className="app-wrapper">
      { !gameStarted && (
        <div className="start-screen">
          <div className="start-background" />
          <button className="start-button" onClick={() => setGameStarted(true)}>
            ▶ Play
          </button>
        </div>
      )}
      <div
        className="game-container"
        onTouchStart={triggerJump}
        onClick={triggerJump}
      >
        <Background />
        <Score />
        <Dino ref={dinoRef} />
        <Cactus />
        {milestoneMessage && (
          <div className="milestone-popup">{milestoneMessage}</div>
        )}
        {gameOver && (
          <div className="game-over-screen">
            <h1>Game Over</h1>
            <button onClick={handleRestart}>Restart</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
