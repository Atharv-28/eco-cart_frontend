import React from "react";
import "./SearchBar.css";

function SearchBar({ placeholder, onSearch }) {
    const handleInputChange = (e) => {
        onSearch(e.target.value);
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                className="search-bar-input"
                placeholder={placeholder || "Search for a product..."}
                onChange={handleInputChange}
            />
        </div>
    );
}

export default SearchBar;
