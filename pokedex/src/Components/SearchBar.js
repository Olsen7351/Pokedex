import React from "react";
import { useState } from "react";

// TODO: Create a SearchBar component that takes a prop and then uses that prop to search for a List of Pokemons containing the search term
// The SearchBar component should have a form with an input and a button

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    props.handleSearch(searchTerm);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a Pokemon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
