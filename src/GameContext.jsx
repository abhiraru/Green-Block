import { createContext, useContext, useState, useRef } from "react";

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [dinoRef, setDinoRef] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const speedRef = useRef(3);
  const resetGame = () => {
    setScore(0);
    setGameOver(false);
  }

  return (
    <GameContext.Provider value={{ dinoRef, setDinoRef, gameOver, setGameOver, score, setScore, resetGame, speedRef }}>
      {children}
    </GameContext.Provider>
  );
}