import fs from 'fs';
import path from 'path';

const CODING_JSON_PATH = 'C:/Projects/My Portfolio/dev-emran/public/Coding.json';

async function main() {
  console.log('Loading Coding.json...');
  const lottie = JSON.parse(fs.readFileSync(CODING_JSON_PATH, 'utf8'));

  // Define the 8 SVGs
  const svgUrls = {
    html: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
    css: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
    js: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    react: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    tailwind: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
    nextjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
    postgres: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  };

  const svgData = {};
  for (const [key, url] of Object.entries(svgUrls)) {
    console.log(`Fetching ${key}...`);
    const res = await fetch(url);
    svgData[key] = await res.text();
  }

  // Custom Express badge with clean white circle background and border for visibility in dark/light mode
  svgData.express = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <circle cx="64" cy="64" r="62" fill="#ffffff" stroke="#cbd5e1" stroke-width="4"/>
    <path fill="#0f172a" d="M110 88c-4 1-6.5 0-8.8-3.3-5-7.5-10.5-14.7-16-22-0.7-1-1.4-1.9-2.3-3C77 68 70.6 76.3 64.7 84.8c-2.1 3-4.3 4.3-8.3 3.3L80 56.2 61.4 30c3.8-.7 6.4-.3 8.7 3 5.1 7.5 10.8 14.7 16.5 22.3 5.7-7.5 11.3-14.7 16.6-22.2 2.1-3 4.4-4.2 8.2-3.1-2.9 3.8-5.7 7.6-8.6 11.4-3.8 5-7.6 10.2-11.6 15.1-1.4 1.8-1.2 2.9.1 4.6 7.9 10.8 15.2 20.6 22.7 26.9zM2.8 55.6c.6-3.2 1-6.4 1.9-9.6 5.3-19 27-26.8 42-15.1 9.8 7.7 12 17.4 11.5 28.3H7.9c-.7 19.6 13.4 31.5 31.4 25.4 6.3-2.1 10-7.1 11.9-13.3 1-3.1 2.5-3.6 5.4-2.7-1.5 7.7-4.9 14.2-12 18.2-10.6 6-25.7 4.1-33.7-4.3-5-5.5-7-11.7-7.9-18.3-.1-1-.4-2.1-.6-3.2 0-2.5 0-5.1.4-7.4zm5.2-1.3h44.6c-.3-14.2-9.1-24.3-21.2-24.4-13.3-.1-22.8 9.7-23.4 24.4z"/>
  </svg>`;

  // Mapping parent layers to their new icon
  // Arc order from left to right:
  // 1. ae (156) -> express
  // 2. Ai (155) -> postgres
  // 3. ps (154) -> nextjs
  // 4. js (153) -> js
  // 5. xd (152) -> tailwind
  // 6. html-5 (151) -> html
  // 7. css-3 (150) -> css
  // 8. react (149) -> react
  const iconConfig = [
    { parentNm: 'ae', key: 'express', name: 'Express.js', w: 52, h: 52, scale: 90 },
    { parentNm: 'Ai', key: 'postgres', name: 'PostgreSQL', w: 52, h: 52, scale: 95 },
    { parentNm: 'ps', key: 'nextjs', name: 'Next.js', w: 52, h: 52, scale: 90 },
    { parentNm: 'js', key: 'js', name: 'JavaScript', w: 52, h: 52, scale: 90 },
    { parentNm: 'xd', key: 'tailwind', name: 'Tailwind CSS', w: 52, h: 52, scale: 95 },
    { parentNm: 'html-5', key: 'html', name: 'HTML5', w: 52, h: 52, scale: 90 },
    { parentNm: 'css-3', key: 'css', name: 'CSS3', w: 52, h: 52, scale: 90 },
    { parentNm: 'react', key: 'react', name: 'React', w: 52, h: 52, scale: 95 },
  ];

  lottie.assets = lottie.assets || [];

  // Remove existing icon assets if any
  const newAssetIds = iconConfig.map(c => `asset_icon_${c.key}`);
  lottie.assets = lottie.assets.filter(a => !newAssetIds.includes(a.id));

  // Add new SVG assets as Base64 Data URLs
  for (const config of iconConfig) {
    const rawSvg = svgData[config.key];
    const b64 = Buffer.from(rawSvg).toString('base64');
    lottie.assets.push({
      id: `asset_icon_${config.key}`,
      w: config.w,
      h: config.h,
      u: '',
      p: `data:image/svg+xml;base64,${b64}`,
      e: 1,
    });
  }

  // Find all child layers of these 8 parents
  const parentLayers = iconConfig.map(c => lottie.layers.find(l => l.nm === c.parentNm)).filter(Boolean);
  const parentInds = parentLayers.map(p => p.ind);

  console.log('Parent Inds:', parentInds);

  // Filter out the old child vector layers of these parents
  const oldChildCount = lottie.layers.filter(l => l.parent && parentInds.includes(l.parent)).length;
  console.log(`Removing ${oldChildCount} old icon vector child layers...`);

  const preservedLayers = lottie.layers.filter(l => !(l.parent && parentInds.includes(l.parent)));

  // Generate new clean image layers for each icon
  // We'll give them unique indexes
  let maxInd = Math.max(...lottie.layers.map(l => l.ind || 0));

  const newLayers = [];
  for (const config of iconConfig) {
    const parentLayer = lottie.layers.find(l => l.nm === config.parentNm);
    if (!parentLayer) {
      console.warn(`Parent ${config.parentNm} not found!`);
      continue;
    }

    maxInd++;
    const halfW = config.w / 2;
    const halfH = config.h / 2;

    const layer = {
      ddd: 0,
      ind: maxInd,
      ty: 2, // Image Layer
      nm: `${config.name} Icon`,
      refId: `asset_icon_${config.key}`,
      sr: 1,
      parent: parentLayer.ind,
      ks: {
        o: { a: 0, k: 100, ix: 11 },
        r: { a: 0, k: 0, ix: 10 },
        p: { a: 0, k: [0, 0, 0], ix: 2 },
        a: { a: 0, k: [halfW, halfH, 0], ix: 1 }, // Center anchor point
        s: { a: 0, k: [config.scale, config.scale, 100], ix: 6 },
      },
      ao: 0,
      ip: parentLayer.ip,
      op: parentLayer.op,
      st: parentLayer.st || 0,
      bm: 0,
    };

    newLayers.push(layer);
  }

  // Insert newLayers right next to the parents in the layer array
  // In Bodymovin, layer render order is bottom to top or top to bottom.
  // We place child layers just above or below their parents.
  const finalLayers = [...preservedLayers, ...newLayers];
  lottie.layers = finalLayers;

  console.log(`Writing updated Coding.json (Total layers: ${finalLayers.length}, Assets: ${lottie.assets.length})...`);
  fs.writeFileSync(CODING_JSON_PATH, JSON.stringify(lottie));
  console.log('🎉 Successfully updated Coding.json with stack icons!');
}

main().catch(console.error);
