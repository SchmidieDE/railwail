// frontend/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../../static',
    assetsDir: 'assets',

  },
  base: '/static/',  // This is important - matches Django's STATIC_URL
})