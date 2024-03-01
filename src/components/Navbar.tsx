import {
  IoHourglassOutline,
  IoSettingsOutline,
  IoHomeOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex flex-row justify-center items-center gap-5">
      <Link to="/focustimer">
        <div className="flex flex-col items-center cursor-pointer">
          <IoHomeOutline size={20} />
          <p>Inicio</p>
        </div>
      </Link>
      <Link to="/timermode">
        <div className="flex flex-col items-center cursor-pointer">
          <IoHourglassOutline size={20} />
          <p>Modo de temporizador</p>
        </div>
      </Link>
      <Link to="timersettings">
        <div className="flex flex-col items-center cursor-pointer">
          <IoSettingsOutline size={20} />
          <p>Configuración</p>
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
