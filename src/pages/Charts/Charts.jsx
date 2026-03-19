import React from 'react';
import { fmtNum } from '../../utils/helpers';
import styles from './Charts.module.css';

export default function Charts({ tracks, loading, currentId, playSong }) {
  const sorted = [...tracks].sort((a, b) => b.likes - a.likes);
  const max = sorted[0]?.likes || 1;

  return (
    <div>
      <div className={styles.pageHdr}>
        <h1 className={styles.pageTitle}>🏆 Top Charts</h1>
        <p className={styles.pageSub}>Most loved tracks right now</p>
      </div>
      <div className={styles.section}>
        {loading ? (
          <div className={styles.loading}><div className={styles.spinner} /></div>
        ) : sorted.map((t, i) => {
          const rankCls = i === 0 ? styles.r1 : i === 1 ? styles.r2 : i === 2 ? styles.r3 : styles.rn;
          return (
            <div key={t.id} className={`${styles.item} ${currentId === t.id ? styles.active : ''}`} onClick={() => playSong(t)}>
              <div className={`${styles.rank} ${rankCls}`}>{i + 1}</div>
              <div className={styles.cover} style={{ background: `${t.color}22` }}>
                {t.cover ? <img src={t.cover} alt="" /> : t.emoji}
              </div>
              <div className={styles.info}>
                <div className={styles.name}>{t.name}</div>
                <div className={styles.artist}>{t.artist}</div>
              </div>
              <div className={styles.barWrap}>
                <div className={styles.barBg}>
                  <div className={styles.barFill} style={{ width: `${(t.likes / max) * 100}%` }} />
                </div>
                <div className={styles.plays}>♥ {fmtNum(t.likes)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
