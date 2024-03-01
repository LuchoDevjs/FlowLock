import { useEffect, useState } from "react";

interface UseTimer {
  timeLeft: number;
  isActive: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
}

const getNumberFromLocalStorage = (key: string): number => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : 0;
};

const useTimer = (initialTime: number = 1500): UseTimer => {
  const calculateInitialTimeLeft = (): number => {
    const endTime = getNumberFromLocalStorage("endTime");
    const now = new Date().getTime();
    const savedTimeLeft = endTime - now;
    return savedTimeLeft > 0 ? Math.floor(savedTimeLeft / 1000) : initialTime;
  };

  const [timeLeft, setTimeLeft] = useState<number>(calculateInitialTimeLeft);
  const [isActive, setIsActive] = useState<boolean>(() => {
    const endTime = localStorage.getItem("endTime");
    const now = new Date().getTime();
    // Asegúrate de retornar correctamente el valor calculado.
    return endTime ? JSON.parse(endTime) > now : false;
  });

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const endTime = getNumberFromLocalStorage("endTime");
      const timeLeft = Math.floor((endTime - now) / 1000);

      if (timeLeft > 0) {
        setTimeLeft(timeLeft);
      } else {
        setIsActive(false);
        setTimeLeft(0);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsActive(false);
      localStorage.removeItem("endTime");
    }
  }, [timeLeft]);

  const startTimer = () => {
    if (!isActive && timeLeft > 0) {
      const end = new Date().getTime() + timeLeft * 1000;
      localStorage.setItem("endTime", JSON.stringify(end));
      setIsActive(true);
    }
  };

  const stopTimer = () => setIsActive(false);

  const resetTimer = () => {
    stopTimer();
    localStorage.removeItem("endTime");
    setTimeLeft(initialTime);
  };

  return { timeLeft, isActive, startTimer, stopTimer, resetTimer };
};

export { useTimer };
