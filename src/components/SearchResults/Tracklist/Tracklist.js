import React from 'react';
import styles from './Tracklist.module.css';

function Tracklist({ tracks, onAddTrack, onRemoveTrack, isPlaylist, isEditing }) {

  const handleAddTrack = (track) => {
    if (onAddTrack) onAddTrack(track);
  };

  const handleRemoveTrack = (e, track) => {
    e.stopPropagation();
    if (onRemoveTrack) onRemoveTrack(track.uniqueId);
  };

  return (
    <div className={styles.Tracklist}>
      {tracks.map((track) => (
        <div key={track.uniqueId} className={`${styles.Track} ${isEditing && isPlaylist ? styles.editing : ''}`}>
          <div className={styles.TrackImage}>
            <img src={track.image} alt={track.name} />
          </div>
          <div className={styles.TrackInfo}>
            <h3>{track.name}</h3>
            <p>{track.artist} | {track.album}</p>
          </div>
          { 
            isPlaylist ? 
            (isEditing && (
              <button 
                className={styles.TrackRemoveAction} 
                onClick={(e) => handleRemoveTrack(e, track)}
              >
                <span className={styles.minusSign}>-</span>
              </button>
            ))
            : 
            (
              <button 
                className={styles.TrackAction} 
                onClick={() => handleAddTrack(track)}
              >
                +
              </button>
            )
          }
        </div>
      ))}
    </div>
  );
}

export default Tracklist;








