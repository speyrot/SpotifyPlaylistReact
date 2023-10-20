import React from 'react';
import styles from './SearchResults.module.css';
import Tracklist from './Tracklist/Tracklist';

function SearchResults({ results, onAddTrack }) {
  return (
    <div className={styles.SearchResults}>
        <h1>Results</h1>
        <Tracklist tracks={results} onAddTrack={onAddTrack} isPlaylist={false} />
    </div>
  );
}

export default SearchResults;