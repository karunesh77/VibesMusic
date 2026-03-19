import React from 'react';
import { PLAYLISTS } from '../../data/constants';
import styles from './Playlists.module.css';

export default function Playlists() {
  return (
    <div>
      <div className={styles.pageHdr}>
        <h1 className={styles.pageTitle}>Your Playlists</h1>
        <p className={styles.pageSub}>Your personal music collections</p>
      </div>
      <div className={styles.section}>
        <div className={styles.grid}>
          {PLAYLISTS.map(pl => (
            <div key={pl.id} className={styles.card}>
              <div className={styles.cover} style={{ background: pl.gradient }}>{pl.emoji}</div>
              <div className={styles.info}>
                <div className={styles.name}>{pl.name}</div>
                <div className={styles.desc}>{pl.desc}</div>
                <div className={styles.count}>📀 {Math.floor(Math.random() * 15) + 4} songs</div>
              </div>
            </div>
          ))}
          <div className={styles.create} onClick={() => alert('Create playlist — coming soon!')}>
            <div className={styles.createIcon}>➕</div>
            <div className={styles.createTxt}>New Playlist</div>
          </div>
        </div>
      </div>
    </div>
  );
}
