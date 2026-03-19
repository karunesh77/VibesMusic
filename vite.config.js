import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/jamendo': {
        target: 'https://api.jamendo.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/jamendo/, ''),
      },
    },
  },
})