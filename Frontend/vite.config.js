import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"



// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api/v1':'http://localhost:5003'
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['@ffmpeg/ffmpeg'],
  },
 

})
