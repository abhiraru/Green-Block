import React, { useEffect, useState } from 'react';
import './Background.css';

const Background = () => {
  const [clouds, setClouds] = useState([]);

  // Spawn clouds periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const top = Math.random() * 100; // Random vertical position
      setClouds((prev) => [...prev, { id, left: 1000, top }]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Move clouds slowly
  useEffect(() => {
    const move = setInterval(() => {
      setClouds((prev) =>
        prev
          .map((c) => ({ ...c, left: c.left - 0.5 }))
          .filter((c) => c.left > -200)
      );
    }, 10);

    return () => clearInterval(move);
  }, []);

  return (
    <div className="background">
      <div className="ground" />
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="cloud"
          style={{ left: cloud.left, top: cloud.top }}
        />
      ))}
    </div>
  );
};

export default Background;