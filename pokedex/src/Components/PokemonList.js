import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
        setPokemon(() => [...data.results]);
      })
      .catch((err) => console.log(err));
  };

  const handleShowNext = () => {
    const newOffset = offset + 10;
    if (newOffset < totalCount) {
      setOffset(newOffset);
    }
  };

  const handleShowPrevious = () => {
    const newOffset = offset - 10;
    if (newOffset >= 0) {
      setOffset(newOffset);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, [offset]);

  return (
    <div>
      <div className="pokemon-grid">
        {pokemon.map((poke, index) => (
          <div key={index} className="pokemon-circle">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + offset + 1
                }.png`}
              alt={poke.name}
            />
            <span>
              {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
            </span>
            <Link to={`/PokemonInfo/${poke.name}`}>More Info</Link>
          </div>
        ))}
      </div>
      <div className="text-center">
        {offset > 11 && (
          <button onClick={handleShowPrevious} className="btn btn-primary">
            Show Previous Page
          </button>
        )}
        {offset + 10 < totalCount && (
          <button onClick={handleShowNext} className="btn btn-primary">
            Show Next Page
          </button>
        )}
      </div>
    </div>
  );
}

export default PokemonList;
