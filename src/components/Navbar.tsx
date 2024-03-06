import { NavLink } from "react-router-dom";

const navLinks = [
  { to: "/focustimer", text: "Inicio" },
  { to: "/timersettings", text: "Configuración" },
];

const Navbar = () => {
  return (
    <nav className="flex flex-row justify-center items-center gap-5 m-5">
      {navLinks.map(({ to, text }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            isActive
              ? "border-dotted border-b-2 border-[#3c3c3c] shadow-lg shadow-[#1f1f1f]"
              : "border-b-2 border-transparent"
          }
        >
          <div className="flex flex-col items-center cursor-pointer p-1">
            <p>{text}</p>
          </div>
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
