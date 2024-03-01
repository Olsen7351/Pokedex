import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { Button } from "bootstrap";
import { useParams } from "react-router-dom";

function SearchBar() {}

function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const fetchPokemon = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${offset}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTotalCount(data.count);
        setPokemon((prevPokemon) => [...prevPokemon, ...data.results]);
      })
      .catch((err) => console.log(err));
  };

  const handleShowMore = () => {
    const newOffset = offset + 10;
    if (newOffset < totalCount) {
      setOffset(newOffset);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, [offset]); // Trigger fetchPokemon whenever offset changes

  return (
    <div>
      <div className="pokemon-grid">
        {pokemon.map((poke, index) => (
          <div key={index} className="pokemon-circle">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                index + offset + 1
              }.png`}
              alt={poke.name}
            />
            <span>
              #{index + offset + 1}{" "}
              {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
            </span>
            <Link to={`/PokemonInfo/${poke.name}`}>More Info</Link>
          </div>
        ))}
      </div>
      <div className="text-center">
        {offset + 10 < totalCount && (
          <button onClick={handleShowMore} className="btn btn-primary">
            Show More
          </button>
        )}
      </div>
    </div>
  );
}

function PokemonInfo(props) {
  const [pokemon, setPokemon] = useState(null);
  const { pokemonName } = useParams();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPokemon(data);
      })
      .catch((err) => console.log(err));
  }, [pokemonName]);

  return (
    <div>
      {pokemon && (
        <div>
          <h1>{pokemon.name}</h1>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width="200"
          />
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
        </div>
      )}
    </div>
  );
}

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
