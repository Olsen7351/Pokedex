import React, { useState, useEffect } from "react";
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
    <div className="container">
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
          <p>ID: {pokemon.id}</p>
          <p>Is Main Series: {pokemon.is_main_series ? "Yes" : "No"}</p>
          {pokemon.generation && (
            <div>
              <h2>Generation</h2>
              <p>Name: {pokemon.generation.name}</p>
              <p>URL: {pokemon.generation.url}</p>
            </div>
          )}
          {pokemon.names && (
            <div>
              <h2>Names</h2>
              {pokemon.names.map((name, index) => (
                <div key={index}>
                  <p>Name: {name.name}</p>
                  <p>Language Name: {name.language.name}</p>
                  <p>Language URL: {name.language.url}</p>
                </div>
              ))}
            </div>
          )}
          {pokemon.abilities && (
            <div>
              <h2>Abilities</h2>
              {pokemon.abilities.map((ability, index) => (
                <div key={index}>
                  <p>Is Hidden: {ability.is_hidden ? "Yes" : "No"}</p>
                  <p>Slot: {ability.slot}</p>
                  <p>Ability Name: {ability.ability.name}</p>
                  <p>Ability URL: {ability.ability.url}</p>
                </div>
              ))}
            </div>
          )}
          {pokemon.stats && (
            <div>
              <h2>Stats</h2>
              {pokemon.stats.map((stat, index) => (
                <div key={index}>
                  <p>Base Stat: {stat.base_stat}</p>
                  <p>Effort: {stat.effort}</p>
                  <p>Stat Name: {stat.stat.name}</p>
                  <p>Stat URL: {stat.stat.url}</p>
                </div>
              ))}
            </div>
          )}

          {pokemon.types && (
            <div>
              <h2>Types</h2>
              {pokemon.types.map((type, index) => (
                <div key={index}>
                  <p>Slot: {type.slot}</p>
                  <p>Type Name: {type.type.name}</p>
                  <p>Type URL: {type.type.url}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PokemonInfo;
