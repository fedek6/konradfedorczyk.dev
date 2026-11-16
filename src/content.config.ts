import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const notes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notes" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    categories: z.array(z.string()).default([]),
  })
});

const articles = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    categories: z.array(z.string()).default([]),
  })
});

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/projects",
    generateId: ({ entry }) =>
      entry
        .replace(/\.(md|mdx)$/i, "")
        .replace(/\/index$/i, "")
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    finished: z.boolean().optional(),
    categories: z.array(z.string()).default([]),
  })
});

export const collections = { notes, articles, projects };
