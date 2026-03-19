import React from 'react';
import { NAV_ITEMS, PLAYLISTS } from '../../data/constants';
import styles from './Sidebar.module.css';

export default function Sidebar({ page, setPage }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo} onClick={() => setPage('home')}>VYBE</div>

      <div className={styles.section}>
        <div className={styles.label}>Menu</div>
        {NAV_ITEMS.map(n => (
          <div
            key={n.id}
            className={`${styles.navItem} ${page === n.id ? styles.active : ''}`}
            onClick={() => setPage(n.id)}
          >
            <span className={styles.icon}>{n.icon}</span>
            {n.label}
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <div className={styles.label}>Playlists</div>
        {PLAYLISTS.map(pl => (
          <div key={pl.id} className={styles.plMini} onClick={() => setPage('playlists')}>
            <div className={styles.plCover} style={{ background: pl.gradient }}>{pl.emoji}</div>
            <span className={styles.plName}>{pl.name}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
