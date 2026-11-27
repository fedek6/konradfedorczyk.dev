import { Cloudflare } from 'cloudflare';

const cf = new Cloudflare({ apiToken: process.env.CLOUDFLARE_API_TOKEN });

const res = await cf.cache.purge({
  zone_id: process.env.CLOUDFLARE_ZONE_ID,
  purge_everything: true,
});

console.log('✅ Cloudflare cache purged');
