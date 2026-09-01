## Development

Dev server requires background mode:

```
astro dev --background
```

Manage with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Node >= 22.12.0 required (see `engines` in package.json).

## Content

Blog notes live in `src/content/notes/` as `.md` or `.mdx` files. Each file must have `title`, `description`, and `pubDate` frontmatter. No new collection types should be added without also updating `src/content.config.ts`.

Site categories are defined in `src/config/meta.ts`.

## Architecture notes

- Site is a fully static Astro build (`output: "static"` in astro.config.mjs)
- CSS stylesheets are SCSS partials that feed into the site's light/dark theme system
- Theme toggle state uses nanostores stores in `src/stores/themeStore.ts` and `src/stores/menuStore.ts`
- The 3D head component lives in `src/components/3d/Head3D/` (three.js)
- All styles are inlined at build time (`inlineStylesheets: 'always'`)
