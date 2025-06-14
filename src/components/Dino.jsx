import React, { useEffect, useRef, useState } from 'react';
import { useGame } from '../GameContext';
import './Dino.css';

const Dino = () => {
  const dinoRef = useRef(null);
  const [isJumping, setIsJumping] = useState(false);
  const { setDinoRef, gameOver } = useGame();

  useEffect(() => {
    setDinoRef(dinoRef);
  }, [setDinoRef]);

  const triggerJump = () => {
    if (!isJumping && !gameOver) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 600);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && !isJumping && !gameOver) {
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 600);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isJumping, gameOver]);

  return (
    <div
      ref={dinoRef}
      className={`dino ${isJumping ? 'jump' : ''}`}
      onTouchStart={triggerJump}
      onClick={triggerJump}
    ></div>
  );
};

export default Dino;
