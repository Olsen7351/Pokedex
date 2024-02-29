import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function SearchBar() {}

function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonId, setPokemonId] = useState(0);

  const fetchPokemon = (id) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPokemon((prevPokemon) => [...prevPokemon, ...data.results]);
      })
      .catch((err) => console.log(err));
  };

  const handleShowMore = () => {
    const newId = pokemonId + 10;
    setPokemonId(newId);
    fetchPokemon(newId);
  };

  useEffect(() => {
    fetchPokemon(pokemonId);
    console.log("I log once");
  }, []);

  return (
    <div>
      <div className="pokemon-grid">
        {pokemon.map((poke, index) => (
          <div key={index} className="pokemon-circle">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                pokemonId + index + 1
              }.png`}
              alt={poke.name}
            />
            <span>
              #{pokemonId + index + 1}
              {" " + poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
            </span>
            <button className="btn btn-primary">Details</button>
          </div>
        ))}
      </div>
      <div className="text-center">
        <button onClick={handleShowMore} className="btn btn-primary">
          Show More
        </button>
      </div>
    </div>
  );
}

function PokemonInfo() {}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PokemonList></PokemonList>
      </header>
    </div>
  );
}

export default App;
