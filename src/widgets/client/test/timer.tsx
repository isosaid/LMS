import React, { useState, useEffect, useRef } from "react";

interface CountdownTimerProps {
  initialTime: number;     
  onFinish?: () => void;     
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialTime, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  const timerRef = useRef<number | null>(null);
  const finishedRef = useRef(false);

  useEffect(() => {
    setTimeLeft(initialTime);
    finishedRef.current = false;

    if (initialTime <= 0) return;

    timerRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current !== null) {
            clearInterval(timerRef.current);
          }
          if (!finishedRef.current && onFinish) {
            finishedRef.current = true;
            onFinish();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, [initialTime, onFinish]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div
      className='text-green-600 px-[10px]'
      style={{ fontSize: "24px", fontWeight: "bold" }}
    >
      {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
    </div>
  );
};

export default CountdownTimer;
