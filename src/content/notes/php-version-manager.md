---
title: PHP version manager
description: A way to manage multiple PHP versions on your machine
pubDate: 2026-11-15T15:58:13
categories: ["linux", "PHP", "web development"]
---

I didn't know that at first, but there is an equivalent of Node's <a href="https://github.com/nvm-sh/nvm" target="_blank">NVM</a> for PHP. It is called <a href="https://github.com/phpbrew/phpbrew" target="_blank">phpbrew</a>.

If you need to work with different codebases, here's a way to install it on Arch Linux.

```bash
yay -S phpbrew
```

And example usage:

```bash
phpbrew install 7.4 +default
```
