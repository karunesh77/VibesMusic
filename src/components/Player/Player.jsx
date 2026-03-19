import React, { useRef } from 'react';
import { fmtTime } from '../../utils/helpers';
import styles from './Player.module.css';

export default function Player({
  current, isPlaying, progress, duration,
  volume, setVolume, shuffle, setShuffle, repeat, setRepeat,
  togglePlay, skipNext, skipPrev, seekTo,
  isLiked, toggleLike, audioRef, onTimeUpdate, onEnded,
}) {
  const progRef = useRef(null);
  const pct = duration ? (progress / duration) * 100 : 0;

  return (
    <>
      <audio
        ref={audioRef}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
        onLoadedMetadata={() => {}}
        crossOrigin="anonymous"
      />
      <div className={styles.bar}>
        {/* LEFT — Song Info */}
        <div className={styles.left}>
          <div className={styles.cover}>
            {current?.cover
              ? <img src={current.cover} alt="" />
              : <span>{current?.emoji || '🎵'}</span>}
          </div>
          <div className={styles.info}>
            <div className={styles.name}>{current?.name || 'No track playing'}</div>
            <div className={styles.artist}>{current?.artist || 'Pick a song to start'}</div>
          </div>
          {current && (
            <button
              className={`${styles.heart} ${isLiked(current.id) ? styles.liked : ''}`}
              onClick={() => toggleLike(current.id)}
            >
              {isLiked(current.id) ? '♥' : '♡'}
            </button>
          )}
        </div>

        {/* CENTER — Controls */}
        <div className={styles.center}>
          <div className={styles.btns}>
            <button className={`${styles.cb} ${shuffle ? styles.on : ''}`} onClick={() => setShuffle(!shuffle)} title="Shuffle">⇄</button>
            <button className={styles.cb} onClick={skipPrev}>⏮</button>
            <button className={styles.playBtn} onClick={togglePlay}>{isPlaying ? '⏸' : '▶'}</button>
            <button className={styles.cb} onClick={skipNext}>⏭</button>
            <button className={`${styles.cb} ${repeat ? styles.on : ''}`} onClick={() => setRepeat(!repeat)} title="Repeat">↺</button>
          </div>
          <div className={styles.prog}>
            <span className={styles.time}>{fmtTime(progress)}</span>
            <div className={styles.track} ref={progRef} onClick={e => seekTo(e, progRef)}>
              <div className={styles.fill} style={{ width: `${pct}%` }} />
            </div>
            <span className={`${styles.time} ${styles.right}`}>{fmtTime(duration)}</span>
          </div>
        </div>

        {/* RIGHT — Volume */}
        <div className={styles.right}>
          <span className={styles.volIcon}>🔊</span>
          <input
            type="range"
            className={styles.volSlider}
            min="0" max="1" step="0.01"
            value={volume}
            onChange={e => setVolume(parseFloat(e.target.value))}
          />
        </div>
      </div>
    </>
  );
}
