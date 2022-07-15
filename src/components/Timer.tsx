import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Colors } from "../models/Colors";
import { Player } from "../models/Player";

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
  const [blackTime, setBlackTime] = useState<number>(300);
  const [whiteTime, setWhiteTime] = useState<number>(300);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    startTimer();
  }, [currentPlayer, restart]);

  const startTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    timer.current = setInterval(
      currentPlayer?.color === Colors.BLACK
        ? decrementBlackTimer
        : decrementWhiteTimer,
      1000
    );
  };

  useEffect(() => {
    if (blackTime === 0 || whiteTime === 0) {
      alert(
        `Время закончилось! Победили ${
          currentPlayer?.color === Colors.BLACK ? Colors.WHITE : Colors.BLACK
        }`
      );
      if (timer.current) {
        clearInterval(timer.current);
      }
    }
  }, [blackTime, whiteTime]);

  const decrementBlackTimer = () => {
    setBlackTime((prev) => prev - 1);
  };

  const decrementWhiteTimer = () => {
    setWhiteTime((prev) => prev - 1);
  };

  const handleRestart = useCallback(() => {
    restart();
    setBlackTime(300);
    setWhiteTime(300);
  }, [restart]);

  return (
    <div className="timer">
      <h2>Черные - {blackTime}</h2>
      <h2>Белые - {whiteTime}</h2>
      <div>
        <button onClick={handleRestart}>Restart</button>
      </div>
    </div>
  );
};

export default Timer;
