import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import PokemonList from "./Components/PokemonList.js";
import PokemonInfo from "./Components/PokemonInfo.js";
import SearchBar from "./Components/SearchBar.js";
import SearchResult from "./Components/SearchResult.js";

function App() {
  return (
    <div className="App">
      <SearchBar />
      <header className="App-header">
        <Routes>
          <Route path="/PokemonInfo/:pokemonName" element={<PokemonInfo />} />
          <Route path="/" element={<PokemonList />} />
          <Route path="/SearchResult/:searchTerm" element={<SearchResult />} />
          <Route path="/SearchResult" element={<SearchResult />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
