import { defineConfig } from 'astro/config';
import { astroImageTools } from 'astro-imagetools';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog-template-gray.vercel.app/', // Write here your website url
  integrations: [astroImageTools, preact(), tailwind(), react()],
  redirects: {
    '/posts/page/1': '/posts/page/',
  },
});
