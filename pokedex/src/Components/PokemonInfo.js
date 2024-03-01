import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

export default PokemonInfo;
