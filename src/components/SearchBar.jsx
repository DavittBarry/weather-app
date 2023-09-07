import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/searchbar.scss';

function SearchBar({ onSearch, countries }) {
    const [search, setSearch] = useState('');

    const debounce = (func, delay) => {
        let debounceTimer;
        return function debouncedFunction(...args) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(this, args), delay);
        };
    };

    useEffect(() => {
        const debouncedSearch = debounce(() => {
            if (search.length > 2) {
                onSearch(search);
            }
        }, 300);
        debouncedSearch();
    }, [search]);

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        setSearch(searchTerm);
        if (searchTerm.length > 2) {
            onSearch(searchTerm);
        }
    };

    const handleClick = (countryName) => {
        onSearch(countryName);
    };

    return (
        <div className="searchbar-container">
            <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search for a country or city"
            />
            {countries && (
                <div className="search-results">
                    {countries.map((country) => (
                        <div
                            key={`${country.lat},${country.lon}`}
                            role="button"
                            tabIndex={0}
                            onClick={() => handleClick(country.name)}
                            onKeyPress={() => handleClick(country.name)}
                        >
                            {`${country.name}, ${country.country}${country.state ? `, ${country.state}` : ''}`}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    countries: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            lat: PropTypes.number.isRequired,
            lon: PropTypes.number.isRequired,
        }),
    ).isRequired,
};

export default SearchBar;
