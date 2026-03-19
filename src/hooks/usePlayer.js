import { useState, useEffect, useRef, useCallback } from 'react';

export function usePlayer(tracks) {
  const audioRef = useRef(null);
  const [current, setCurrent] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const playSong = useCallback((track) => {
    if (!track?.audio) return;
    if (current?.id === track.id) {
      if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
      else { audioRef.current.play(); setIsPlaying(true); }
      return;
    }
    setCurrent(track);
    setIsPlaying(false);
    setProgress(0);
  }, [current, isPlaying]);

  useEffect(() => {
    if (!current?.audio || !audioRef.current) return;
    audioRef.current.src = current.audio;
    audioRef.current.volume = volume;
    audioRef.current.play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [current]);

  const skipNext = useCallback(() => {
    if (!tracks.length) return;
    const idx = tracks.findIndex(t => t.id === current?.id);
    const next = shuffle
      ? Math.floor(Math.random() * tracks.length)
      : (idx + 1) % tracks.length;
    playSong(tracks[next]);
  }, [tracks, current, shuffle, playSong]);

  const skipPrev = useCallback(() => {
    if (!tracks.length) return;
    const idx = tracks.findIndex(t => t.id === current?.id);
    playSong(tracks[(idx - 1 + tracks.length) % tracks.length]);
  }, [tracks, current, playSong]);

  const togglePlay = () => {
    if (!current) return;
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else { audioRef.current.play(); setIsPlaying(true); }
  };

  const seekTo = (e, ref) => {
    if (!audioRef.current || !ref?.current || !duration) return;
    const rect = ref.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audioRef.current.currentTime = pct * duration;
  };

  const onTimeUpdate = () => {
    if (!audioRef.current) return;
    setProgress(audioRef.current.currentTime);
    setDuration(audioRef.current.duration || 0);
  };

  const onEnded = () => {
    if (repeat) { audioRef.current.currentTime = 0; audioRef.current.play(); }
    else skipNext();
  };

  return {
    audioRef, current, isPlaying, progress, duration,
    volume, setVolume, shuffle, setShuffle, repeat, setRepeat,
    playSong, togglePlay, skipNext, skipPrev, seekTo,
    onTimeUpdate, onEnded,
  };
}
