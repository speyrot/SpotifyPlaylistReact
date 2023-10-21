import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from './Spotify';

function App() {
  // State initialization
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const addTrackToPlaylist = (track) => {
    const uniqueId = `${track.id}-${Date.now()}`;
    const trackWithUniqueId = { ...track, uniqueId };
    setPlaylistTracks(prevTracks => [...prevTracks, trackWithUniqueId]);
  };

  const removeTrackFromPlaylist = (uniqueId) => {
    if (uniqueId === null) {
        setPlaylistTracks([]);
        return;
    }
    setPlaylistTracks(prevTracks => prevTracks.filter(track => track.uniqueId !== uniqueId));
  };

  const savePlaylist = () => {
    const trackUris = playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
        setPlaylistName('New Playlist');
        setPlaylistTracks([]);
    });
  };

  const searchTracks = (term) => {
    Spotify.search(term).then(searchResults => {
      setSearchResults(searchResults);
    });
  };

  useEffect(() => {
    Spotify.getAccessToken();
  }, []);

  return (
    <div className={styles.App}>
      <div className={styles.AppHeader}>
        <h1>TrackStack</h1>
        {/* Your header content */}
      </div>
      <div className={styles.AppSearch}>
        <SearchBar onSearch={searchTracks} />
      </div>
      <div className={styles.AppContent}>
        <div className={styles.AppResults}>
          <SearchResults results={searchResults} onAddTrack={addTrackToPlaylist} />
        </div>
        <div className={styles.AppPlaylist}>
          <Playlist
            tracks={playlistTracks}
            onRemoveTrack={removeTrackFromPlaylist}
            onPlaylistNameChange={setPlaylistName}
            playlistName={playlistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );  
}

export default App;


