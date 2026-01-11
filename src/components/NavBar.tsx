import "../App.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="z-50 text-white fixed top-0 left-0 w-full flex justify-evenly py-2 backdrop-blur bg-red-600/90 border-b-4 border-black">
      <Link
        className="transition-all hover:scale-105 font-medium hover:cursor-pointer"
        to="/"
      >
        Home
      </Link>
      <Link
        className="transition-all hover:scale-105 font-medium hover:cursor-pointer"
        to="/pokemon"
      >
        Pokemon
      </Link>
      <Link
        className="transition-all hover:scale-105 font-medium hover:cursor-pointer"
        to="/favorite"
      >
        Favorite
      </Link>
    </nav>
  );
}

export default NavBar;
