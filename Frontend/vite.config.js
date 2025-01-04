import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import { defineConfig } from "vite"



// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api/v1':'http://localhost:3002'
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
 

})
