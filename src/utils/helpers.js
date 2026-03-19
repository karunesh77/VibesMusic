import { EMOJIS, COLORS } from '../data/constants';

export function fmtTime(s) {
  if (!s || isNaN(s)) return '0:00';
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}

export function fmtNum(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n;
}

export function mapItunesTrack(t, i) {
  return {
    id: t.trackId,
    name: t.trackName,
    artist: t.artistName,
    cover: t.artworkUrl100?.replace('100x100', '300x300') || null,
    emoji: EMOJIS[i % EMOJIS.length],
    audio: t.previewUrl,  // direct 30sec MP3 — no CORS!
    dur: fmtTime(30),
    secs: 30,
    likes: Math.floor(Math.random() * 50000) + 1000,
    genre: t.primaryGenreName || 'Music',
    color: COLORS[i % COLORS.length],
  };
}

// keep old one too just in case
export function mapTrack(t, i) {
  return mapItunesTrack(t, i);
}