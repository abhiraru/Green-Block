import React, { useEffect, useRef, useState } from 'react';
import { useGame } from '../GameContext';
import './Cactus.css';

const Cactus = () => {
  const { dinoRef, setGameOver, gameOver } = useGame();
  const [cactuses, setCactuses] = useState([]);
  const speedRef = useRef(5);
  const spawnTimer = useRef(null);
  const moveTimer = useRef(null);

  // Spawn a new cactus
  const spawnCactus = () => {
    const id = Date.now();
    setCactuses((prev) => [...prev, { id, left: 1000 }]);
  };

  // Move all cactuses
  useEffect(() => {
    if (gameOver) return;

    moveTimer.current = setInterval(() => {
      setCactuses((prev) =>
        prev
          .map((c) => ({ ...c, left: c.left - speedRef.current }))
          .filter((c) => c.left > -60)
      );
    }, 30);

    return () => clearInterval(moveTimer.current);
  }, [gameOver]);

  // Spawn new cactus periodically
  useEffect(() => {
    if (gameOver) return;

    spawnTimer.current = setInterval(() => {
      spawnCactus();
    }, 1500);

    return () => clearInterval(spawnTimer.current);
  }, [gameOver]);

  
  useEffect(() => {
    if (gameOver) return;

    const speedUp = setInterval(() => {
      speedRef.current += 0.2;
    }, 3000); // Increase every 3 seconds

    return () => clearInterval(speedUp);
  }, [gameOver]);

  // Collision detection
  useEffect(() => {
    const checkCollision = () => {
      if (!dinoRef.current) return;

      const dino = dinoRef.current.getBoundingClientRect();

      for (let cactus of cactuses) {
        const cactusElement = document.querySelector(`.cactus[data-id="${cactus.id}"]`);
        if (!cactusElement) continue;

        const cactusBox = cactusElement.getBoundingClientRect();


        if (
          dino.left < cactusBox.right &&
          dino.right > cactusBox.left &&
          dino.top < cactusBox.bottom &&
          dino.bottom > cactusBox.top
        ) {
          setGameOver(true);
        }
      }
    };

    const collisionInterval = setInterval(checkCollision, 20);
    return () => clearInterval(collisionInterval);
  }, [cactuses, dinoRef, setGameOver]);

  return (
    <>
      {cactuses.map((cactus) => (
        <div
          key={cactus.id}
          className="cactus"
          data-id={cactus.id}
          style={{ left: cactus.left }}
        />
      ))}
    </>
  );
};

export default Cactus;
