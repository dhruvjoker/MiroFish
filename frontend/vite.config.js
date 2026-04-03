import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@locales': path.resolve(__dirname, '../locales')
    }
  },
  server: {
    // 1. Change port to 7860 for Hugging Face
    port: 7860, 
    host: '0.0.0.0',
    // 2. Disable 'open' to stop the xdg-open error
    open: false, 
    // 3. Allow Hugging Face hosts
    allowedHosts: [
      'dhruvcant-microfish-simulator.hf.space',
      '.hf.space'
    ],
    proxy: {
      '/api': {
        // 4. Ensure this matches your backend port (usually 5000 or 5001)
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
