import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { useGame } from '../GameContext';
import './Dino.css';

const Dino = forwardRef((props, ref) => {
  const dinoRef = useRef(null);
  const [isJumping, setIsJumping] = useState(false);
  const { setDinoRef, gameOver } = useGame();

  useEffect(() => {
    setDinoRef(dinoRef);
  }, [setDinoRef]);

  const jump = () => {
    if (!isJumping && !gameOver) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 600);
    }
  };

  useImperativeHandle(ref, () => ({
    jump,
  }));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isJumping, gameOver]);

  return <div ref={dinoRef} className={`dino ${isJumping ? 'jump' : ''}`}></div>;
});

export default Dino;
