import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import PokemonList from "./Components/PokemonList.js";
import PokemonInfo from "./Components/PokemonInfo.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/PokemonInfo/:pokemonName" element={<PokemonInfo />} />
          <Route path="/" element={<PokemonList />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
