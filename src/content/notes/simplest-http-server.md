---
title: A dependency-free way to serve files on Linux
description: The fastest way to serve static files via a local web server on Linux without any dependencies
pubDate: 2026-11-13 15:46:20
categories: ["linux", "python", "web development"]
---

Almost every major linux machine has pre-installed python3. So, you don't need to install anything else to serve a local web server.

This one-liner can serve the current directory on port 8080:

```bash
python3 -m http.server 8080
```

If you have an `index.html` file in your current directory, the server serves it as the root page.
