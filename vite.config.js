import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	optimizeDeps: {
    include: ['react', 'react-dom']
  },
  ssr: {
    noExternal: ['framer-motion'] // Kalau pakai framer-motion
  }
});
