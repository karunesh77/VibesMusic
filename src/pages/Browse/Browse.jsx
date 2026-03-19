import React, { useState } from 'react';
import SongCard from '../../components/SongCard/SongCard';
import { GENRES } from '../../data/constants';
import styles from './Browse.module.css';

export default function Browse({ tracks, searchResults, searchQ, loading, genre, onGenreChange, currentId, isPlaying, playSong, isLiked, toggleLike }) {
  const [viewMode, setViewMode] = useState('list');
  const display = searchQ && searchResults.length ? searchResults : tracks;

  return (
    <div>
      <div className={styles.pageHdr}>
        <h1 className={styles.pageTitle}>Browse Music</h1>
        <p className={styles.pageSub}>Powered by Jamendo — 500K+ free & legal tracks</p>
      </div>
      <div className={styles.section}>
        <div className={styles.genreBar}>
          {GENRES.map(g => (
            <button key={g} className={`${styles.gp} ${genre === g ? styles.on : styles.off}`} onClick={() => onGenreChange(g)}>
              {g}
            </button>
          ))}
        </div>
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${viewMode === 'grid' ? styles.on : ''}`} onClick={() => setViewMode('grid')}>Grid</button>
          <button className={`${styles.tab} ${viewMode === 'list' ? styles.on : ''}`} onClick={() => setViewMode('list')}>List</button>
        </div>
        {loading ? (
          <div className={styles.loading}><div className={styles.spinner} /><span>Loading...</span></div>
        ) : viewMode === 'grid' ? (
          <div className={styles.grid}>
            {display.map(t => (
              <SongCard key={t.id} track={t} isActive={currentId === t.id} isPlaying={isPlaying}
                onPlay={playSong} isLiked={isLiked(t.id)} onLike={toggleLike} />
            ))}
          </div>
        ) : (
          <div className={styles.list}>
            {display.map((t, i) => (
              <SongCard key={t.id} track={t} mode="list" index={i} isActive={currentId === t.id}
                isPlaying={isPlaying} onPlay={playSong} isLiked={isLiked(t.id)} onLike={toggleLike} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
