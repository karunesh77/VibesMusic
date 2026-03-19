import React from 'react';
import { fmtNum } from '../../utils/helpers';
import styles from './SongCard.module.css';

export default function SongCard({ track, mode = 'grid', index = 0, isActive, isPlaying, onPlay, isLiked, onLike }) {
  if (mode === 'list') {
    return (
      <div className={`${styles.sl} ${isActive ? styles.active : ''}`} onClick={() => onPlay(track)}>
        <span className={styles.slNum}>{isActive && isPlaying ? '▶' : index + 1}</span>
        <div className={styles.slCover} style={{ background: `${track.color}22` }}>
          {track.cover ? <img src={track.cover} alt="" /> : track.emoji}
        </div>
        <div className={styles.slInfo}>
          <div className={styles.slName}>{track.name}</div>
          <div className={styles.slArtist}>{track.artist}</div>
        </div>
        <span className={styles.slGenre}>{track.genre}</span>
        <span className={styles.slDur}>{track.dur}</span>
        <button
          className={`${styles.heartBtn} ${isLiked ? styles.on : ''}`}
          onClick={e => { e.stopPropagation(); onLike(track.id); }}
        >
          {isLiked ? '♥' : '♡'}
        </button>
      </div>
    );
  }

  return (
    <div className={`${styles.card} ${isActive ? styles.active : ''}`} onClick={() => onPlay(track)}>
      <div className={styles.cover}>
        <div className={styles.art} style={{ background: `radial-gradient(circle at 40% 40%,${track.color}33,#10101C)` }}>
          {track.cover
            ? <img src={track.cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : track.emoji}
        </div>
        <div className={styles.overlay}>
          <div className={styles.playCircle}>{isActive && isPlaying ? '⏸' : '▶'}</div>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{track.name}</div>
        <div className={styles.artist}>{track.artist}</div>
        <div className={styles.foot}>
          <span className={styles.dur}>{track.dur}</span>
          <span className={styles.like}>♥ {fmtNum(track.likes)}</span>
        </div>
      </div>
    </div>
  );
}
