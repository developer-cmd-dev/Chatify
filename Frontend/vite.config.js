import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api/v1': {
        target: 'http://localhost:5000',
        changeOrigin: true, // Ensures the host header is updated to match the target
        rewrite: (path) => path.replace(/^\/api\/v1\/users/, '/api/v1'), // Optional, for more control
      },
    }
  },
  plugins: [react()],
 

})
