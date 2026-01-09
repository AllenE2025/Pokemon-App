import "./App.css";
import NavBar from "./components/NavBar";
import Pokemon from "./components/Pokemon";

function App() {
  return (
    <div className="min-h-screen bg-neutral-900 p-15">
      <NavBar />

      <h1 className="text-red-300 font-semibold text-4xl">
        Welcome To Pokemon App
      </h1>
      <Pokemon />
    </div>
  );
}

export default App;
