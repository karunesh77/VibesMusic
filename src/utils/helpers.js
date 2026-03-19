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

export function mapTrack(t, i) {
  return {
    id: t.id,
    name: t.name,
    artist: t.artist_name,
    cover: t.image || null,
    emoji: EMOJIS[i % EMOJIS.length],
    audio: t.audio || null,  // direct MP3 URL, no proxy needed
    dur: fmtTime(t.duration),
    secs: t.duration,
    likes: Math.floor(Math.random() * 50000) + 1000,
    genre: t.musicinfo?.tags?.genres?.[0] || 'Music',
    color: COLORS[i % COLORS.length],
  };
}