---
title: Ollama server on Arch (with Blackwell)
description: This guide will help you to setup Ollama on Arch Linux
pubDate: 2026-11-15T17:11:24
categories: ["linux", "nvcc", "cuda", "ai"]
---

First you'll need to <a href="notes/cuda-support-rtx5090/">setup CUDA on your machine</a>.

Then use CUDA version of Ollama:

```bash
yay -Syu ollama-cuda
```

You can reconfigure server:

```bash
sudo nano /etc/systemd/system/multi-user.target.wants/ollama.service
```

My config looks like this:

```bash
[Unit]
Description=Ollama Service
Wants=network-online.target
After=network.target network-online.target

[Service]
ExecStart=/usr/bin/ollama serve
WorkingDirectory=/var/lib/ollama
Environment="HOME=/var/lib/ollama"
Environment="OLLAMA_MODELS=/var/lib/ollama"
User=ollama
Group=ollama
Restart=on-failure
RestartSec=3
RestartPreventExitStatus=1
Type=simple
PrivateTmp=yes
ProtectSystem=full
ProtectHome=yes

# Keep model in memory
Environment="OLLAMA_KEEP_ALIVE=20m"
# Listen on all interfaces
Environment="OLLAMA_HOST=0.0.0.0"
# Default context length
Environment="OLLAMA_CONTEXT_LENGTH=8192"
# Quantization of context
Environment="OLLAMA_KV_CACHE_TYPE=q8_0"
# Faster, more memory-efficient way of computing the attention step.
Environment="OLLAMA_FLASH_ATTENTION=1"

[Install]
WantedBy=multi-user.target
```

Restart:

```bash 
sudo systemctl daemon-reload && \
    sudo systemctl restart ollama
```