import { mapItunesTrack } from './helpers';

const BASE = 'https://itunes.apple.com';

const GENRE_TERMS = {
  'All': 'top hits',
  'Electronic': 'electronic music',
  'Rock': 'rock',
  'Pop': 'pop',
  'Hip-Hop': 'hip hop',
  'Jazz': 'jazz',
  'Classical': 'classical',
  'Ambient': 'ambient',
};

export async function fetchTracks(tag = '', search = '') {
  const term = search || GENRE_TERMS[tag] || 'top hits';
  const url = `${BASE}/search?term=${encodeURIComponent(term)}&media=music&entity=song&limit=24`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.results?.length) throw new Error('No tracks found.');
  return data.results.filter(t => t.previewUrl).map(mapItunesTrack);
}

export async function searchTracks(query) {
  const url = `${BASE}/search?term=${encodeURIComponent(query)}&media=music&entity=song&limit=16`;
  const res = await fetch(url);
  const data = await res.json();
  return (data.results || []).filter(t => t.previewUrl).map(mapItunesTrack);
}