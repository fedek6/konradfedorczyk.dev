// @ts-check
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://konradfedorczyk.dev",
  output: "static",
  fonts: [
    {
      name: "Hanken Grotesk",
      cssVariable: "--hanken-grotesk",
      provider: fontProviders.google(),
      weights: [400, 600] ,
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
      formats: ["woff2"],
    },
  ],
});
