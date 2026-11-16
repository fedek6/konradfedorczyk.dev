---
title: CUDA support on Arch Linux
description: How to install CUDA on Arch Linux
pubDate: 2026-11-15T17:02:27
categories: ["linux", "nvcc", "cuda", "ai"]
---

Tu run CUDA with Blackwell architecture (RTX 5090) you'll need to install following packages:

```bash
sudo pacman -Syu \
  nvidia-open-dkms \
  nvidia-utils \
  linux-headers \
  cuda
```

This will give you a toolset to develop CUDA code (nvcc, nvidia-smi etc.).
