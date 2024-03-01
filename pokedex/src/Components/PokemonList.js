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
                index + 1
              }.png`}
              alt={poke.name}
            />
            <span>
              #{index + 1}{" "}
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

export default PokemonList;
