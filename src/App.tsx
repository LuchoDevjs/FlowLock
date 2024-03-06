import { FocusTimer } from "./components/FocusTimer";
import { TimeProvider } from "./context/TimerProvider";

function App() {
  return (
    <TimeProvider>
      <div className="flex flex-col justify-center items-center">
        <FocusTimer />
      </div>
    </TimeProvider>
  );
}

export default App;
