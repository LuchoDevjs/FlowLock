import { TimerMode, TimerSettings } from "./components";
import { FocusTimer } from "./components/FocusTimer";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col justify-center items-center">
        <Routes>
          <Route index element={<FocusTimer />} />
          <Route path="/focustimer" element={<FocusTimer />} />
          <Route path="/timermode" element={<TimerMode />} />
          <Route path="/timersettings" element={<TimerSettings />} />
        </Routes>
        <Navbar />
      </div>
    </BrowserRouter>
  );
}

export default App;
