import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/FrontLaravel/frontend/',
  server: {
    proxy: {
      '/api': {
        target: 'https://132.226.9.151/FrontLaravel/backend/public/', // LaravelサーバーのURL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
