import React, { useEffect } from 'react';
import { useGame } from '../GameContext';

const Score = () => {
  const { score, setScore, gameOver, gameStarted } = useGame();

//   useEffect(() => {
//     if (gameOver) return;
// console.log(gameStarted);

//     if(gameStarted){
//       const interval = setInterval(() => {
//         setScore((prev) => prev + 1);
//       }, 200); // Increase every 200ms
//     }

//     return () => clearInterval(interval);
//   }, [gameOver, setScore]);

useEffect(() => {
  if (gameOver) return;

  // console.log(gameStarted);
  let interval;

  if (gameStarted) {
    interval = setInterval(() => {
      setScore((prev) => prev + 1);
    }, 200); // Increase every 200ms
  }

  return () => clearInterval(interval);
}, [gameOver, gameStarted, setScore]); // include gameStarted in the dependency array

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
