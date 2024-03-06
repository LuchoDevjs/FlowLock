import { useEffect, useState } from "react";
import { useTimerContext } from "../context/TimerProvider";

// interface UseTimer {
//   timeLeft: number;
//   isActive: boolean;
//   startTimer: () => void;
//   stopTimer: () => void;
//   resetTimer: () => void;
// }

const getNumberFromLocalStorage = (key: string): number => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : 0;
};

const useTimer = () => {
  const context = useTimerContext();

  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider");
  }

  const { time: initialTime, timeBreak: initialBreakTime } = context;

  const calculateInitialTimeLeft = (): number => {
    const endTime = getNumberFromLocalStorage("endTime");
    const now = new Date().getTime();
    const savedTimeLeft = endTime - now;
    return savedTimeLeft > 0 ? Math.floor(savedTimeLeft / 1000) : initialTime;
  };

  const calculateInitialBreakTimeLeft = (): number => {
    const breakEndTime = getNumberFromLocalStorage("breakEndTime");
    const now = new Date().getTime();
    const savedBreakTimeLeft = breakEndTime - now;
    return savedBreakTimeLeft > 0
      ? Math.floor(savedBreakTimeLeft / 1000)
      : initialBreakTime;
  };

  const [timeLeft, setTimeLeft] = useState<number>(calculateInitialTimeLeft);
  const [timerBreak, setTimerBreak] = useState<number>(
    calculateInitialBreakTimeLeft
  );
  const [isActive, setIsActive] = useState<boolean>(() => {
    const endTime = localStorage.getItem("endTime");
    const now = new Date().getTime();
    return endTime ? JSON.parse(endTime) > now : false;
  });
  const [isBreakActive, setIsBreakActive] = useState<boolean>(() => {
    const breakEndTime = localStorage.getItem("breakEndTime");
    const now = new Date().getTime();
    return breakEndTime ? JSON.parse(breakEndTime) > now : false;
  });

  // useEffect(() => {
  //   if (!isActive) {
  //     setTimeLeft(initialTime);
  //   }
  // }, [initialTime, isActive]);

  // useEffect(() => {
  //   if (!isBreakActive) {
  //     setTimerBreak(initialBreakTime);
  //   }
  // }, [initialBreakTime, isBreakActive]);

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
    if (!isBreakActive) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const breakEndTime = getNumberFromLocalStorage("breakEndTime");
      const breakTimeLeft = Math.floor((breakEndTime - now) / 1000);

      if (breakTimeLeft > 0) {
        setTimerBreak(breakTimeLeft);
      } else {
        setIsBreakActive(false);
        setTimerBreak(0);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isBreakActive]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsActive(false);
      localStorage.removeItem("endTime");

      if (!isBreakActive && initialBreakTime > 0) {
        startBreak();
      }
    }
  }, [timeLeft]);

  useEffect(() => {
    if (timerBreak === 0) {
      setIsBreakActive(false);
      localStorage.removeItem("breakEndTime");
    }
  }, [timerBreak]);

  const startTimer = () => {
    if (!isActive && timeLeft > 0) {
      const end = new Date().getTime() + timeLeft * 1000;
      localStorage.setItem("endTime", JSON.stringify(end));
      setIsActive(true);
    }
  };

  const startBreak = () => {
    if (!isBreakActive && timerBreak > 0) {
      const breakEnd = new Date().getTime() + timerBreak * 1000;
      localStorage.setItem("breakEndTime", JSON.stringify(breakEnd));
      setIsBreakActive(true);
    }
  };

  const stopTimer = () => setIsActive(false);
  const stopBreak = () => setIsBreakActive(false);

  const resetTimer = () => {
    stopTimer();
    stopBreak();
    localStorage.removeItem("endTime");
    localStorage.removeItem("breakEndTime");
    setTimeLeft(initialTime);
    setTimerBreak(initialBreakTime);
  };

  return {
    timeLeft,
    isActive,
    startTimer,
    stopTimer,
    resetTimer,
    timerBreak,
    isBreakActive,
    startBreak,
    stopBreak,
  };
};

export { useTimer };
