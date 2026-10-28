// @ts-check
import { defineConfig, fontProviders } from "astro/config";
const SITE_URL = process.env.SITE_URL ?? "https://konradfedorczyk.dev";

import mdx from "@astrojs/mdx";
import { satteri } from "@astrojs/markdown-satteri";
import { defineHastPlugin } from "satteri";

const tocObservePlugin = defineHastPlugin({
  name: "toc-observe",
  element: {
    filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
    visit(node, ctx) {
      ctx.setProperty(node, "data-toc-observe", true);
    },
  },
});

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  output: "static",

  build: {
    inlineStylesheets: "always",
  },

  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
      config: {
        limitInputPixels: false,
      },
    },
    breakpoints: [640, 768, 1024, 1280, 2048],
    layout: "constrained",
  },

  markdown: {
    processor: satteri({
      hastPlugins: [tocObservePlugin],
    }),
    shikiConfig: {
      themes: {
        light: 'nord',
        dark: 'vitesse-dark',
      },
    },
  },

  fonts: [
    {
      name: "Hanken Grotesk",
      cssVariable: "--hanken-grotesk",
      provider: fontProviders.google(),
      weights: [400, 600],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
      formats: ["woff2"],
    },
  ],

  integrations: [mdx({ optimize: false })],
});
