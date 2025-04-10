import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    proxy: {
      '/edventure': {
        target: 'https://vzxnxn5t-8000.inc1.devtunnels.ms',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
