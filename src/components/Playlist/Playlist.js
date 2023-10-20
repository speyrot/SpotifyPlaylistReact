import React, { useState, useRef, useEffect } from 'react';
import styles from './Playlist.module.css';
import Tracklist from '../SearchResults/Tracklist/Tracklist';

function Playlist({ tracks, onRemoveTrack, onSave, onPlaylistNameChange, playlistName }) {
    const [currentPlaylistName, setCurrentPlaylistName] = useState(playlistName);
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef(null);
    const playlistRef = useRef(null);

    const handleNameChange = (e) => {
        const newName = e.target.value;
        setCurrentPlaylistName(newName);
        onPlaylistNameChange(newName);
    };

    function savePlaylistToSpotify() {
        onSave();
        resetPlaylist();
    }

    function resetPlaylist() {
        onRemoveTrack(null);  // Passing null to clear all
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isEditing && playlistRef.current && !playlistRef.current.contains(event.target)) {
                setIsEditing(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isEditing]);

    return (
        <div className={styles.Playlist} ref={playlistRef}>
            {isEditing ? (
                <div className={styles.PlaylistHeader}>
                    <input
                        ref={inputRef}
                        value={currentPlaylistName}
                        onChange={handleNameChange}
                        className={styles.PlaylistNameInput}
                        onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
                    />
                    <button
                        className={styles.ExitEditModeButton}
                        onClick={() => setIsEditing(false)}
                    >
                        X
                    </button>
                </div>
            ) : (
                <div className={styles.PlaylistHeader}>
                    <h1>{currentPlaylistName}</h1>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </div>
            )}
            <Tracklist tracks={tracks} onRemoveTrack={onRemoveTrack} isEditing={isEditing} isPlaylist={true} />
            <button className={styles.PlaylistSave} onClick={savePlaylistToSpotify}>SAVE TO SPOTIFY</button>
        </div>
    );
}

export default Playlist;






