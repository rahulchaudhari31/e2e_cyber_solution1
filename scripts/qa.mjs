import fs from 'node:fs';
import path from 'node:path';
import { canonicalPaths, legacyRedirects, rootDir } from './shared.mjs';

const sourceDir = path.join(rootDir, 'src');
const validPaths = new Set([...canonicalPaths, ...legacyRedirects.map(([from]) => from), '/404']);

function collectFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectFiles(fullPath);
    return /\.(jsx?|tsx?)$/.test(entry.name) ? [fullPath] : [];
  });
}

function normalizePath(value) {
  const clean = value.split(/[?#]/)[0];
  if (clean.length > 1 && clean.endsWith('/')) return clean.slice(0, -1);
  return clean;
}

const brokenLinks = [];
const linkPattern = /(?:to|href)\s*=\s*(["'])([^"']+)\1/g;
const files = collectFiles(sourceDir);

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  for (const match of content.matchAll(linkPattern)) {
    const raw = match[2];
    if (
      !raw.startsWith('/') ||
      raw.includes('${') ||
      raw.startsWith('//') ||
      raw.startsWith('/#')
    ) {
      continue;
    }

    const normalized = normalizePath(raw);
    if (!validPaths.has(normalized)) {
      const line = content.slice(0, match.index).split('\n').length;
      brokenLinks.push(`${path.relative(rootDir, file)}:${line} ${raw}`);
    }
  }
}

const audit = fs.readFileSync(path.join(rootDir, 'content-audit.md'), 'utf8');
const auditPaths = [
  ...audit.matchAll(/^\|\s*https:\/\/www\.e2ecybersolutions\.com[^\s|]*\s*\|\s*[^|]+\|\s*[^|]+\|\s*([^|]+?)\s*\|/gm),
].map((match) => match[1].trim().replace(/^`|`$/g, ''));

const missingAuditPaths = auditPaths.filter(
  (route) => !validPaths.has(normalizePath(route)),
);

const requiredFiles = [
  'public/favicon.svg',
  'public/robots.txt',
  'public/sitemap.xml',
  'public/_redirects',
  'vercel.json',
  'README.md',
];
const missingFiles = requiredFiles.filter(
  (file) => !fs.existsSync(path.join(rootDir, file)),
);

const placeholderCount = (
  (fs.readFileSync(path.join(rootDir, 'src/data/siteContent.js'), 'utf8').match(/TODO/g) || []).length +
  (fs.readFileSync(path.join(rootDir, 'src/data/legalContent.js'), 'utf8').match(/Placeholder/g) || []).length
);

console.log(`Checked ${files.length} source files and ${auditPaths.length} audit routes.`);
console.log(`Canonical routes: ${canonicalPaths.length}. Legacy redirects: ${legacyRedirects.length}.`);
console.log(`Known TODO/placeholder markers retained from source audit: ${placeholderCount}.`);

if (brokenLinks.length) {
  console.error('\nBroken internal links:');
  brokenLinks.forEach((item) => console.error(`- ${item}`));
}

if (missingAuditPaths.length) {
  console.error('\nAudit routes without a valid destination:');
  missingAuditPaths.forEach((item) => console.error(`- ${item}`));
}

if (missingFiles.length) {
  console.error('\nMissing generated or handoff files:');
  missingFiles.forEach((item) => console.error(`- ${item}`));
}

if (brokenLinks.length || missingAuditPaths.length || missingFiles.length) {
  process.exitCode = 1;
} else {
  console.log('\nQA passed: no broken internal links or uncovered audit routes.');
}
