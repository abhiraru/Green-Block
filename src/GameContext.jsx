import { createContext, useContext, useState, useRef } from "react";

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [dinoRef, setDinoRef] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);
  const speedRef = useRef(3);
  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    speedRef.current = 3;
    setResetTrigger((prev) => !prev);
  }

  return (
    <GameContext.Provider value={{ dinoRef, setDinoRef, gameOver, setGameOver, score, setScore, resetGame, speedRef, gameStarted, setGameStarted, resetTrigger }}>
      {children}
    </GameContext.Provider>
  );
}