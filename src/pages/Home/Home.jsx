import React from 'react';
import SongCard from '../../components/SongCard/SongCard';
import { PLAYLISTS } from '../../data/constants';
import styles from './Home.module.css';

export default function Home({ tracks, loading, error, playSong, currentId, isPlaying, isLiked, toggleLike, setPage }) {
  return (
    <div>
      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <div className={styles.badge}>🎧 500K+ Tracks • Free Forever</div>
            <h1 className={styles.title}>
              <span className={styles.t1}>FEEL THE</span>
              <span className={styles.t2}>RHYTHM</span>
              <span className={styles.t3}>VYBE.</span>
            </h1>
            <p className={styles.desc}>
              Real music from real artists. Stream millions of tracks powered by Jamendo — completely free and legal.
            </p>
            <div className={styles.btns}>
              <button className={styles.btnHero} onClick={() => { if (tracks[0]) playSong(tracks[0]); setPage('browse'); }}>
                ▶ Start Listening
              </button>
              <button className={styles.btnGhost} onClick={() => setPage('ai')}>
                🤖 AI Picks
              </button>
            </div>
            <div className={styles.stats}>
              <div><div className={styles.statN}>500K+</div><div className={styles.statL}>Songs</div></div>
              <div><div className={styles.statN}>200K+</div><div className={styles.statL}>Artists</div></div>
              <div><div className={styles.statN}>Free</div><div className={styles.statL}>Always</div></div>
            </div>
          </div>
          <div className={styles.vinylWrap}>
            <div className={`${styles.vinyl} ${isPlaying ? styles.spin : ''}`} />
          </div>
        </div>
      </div>

      {/* FEATURED */}
      <div className={styles.section}>
        <div className={styles.featured} onClick={() => tracks[0] && playSong(tracks[0])}>
          <div className={styles.ftText}>
            <div className={styles.ftTag}>🔥 Featured Now</div>
            <div className={styles.ftTitle}>{tracks[0]?.artist || 'Top Artists'}</div>
            <div className={styles.ftSub}>{tracks[0]?.name || 'Trending worldwide'}</div>
            <button className={styles.btnWh}>▶ Play Now</button>
          </div>
          <div className={styles.ftEmoji}>🎤</div>
        </div>
      </div>

      {/* TRENDING */}
      <div className={styles.section}>
        <div className={styles.secHdr}>
          <h2 className={styles.secTitle}>TRENDING <span>NOW</span></h2>
          <span className={styles.seeAll} onClick={() => setPage('browse')}>See All →</span>
        </div>
        {loading ? (
          <div className={styles.loading}><div className={styles.spinner} /><span>Loading music...</span></div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <div className={styles.grid}>
            {tracks.slice(0, 8).map(t => (
              <SongCard key={t.id} track={t} isActive={currentId === t.id} isPlaying={isPlaying}
                onPlay={playSong} isLiked={isLiked(t.id)} onLike={toggleLike} />
            ))}
          </div>
        )}
      </div>

      {/* PLAYLISTS PREVIEW */}
      <div className={styles.section}>
        <div className={styles.secHdr}>
          <h2 className={styles.secTitle}>YOUR <span>PLAYLISTS</span></h2>
          <span className={styles.seeAll} onClick={() => setPage('playlists')}>See All →</span>
        </div>
        <div className={styles.plGrid}>
          {PLAYLISTS.map(pl => (
            <div key={pl.id} className={styles.plCard} onClick={() => setPage('playlists')}>
              <div className={styles.plCover} style={{ background: pl.gradient }}>{pl.emoji}</div>
              <div className={styles.plInfo}>
                <div className={styles.plName}>{pl.name}</div>
                <div className={styles.plDesc}>{pl.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
