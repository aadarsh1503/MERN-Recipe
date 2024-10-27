import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Change the output directory from 'dist' to 'build'
    sourcemap: true, // Enable sourcemaps if needed for debugging
    rollupOptions: {
      // Customize Rollup options if necessary
      output: {
        manualChunks: {
          // Separate vendor files, if needed
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
})
