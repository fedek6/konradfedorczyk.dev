// @ts-nocheck
import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import { satteri } from "@astrojs/markdown-satteri";
import { defineHastPlugin } from "satteri";

import favicons from "astro-favicons";
import { readFile } from "fs/promises";

const SITE_URL = process.env.SITE_URL ?? "https://konradfedorczyk.dev";

const tocObservePlugin = defineHastPlugin({
  name: "toc-observe",
  element: {
    filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
    visit(node, ctx) {
      ctx.setProperty(node, "data-toc-observe", true);
    },
  },
});

const copyButtonNode = {
  type: "element",
  tagName: "button",
  properties: {
    type: "button",
    "data-copy-button": true,
    "data-copied": "false",
    "aria-label": "Copy code",
    title: "Copy code",
  },
  children: [
    {
      type: "element",
      tagName: "span",
      properties: {},
      children: [{ type: "text", value: "Copy code" }],
    },
  ],
};

const copyButtonWrapperNode = {
  type: "element",
  tagName: "div",
  properties: {
    className: "copy-button-wrapper",
  },
  children: [copyButtonNode],
};

// Wrap each highlighted <pre> in a container div so a copy button can live
// *below* it as a sibling. Using a Shiki transformer (instead of a HAST
// plugin) is required because Satteri's highlight pass replaces the <pre>
// it styles, which silently drops in-place child insertion / return-replace
// from a HAST visitor that runs later in the same chain.
const copyButtonTransformer = {
  pre(hast) {
    if (hast.properties?.["data-code-wrapper"] ?? false) {
      return hast;
    }
    return {
      type: "element",
      tagName: "div",
      properties: { "data-code-wrapper": true },
      children: [copyButtonWrapperNode, hast],
    };
  },
};

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
        light: "nord",
        dark: "vitesse-dark",
      },
      transformers: [copyButtonTransformer],
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

  integrations: [
    mdx({ optimize: false }),
    favicons({
      input: {
        favicons: [
          // "public/favicon.svg",
          await readFile("src/assets/head3d-preview.png"),
        ], // select best source image by its size
        // Add other platform-specific sources if needed.
      },
      pixel_art: true,
    }),
  ],
});
