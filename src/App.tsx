import { Navigate, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import NavBar from "./components/NavBar";
import Pokemon from "./components/Pokemon";
import Favorite from "./components/Favorite";
import Home from "./components/Home";

function App() {
  return (
    <div
      className="text-center min-h-screen bg-center p-25"
      // style={{ backgroundImage: "url('../public/pokemon-bg-2.jpg')" }}
    >
      <NavBar />

      {/* <h1 className="font-bold text-4xl">Welcome To Pokemon App</h1> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon" element={<Pokemon />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route
          path="*"
          element={
            <div>
              <Navigate to="/" replace />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
