import { TimerSettings } from ".";
import { useTimerContext } from "../context/TimerProvider";
import { useTimer } from "../hooks/useTimer";
import { Button } from "./ui/button";

export const FocusTimer = () => {
  const context = useTimerContext();

  if (!context) {
    throw new Error("FocusTimer must be used within a TimerProvider");
  }

  const { setTime, setTimeBreak } = context;

  const {
    timeLeft,
    startTimer,
    stopTimer,
    resetTimer,
    isActive,
    timerBreak,
    startBreak,
    stopBreak,
    isBreakActive,
  } = useTimer();

  const updateTimerTime = (newTime: number) => {
    resetTimer();
    setTime(newTime);
  };

  const updateBreakTime = (newBreak: number) => {
    stopBreak();
    setTimeBreak(newBreak);
  };

  const formattedTimeLeft = `${Math.floor(timeLeft / 60)}:${`0${
    timeLeft % 60
  }`.slice(-2)}`;

  const formattedBreakTime = `${Math.floor(timerBreak / 60)}:${`0${
    timerBreak % 60
  }`.slice(-2)}`;

  return (
    <>
      <TimerSettings
        onUpdateTime={updateTimerTime}
        onUpdateTimeBreak={updateBreakTime}
      />
      <div className="flex justify-center items-center flex-row gap-5">
        <div className="flex flex-col items-center justify-center gap-5">
          <h1 className="text-7xl shadow-xl shadow-[#202020] rounded-full h-64 w-64 flex items-center justify-center">
            {formattedTimeLeft}
          </h1>

          <div className="flex flex-row items-center gap-4">
            <Button
              onClick={startTimer}
              disabled={isActive}
              className="bg-transparent hover:bg-transparent"
            >
              Iniciar
            </Button>
            <Button
              onClick={stopTimer}
              disabled={!isActive}
              className="bg-transparent hover:bg-transparent"
            >
              Detener
            </Button>
            <Button
              onClick={resetTimer}
              className="bg-transparent hover:bg-transparent"
            >
              Reiniciar
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-5">
          <h1 className="text-7xl shadow-xl shadow-[#202020] rounded-full h-64 w-64 flex items-center justify-center">
            {formattedBreakTime}
          </h1>

          <div className="flex flex-row items-center gap-4">
            <Button
              onClick={startBreak}
              disabled={isBreakActive}
              className="bg-transparent hover:bg-transparent"
            >
              Iniciar
            </Button>
            <Button
              onClick={stopBreak}
              disabled={!isBreakActive}
              className="bg-transparent hover:bg-transparent"
            >
              Detener
            </Button>
            <Button
              onClick={resetTimer}
              className="bg-transparent hover:bg-transparent"
            >
              Reiniciar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
