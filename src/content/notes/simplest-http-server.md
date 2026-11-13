---
title: Simplest way to serve a local web server
description: This is my first Astro blog
pubDate: 2026-11-13 15:46:20
categories: ["linux", "python", "web development"]
---

This one-liner can serve the current directory on port 8080:

```bash
python3 -m http.server 8080
```

If you have an `index.html` file in your current directory, the server serves it as the root page.