import { useTimer } from "../hooks/useTimer";
import { Button } from "./ui/button";

export const FocusTimer = () => {
  const { timeLeft, startTimer, stopTimer, resetTimer, isActive } = useTimer(
    25 * 60
  );

  const formattedTimeLeft = `${Math.floor(timeLeft / 60)}:${`0${
    timeLeft % 60
  }`.slice(-2)}`;

  return (
    <div className="flex flex-col items-center justify-center gap-5 mb-10">
      <h1 className="text-7xl">{formattedTimeLeft}</h1>
      <div className="flex flex-row items-center gap-4">
        <Button
          onClick={startTimer}
          disabled={isActive}
          className="bg-[#131313] rounded-full hover:bg-[#0e0e0e] border border-[#232323]"
        >
          Iniciar
        </Button>
        <Button
          onClick={stopTimer}
          disabled={!isActive}
          className="bg-[#131313] rounded-full hover:bg-[#0e0e0e] border border-[#232323]"
        >
          Detener
        </Button>
        <Button
          onClick={resetTimer}
          className="bg-[#131313] rounded-full hover:bg-[#0e0e0e] border border-[#232323]"
        >
          Reiniciar
        </Button>
      </div>
    </div>
  );
};
