import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
  root: 'front',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./front/src', import.meta.url))
    },
    dedupe: ['react', 'react-dom', 'react-router-dom']
  }
})
