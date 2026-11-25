import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import siteContent from '../src/data/siteContent.js';

export const rootDir = fileURLToPath(new URL('../', import.meta.url));
export const siteUrl = siteContent.meta.sourceSite.replace(/\/$/, '');

const blogSource = fs.readFileSync(fileURLToPath(new URL('../src/data/blogPosts.js', import.meta.url)), 'utf8');

export const blogSlugs = [
  ...blogSource.matchAll(/slug:\s*['"]([^'"]+)['"]/g),
].map((match) => match[1]);

const staticPaths = [
  '/',
  '/about',
  '/services',
  '/portfolio',
  '/blog',
  '/faq',
  '/privacy-policy',
  '/terms',
  '/contact',
];

const routePaths = siteContent.routes
  .map((route) => route.path)
  .filter((path) => path && path !== '#' && path !== '/service-detail');

const servicePaths = siteContent.servicePages.map((page) => page.path).filter(Boolean);

export const canonicalPaths = [
  ...new Set([
    ...staticPaths,
    ...routePaths,
    ...servicePaths,
    ...blogSlugs.map((slug) => `/blog/${slug}`),
  ]),
].sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)));

const redirectMap = new Map();

for (const route of siteContent.routes) {
  if (
    route.legacyPath &&
    route.path &&
    route.path !== '#' &&
    route.legacyPath !== route.path &&
    route.legacyPath !== '/service-detail.php'
  ) {
    redirectMap.set(route.legacyPath, route.path);
  }
}

for (const [from, to] of [
  ['/service-detail.php', '/services'],
  ['/service-detail', '/services'],
  ['/seo-optimization.php', '/seo'],
  ['/content.php', '/content-writing'],
  ['/seo-optimization', '/seo'],
  ['/content', '/content-writing'],
]) {
  redirectMap.set(from, to);
}

export const legacyRedirects = [...redirectMap.entries()].sort(([a], [b]) => a.localeCompare(b));
