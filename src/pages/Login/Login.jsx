import React, { useState } from 'react';
import styles from './Login.module.css';

export default function Login({ onLogin, setPage }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return; }
    // Demo login — replace with real auth
    onLogin({ name: form.email.split('@')[0], email: form.email });
    setPage('home');
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>VYBE</div>
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.sub}>Log in to continue vibing 🎧</p>

        {error && <div className={styles.error}>{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button className={styles.btnSubmit} type="submit">Log In</button>
        </form>

        <p className={styles.switch}>
          Don't have an account?{' '}
          <span className={styles.link} onClick={() => setPage('signup')}>Sign Up</span>
        </p>
        <p className={styles.guest} onClick={() => setPage('home')}>Continue as Guest →</p>
      </div>
    </div>
  );
}
