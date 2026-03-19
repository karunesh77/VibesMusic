import React from 'react';
import styles from './Header.module.css';

export default function Header({ onSearch, searchQ, setPage, authUser, onLogout }) {
  return (
    <header className={styles.topbar}>
      <div className={styles.searchWrap}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          className={styles.searchInput}
          placeholder="Search songs, artists..."
          value={searchQ}
          onChange={e => { onSearch(e.target.value); if (e.target.value) setPage('browse'); }}
        />
      </div>
      <div className={styles.right}>
        <button className={styles.btnAI} onClick={() => setPage('ai')}>🤖 AI Picks</button>
        {authUser ? (
          <div className={styles.userMenu}>
            <div className={styles.avatar}>{authUser.name[0].toUpperCase()}</div>
            <div className={styles.dropdown}>
              <span className={styles.dropName}>{authUser.name}</span>
              <button className={styles.dropLogout} onClick={onLogout}>Log Out</button>
            </div>
          </div>
        ) : (
          <div className={styles.authBtns}>
            <button className={styles.btnLogin} onClick={() => setPage('login')}>Log In</button>
            <button className={styles.btnSignup} onClick={() => setPage('signup')}>Sign Up</button>
          </div>
        )}
      </div>
    </header>
  );
}
