import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config

export default defineConfig({
  adapter: cloudflare(),
  output: "server",
  integrations: [react(), tailwind],
  vite: {
    build: {
      rollupOptions: {
        external: ["@contentful"], // Exclude unnecessary libraries
      },
    },
  },
});