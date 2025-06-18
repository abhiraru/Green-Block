import React, { useEffect } from 'react';
import { useGame } from '../GameContext';

const Score = () => {
  const { score, setScore, gameOver } = useGame();

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setScore((prev) => prev + 1);
    }, 200); // Increase every 200ms

    return () => clearInterval(interval);
  }, [gameOver, setScore]);

  return (
    <div style={{
      position: 'absolute',
      top: 20,
      right: 20,
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'white',
    }}>
      Score: {score}
    </div>
  );
};

export default Score;
