import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': '/src',
    },
  },
  server: {
    proxy: {
      '/bbc': {
        target: 'http://feeds.bbci.co.uk',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/bbc/, '')
      },
      '/football-api': {
        target: 'http://www.football-data.co.uk',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/football-api/, '')
      },
      '/therapy-api': {
        target: 'https://tboxapps.therapy-box.co.uk',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/therapy-api/, '')
      }
    }
  }
})