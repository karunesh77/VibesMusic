import React from 'react';
import SongCard from '../../components/SongCard/SongCard';
import styles from './Liked.module.css';

export default function Liked({ tracks, liked, currentId, isPlaying, playSong, isLiked, toggleLike }) {
  const likedTracks = tracks.filter(t => liked.has(t.id));

  return (
    <div>
      <div className={styles.pageHdr}>
        <h1 className={styles.pageTitle}>❤️ Liked Songs</h1>
        <p className={styles.pageSub}>{likedTracks.length} songs you loved</p>
      </div>
      <div className={styles.section}>
        {likedTracks.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🎵</div>
            <div className={styles.emptyTxt}>No liked songs yet — hit ♡ on any track!</div>
          </div>
        ) : (
          <div className={styles.list}>
            {likedTracks.map((t, i) => (
              <SongCard key={t.id} track={t} mode="list" index={i}
                isActive={currentId === t.id} isPlaying={isPlaying}
                onPlay={playSong} isLiked={isLiked(t.id)} onLike={toggleLike} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
