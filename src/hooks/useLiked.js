import { useState } from 'react';

export function useLiked() {
  const [liked, setLiked] = useState(new Set());

  const toggleLike = (id) => {
    setLiked(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const isLiked = (id) => liked.has(id);

  return { liked, toggleLike, isLiked };
}
