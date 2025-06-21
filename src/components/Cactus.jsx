import React, { useEffect, useRef, useState } from 'react';
import { useGame } from '../GameContext';
import './Cactus.css';

const Cactus = () => {
  const { dinoRef, setGameOver, gameOver, speedRef } = useGame();
  const [cactuses, setCactuses] = useState([]);
  const spawnTimer = useRef(null);
  const moveTimer = useRef(null);
  const spawnIntervalRef = useRef(3000);

  // Spawn a new cactus
  const spawnCactus = () => {
    const id = Date.now();
    const image = Math.random() < 0.5 ? 'obj1.png' : 'obj2.png';
    setCactuses((prev) => [...prev, { id, left: 1000, image }]);
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
      const spawn = () => {
    spawnCactus();

    // Reduce the spawn interval down to a minimum value
    if (spawnIntervalRef.current > 1000) {
      spawnIntervalRef.current -= 90; // Faster over time
    }

    spawnTimer.current = setTimeout(spawn, spawnIntervalRef.current);
  };

  spawn(); // Initial call

  return () => clearTimeout(spawnTimer.current);
  }, [gameOver]);

  
  useEffect(() => {
    if (gameOver) return;

    const speedUp = setInterval(() => {
      speedRef.current += 0.2;
    }, 2000); // Increase every 2 seconds

    return () => clearInterval(speedUp);
  }, [gameOver]);

  // Collision detection
  useEffect(() => {
    const checkCollision = () => {
      if (!dinoRef.current) return;

      const dinoHitbox = dinoRef.current.querySelector('.hitbox');
      if (!dinoHitbox) return;
      const dinoBox = dinoHitbox.getBoundingClientRect();


      for (let cactus of cactuses) {
        // const cactusElement = document.querySelector(`.cactus[data-id="${cactus.id}"]`);
        const cactusElement = document.querySelector(
  `.cactus-wrapper[data-id="${cactus.id}"] .hitbox`
);

        if (!cactusElement) continue;

        const cactusBox = cactusElement.getBoundingClientRect();


        if (
           dinoBox.left < cactusBox.right &&
          dinoBox.right > cactusBox.left &&
          dinoBox.top < cactusBox.bottom &&
          dinoBox.bottom > cactusBox.top
        ) {
          setGameOver(true);
        }
      }
    };

    const collisionInterval = setInterval(checkCollision, 10);
    return () => clearInterval(collisionInterval);
  }, [cactuses, dinoRef, setGameOver]);

  return (
   <>
    {cactuses.map((cactus) => (
      <div
        key={cactus.id}
        className="cactus-wrapper"
        data-id={cactus.id}
        style={{ left: cactus.left }}
      >
        <div className="hitbox" />
        <img src={cactus.image} className="cactus-image" alt="cactus" />
      </div>
    ))}
  </>

  );
};

export default Cactus;
