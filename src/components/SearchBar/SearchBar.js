import React, { useState } from 'react';
import styles from './SearchBar.module.css'; // Import the CSS module

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (onSearch && searchTerm) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className={styles.SearchBar}>
      <input 
        placeholder="Enter a song, album, or artist" 
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>SEARCH</button>
    </div>
  );
}

export default SearchBar;
