import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: './', // Убедись, что корень — текущая папка
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './index.html' // Путь к index.html
    }
  }
})
