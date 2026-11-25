import fs from 'node:fs';
import path from 'node:path';
import { canonicalPaths, legacyRedirects, rootDir, siteUrl } from './shared.mjs';

const publicDir = path.join(rootDir, 'public');
fs.mkdirSync(publicDir, { recursive: true });

const escapeXml = (value) =>
  value.replace(/[<>&"']/g, (character) => {
    const entities = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '"': '&quot;',
      "'": '&apos;',
    };
    return entities[character];
  });

const lastmod = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${canonicalPaths
  .map(
    (route) => `  <url>
    <loc>${escapeXml(`${siteUrl}${route}`)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.7'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);

fs.writeFileSync(
  path.join(publicDir, 'robots.txt'),
  `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`,
);

const netlifyRedirects = [
  ...legacyRedirects.flatMap(([from, to]) => [
    `${from}  ${to}  301`,
    `${from}/  ${to}  301`,
  ]),
  '/*  /index.html  200',
  '',
].join('\n');

fs.writeFileSync(path.join(publicDir, '_redirects'), netlifyRedirects);

const vercelConfig = {
  redirects: legacyRedirects.flatMap(([source, destination]) => [
    { source, destination, permanent: true },
    { source: `${source}/`, destination, permanent: true },
  ]),
  rewrites: [{ source: '/(.*)', destination: '/index.html' }],
};

fs.writeFileSync(
  path.join(rootDir, 'vercel.json'),
  `${JSON.stringify(vercelConfig, null, 2)}\n`,
);

console.log(`Generated sitemap.xml with ${canonicalPaths.length} URLs.`);
console.log(`Generated ${legacyRedirects.length * 2 + 1} Netlify redirects and ${legacyRedirects.length * 2} Vercel redirects.`);
