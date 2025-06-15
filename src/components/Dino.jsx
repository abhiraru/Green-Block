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
  const jumpSoundRef = useRef(null);

  useEffect(() => {
    jumpSoundRef.current = new Audio('/jump.mp3');
  });


  useEffect(() => {
    setDinoRef(dinoRef);
  }, [setDinoRef]);

  const jump = () => {
    if (!isJumping && !gameOver) {
      if (jumpSoundRef.current) {
        jumpSoundRef.current.currentTime = 0;
        jumpSoundRef.current.play().catch((e) =>
          console.warn('Jump sound failed:', e)
        );
      }
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 1000);
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
