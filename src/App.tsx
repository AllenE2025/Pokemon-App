import "./App.css";
import NavBar from "./components/NavBar";
import Pokemon from "./components/Pokemon";

function App() {
  return (
    <div className="text-center min-h-screen bg-center" style={{backgroundImage: "url('../public/pokemon-bg-2.jpg')"}}>
      <NavBar />

      <h1 className="font-bold text-4xl pt-20">
        Welcome To Pokemon App
      </h1>
      <Pokemon />
    </div>
  );
}

export default App;
