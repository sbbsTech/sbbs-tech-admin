import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  build: {
    // Output the built frontend into the backend folder
    // so the FastAPI app can serve it directly.
    outDir: '../backend/app/static',
    emptyOutDir: true,
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
      ],
    },
  },
})
