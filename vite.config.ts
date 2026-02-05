import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
  },
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // Production optimization: remove console and debugger
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    rollupOptions: {
      input: {
        main: 'index.html',
        demo: 'demo.html',
        disclaimer: 'disclaimer.html',
        dpdp: 'dpdp-act.html',
        privacy: 'privacy-policy.html',
        terms: 'terms-conditions.html',
      },
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'genai-vendor': ['@google/genai']
        },
      },
    },
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  }
}));