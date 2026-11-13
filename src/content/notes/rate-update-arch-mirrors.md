---
title: Automatically rate and update Arch mirrors
description: This is my first Astro blog
pubDate: 2026-11-13 13:10:20
categories: ["linux", "arch"]
---

Want to speed up package downloads in Arch Linux? A great way to do this is by using the <a href="https://wiki.archlinux.org/title/Reflector" target="_blank">Reflector</a> script to automatically update your `mirrorlist`.

```bash
sudo reflector \
--latest 20 \
--protocol https \
--sort rate \
--save /etc/pacman.d/mirrorlist
```

Once the process is complete, you will have a new set of mirrors optimized for your location.

