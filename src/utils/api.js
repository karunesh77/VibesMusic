import { JAMENDO_ID } from '../data/constants';
import { mapTrack } from './helpers';

// Uses Vite proxy — no CORS issues!
const JAMENDO_BASE = '/jamendo/v3.0';

export async function fetchTracks(tag = '', search = '') {
  let url = `${JAMENDO_BASE}/tracks/?client_id=${JAMENDO_ID}&format=json&limit=24&include=musicinfo&audioformat=mp32&imagesize=200`;
  if (search) url += `&namesearch=${encodeURIComponent(search)}`;
  else if (tag && tag !== 'All') url += `&tags=${encodeURIComponent(tag.toLowerCase())}`;
  else url += `&order=popularity_total`;

  const res = await fetch(url);
  const data = await res.json();
  if (!data.results?.length) throw new Error('No tracks found.');
  return data.results.map(mapTrack);
}

export async function searchTracks(query) {
  const url = `${JAMENDO_BASE}/tracks/?client_id=${JAMENDO_ID}&format=json&limit=16&include=musicinfo&audioformat=mp32&imagesize=200&namesearch=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  const data = await res.json();
  return (data.results || []).map(mapTrack);
}