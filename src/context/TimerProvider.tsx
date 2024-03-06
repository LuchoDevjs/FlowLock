import React, { createContext, useContext, useState } from "react";

interface TimerProviderProps {
  children: React.ReactNode;
}

interface TimerContextType {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  timeBreak: number;
  setTimeBreak: React.Dispatch<React.SetStateAction<number>>;
}

const TimerContext = createContext<TimerContextType | null>(null);

export const useTimerContext = () => useContext(TimerContext);

export const TimeProvider = ({ children }: TimerProviderProps) => {
  const [time, setTime] = useState(1500);
  const [timeBreak, setTimeBreak] = useState(300);
  const value = { time, setTime, timeBreak, setTimeBreak };

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
};
