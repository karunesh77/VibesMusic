import React, { useState, useEffect, useCallback } from 'react';

// Layout components
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Player from './components/Player/Player';

// Pages
import Home from './pages/Home/Home';
import Browse from './pages/Browse/Browse';
import Charts from './pages/Charts/Charts';
import Playlists from './pages/Playlists/Playlists';
import Liked from './pages/Liked/Liked';
import AI from './pages/AI/AI';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

// Hooks
import { usePlayer } from './hooks/usePlayer';
import { useLiked } from './hooks/useLiked';

// API
import { fetchTracks, searchTracks } from './utils/api';

const AUTH_PAGES = ['login', 'signup'];

export default function App() {
  const [page, setPage] = useState('home');
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [genre, setGenre] = useState('All');
  const [searchQ, setSearchQ] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [authUser, setAuthUser] = useState(null);

  const player = usePlayer(tracks);
  const { liked, toggleLike, isLiked } = useLiked();

  // Load tracks on mount
  useEffect(() => {
    loadTracks();
  }, []);

  const loadTracks = async (tag = '', search = '') => {
    setLoading(true); setError(null);
    try {
      const data = await fetchTracks(tag, search);
      setTracks(data);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  const handleGenreChange = (g) => {
    setGenre(g);
    loadTracks(g);
  };

  const handleSearch = useCallback(async (q) => {
    setSearchQ(q);
    if (!q.trim()) { setSearchResults([]); return; }
    try {
      const results = await searchTracks(q);
      setSearchResults(results);
    } catch {}
  }, []);

  const handleLogin = (user) => setAuthUser(user);
  const handleLogout = () => setAuthUser(null);

  // Auth pages — no sidebar/player
  if (AUTH_PAGES.includes(page)) {
    return page === 'login'
      ? <Login onLogin={handleLogin} setPage={setPage} />
      : <Signup onLogin={handleLogin} setPage={setPage} />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar page={page} setPage={setPage} />

      <div style={{ marginLeft: 230, flex: 1, minWidth: 0, paddingBottom: 82 }}>
        <Header
          searchQ={searchQ}
          onSearch={handleSearch}
          setPage={setPage}
          authUser={authUser}
          onLogout={handleLogout}
        />

        {page === 'home' && (
          <Home
            tracks={tracks} loading={loading} error={error}
            playSong={player.playSong} currentId={player.current?.id}
            isPlaying={player.isPlaying} isLiked={isLiked}
            toggleLike={toggleLike} setPage={setPage}
          />
        )}
        {page === 'browse' && (
          <Browse
            tracks={tracks} searchResults={searchResults} searchQ={searchQ}
            loading={loading} genre={genre} onGenreChange={handleGenreChange}
            currentId={player.current?.id} isPlaying={player.isPlaying}
            playSong={player.playSong} isLiked={isLiked} toggleLike={toggleLike}
          />
        )}
        {page === 'charts' && (
          <Charts
            tracks={tracks} loading={loading}
            currentId={player.current?.id} playSong={player.playSong}
          />
        )}
        {page === 'playlists' && <Playlists />}
        {page === 'liked' && (
          <Liked
            tracks={tracks} liked={liked}
            currentId={player.current?.id} isPlaying={player.isPlaying}
            playSong={player.playSong} isLiked={isLiked} toggleLike={toggleLike}
          />
        )}
        {page === 'ai' && (
          <AI
            tracks={tracks} currentId={player.current?.id}
            isPlaying={player.isPlaying} playSong={player.playSong}
            isLiked={isLiked} toggleLike={toggleLike}
          />
        )}
      </div>

      <Player
        {...player}
        isLiked={isLiked}
        toggleLike={toggleLike}
        onTimeUpdate={player.onTimeUpdate}
        onEnded={player.onEnded}
      />
    </div>
  );
}
