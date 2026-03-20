import React, { useState } from 'react';
import SongCard from '../../components/SongCard/SongCard';
import { MOODS, ANTHROPIC_MODEL } from '../../data/constants';
import styles from './AI.module.css';

export default function AI({ tracks, currentId, isPlaying, playSong, isLiked, toggleLike }) {
  const [mood, setMood] = useState('');
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    const q = prompt || (mood ? `Recommend music for mood: ${mood}` : '');
    if (!q) return;
    setLoading(true); setResult('');
    try {
      const trackList = tracks.slice(0, 8).map(t => `"${t.name}" by ${t.artist}`).join(', ');
      // NOTE: Direct browser calls to Anthropic API will fail due to CORS. 
      // This should be handled via a backend proxy for security and consistency.
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Anthropic-Version': '2023-06-01',
          'x-api-key': 'MISSING_API_KEY' // TODO: Move to backend
        },
        body: JSON.stringify({
          model: ANTHROPIC_MODEL,
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `You are VYBE, a music recommendation AI. User says: "${q}". Available tracks: ${trackList}. Give a warm, enthusiastic 3-4 sentence recommendation mentioning 2-3 tracks from the list if relevant. Be conversational.`,
          }],
        }),
      });
      if (!res.ok) throw new Error('API request failed');
      const d = await res.json();
      setResult(d.content?.find(c => c.type === 'text')?.text || 'Try again!');
    } catch { 
      setResult('AI setup required. For security, AI features need a backend proxy on Vercel.'); 
    }
    setLoading(false);
  };

  const suggested = [...tracks].sort(() => Math.random() - 0.5).slice(0, 6);

  return (
    <div>
      <div className={styles.pageHdr}>
        <h1 className={styles.pageTitle}>🤖 AI Recommendations</h1>
        <p className={styles.pageSub}>Powered by Claude AI — your personal music curator</p>
      </div>
      <div className={styles.section}>
        <div className={styles.aiBox}>
          <div className={styles.aiHdr}>
            <div className={styles.aiIcon}>🤖</div>
            <div>
              <div className={styles.aiTitle}>VYBE AI</div>
              <div className={styles.aiSub}>Tell me your mood or what you're looking for</div>
            </div>
          </div>

          <div className={styles.moodChips}>
            {MOODS.map(m => (
              <button key={m} className={`${styles.mc} ${mood === m ? styles.on : ''}`}
                onClick={() => { setMood(m); setPrompt(''); }}>
                {m}
              </button>
            ))}
          </div>

          <div className={styles.inputRow}>
            <input
              className={styles.input}
              placeholder='Or type your vibe... e.g. "music for a rainy evening drive"'
              value={prompt}
              onChange={e => { setPrompt(e.target.value); setMood(''); }}
              onKeyDown={e => e.key === 'Enter' && askAI()}
            />
            <button className={styles.btnAI} onClick={askAI} disabled={loading || (!mood && !prompt)}>
              {loading ? '...' : '✨ Ask AI'}
            </button>
          </div>

          {(loading || result) && (
            <div className={styles.result}>
              <div className={styles.resultLbl}>✨ VYBE AI Says</div>
              {loading
                ? <div className={styles.dots}><div className={styles.dot} /><div className={styles.dot} /><div className={styles.dot} /></div>
                : <div className={styles.resultTxt}>{result}</div>
              }
            </div>
          )}
        </div>

        {tracks.length > 0 && (
          <div className={styles.suggestWrap}>
            <div className={styles.secHdr}>
              <h2 className={styles.secTitle}>PICKS <span>FOR YOU</span></h2>
            </div>
            <div className={styles.grid}>
              {suggested.map(t => (
                <SongCard key={t.id} track={t} isActive={currentId === t.id} isPlaying={isPlaying}
                  onPlay={playSong} isLiked={isLiked(t.id)} onLike={toggleLike} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
