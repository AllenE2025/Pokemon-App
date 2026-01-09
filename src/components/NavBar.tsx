import "../App.css";

function NavBar() {
  return (
    <div className="text-blue-200 fixed top-0 left-0 w-full flex justify-evenly py-2 backdrop-blur bg-black/20">
      <button className="transition-all hover:scale-105 font-medium hover:cursor-pointer">
        Home
      </button>
      <button className="transition-all hover:scale-105 font-medium hover:cursor-pointer">
        Pokemon App
      </button>
      <button className="transition-all hover:scale-105 font-medium hover:cursor-pointer">
        Favorites
      </button>
    </div>
  );
}

export default NavBar;
