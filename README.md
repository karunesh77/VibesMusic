# 🎵 VYBE Music App

A bold, colorful music streaming web app with a clean folder-based architecture.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header/          # Top search bar + auth buttons
│   ├── Sidebar/         # Left navigation
│   ├── Player/          # Bottom music player bar
│   └── SongCard/        # Song card (grid + list mode)
├── pages/               # One folder per page
│   ├── Home/            # Landing + trending + playlists
│   ├── Browse/          # Genre filter + song list
│   ├── Charts/          # Top songs ranked
│   ├── Playlists/       # Playlist collections
│   ├── Liked/           # Liked songs
│   ├── AI/              # Claude AI recommendations
│   ├── Login/           # Login form
│   └── Signup/          # Signup form
├── hooks/               # Custom React hooks
│   ├── usePlayer.js     # Audio player logic
│   └── useLiked.js      # Like/unlike logic
├── utils/               # Helper utilities
│   ├── api.js           # Jamendo API calls
│   └── helpers.js       # Format functions
├── data/                # Constants & config
│   └── constants.js
├── styles/              # Global CSS
│   └── global.css
├── App.jsx              # Root — routing only
└── main.jsx             # Entry point
```

## 🚀 Quick Start

```bash
npm install
npm run dev
```
Opens at → http://localhost:5173

## ✨ Features
- 🎵 Real music streaming via Jamendo API
- 🔍 Live search
- 🎸 Genre filtering
- 🏆 Charts
- ❤️ Like songs
- 🤖 AI recommendations (Claude)
- 🔐 Login & Signup pages
- ▶️ Full player (play, skip, seek, shuffle, repeat, volume)

## 🛠 Tech Stack
- React 18 + Vite
- CSS Modules (scoped styles per component)
- Jamendo API (music)
- Anthropic Claude API (AI)
