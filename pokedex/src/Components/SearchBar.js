import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  function handleSearch() {
    if (searchTerm) {
      // Navigate to the search result page

      navigate(`/SearchResult/${searchTerm}`);
    } else {
      // Show an error message
      alert("Please enter a search term");
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={
          (e) => {
            setSearchTerm(e.target.value.toLowerCase())
          } // 
        }
      />
      <button onClick={handleSearch} className="btn btn-primary m-2">Search</button>
    </div>
  );
}

export default SearchBar;

