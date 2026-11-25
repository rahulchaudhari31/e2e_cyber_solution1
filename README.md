# e2e Cyber Solutions rebuild

Vite + React rebuild of the crawled `https://www.e2ecybersolutions.com/` site. Source copy and legacy paths come from `content-audit.md`; new functionality, placeholder content and generated SEO files are separated so the original audit remains easy to compare.

## Commands

```bash
npm install
npm run dev
npm run qa
npm run build
npm run preview
```

`npm run build` runs `npm run generate:config` first. This writes `public/sitemap.xml`, `public/robots.txt`, `public/_redirects` and root `vercel.json` from `siteContent` and `blogPosts.js`. Do not hand-edit those generated files.

## Source of truth

- `content-audit.md`: crawl record, original routes, source copy, missing-data notes.
- `src/data/siteContent.js`: navigation, service pages, home/about/contact copy, social links and legacy paths.
- `src/data/blogPosts.js`: explicitly dummy editorial content; replace before publishing real articles.
- `src/data/legalContent.js`: explicitly placeholder privacy and terms copy; replace with approved legal text.
- `src/utils/api.js`: contact form provider settings.

Update the production domain in `src/data/siteContent.js` under `meta.sourceSite` before deploying to a different host. That value feeds canonical URLs, Open Graph URLs, JSON-LD, `robots.txt` and `sitemap.xml`.

## Routes

| Route | Source | Notes |
| --- | --- | --- |
| `/` | `index.php` | Home, service grid, process, work preview, testimonials and CTA. |
| `/about` | `about.php` | Source story, values, placeholder team, milestones and CTA. |
| `/services` | `services.php` | Service overview linking to every detailed service page. |
| `/services/:slug`, `/web-design`, `/seo`, etc. | service `.php` pages | Dynamic detail page with overview, benefits, process, FAQ and related services. |
| `/portfolio` | new | Illustrative case studies; no source case-study pages existed. |
| `/blog`, `/blog/:slug` | new | Dummy editorial posts generated from source copy. |
| `/faq` | new | Source-copy-based placeholder FAQ; no source FAQ existed. |
| `/contact` | `contact.php` | Contact form, source address, phone, email and embedded map. |
| `/privacy-policy`, `/terms` | new | Clearly marked placeholder legal pages. |
| `/404` | catch-all | Not-found page with consultation CTA. |

Legacy `.php` routes redirect at both the React Router layer and the hosting layer. The audit’s broken source links `/seo-optimization.php` and `/content.php` map to `/seo` and `/content-writing`.

## Components

- `src/components/layout`: `Navbar`, `Footer`, `Layout`, `PageTransition`, `ScrollProgress`, `ScrollToTop`, `BackToTop`, `CustomCursor`, `ThemeToggle`.
- `src/components/sections`: reusable page sections such as `HeroSection`, `ServicesGrid`, `WorkPreview`, `ProcessTimeline`, `CTASection` and `PageBanner`.
- `src/components/ui`: `Button`, `Card`, `Accordion`, `Badge`, `Container`, `Input`, `Modal`, `Toast`, `PageSkeleton` and other shared primitives.
- `src/components/seo`: `PageMeta` for title/description/canonical/OG/Twitter tags and `StructuredData` for JSON-LD.
- `src/components/global/ConsultationProvider`: global consultation modal, with the form lazy-loaded on first open.
- `src/context`: `ThemeContext` and `ConsultationContext`.

Pages are route-level lazy chunks. `Layout` renders a `PageSkeleton` while a chunk loads.

## Styling and interaction

- Tailwind CSS theme tokens are in `tailwind.config.js`; global CSS is in `src/index.css`.
- Light/dark theme preference is stored in `localStorage` under `e2e-theme` and applied through `data-theme` on the root element.
- The custom cursor only runs for fine pointers when reduced motion is off. Magnetic buttons and card tilt also respect reduced motion.
- Skip link, focus-visible styles, semantic landmarks, ARIA labels and keyboard-accessible modals/accordions are included.

## Images

Placeholder photography uses Unsplash URLs with explicit `auto=format`, `fit=crop`, `w` and `q=72` parameters. Banner images use `w=1400`; cards use `w=600`–`w=1200`; avatars use `w=200`. `PageBanner` and the hero image also provide responsive `srcSet`/`sizes`.

Replace placeholder images in `siteContent.js`, `blogPosts.js`, `legalContent.js`, page files and section files. Keep descriptive `alt` text and `loading="lazy"` for non-hero images.

## Contact form

`submitContactForm` currently simulates success after a short delay. Configure one of:

```bash
VITE_CONTACT_ENDPOINT=https://your-endpoint.example/contact
```

or, for EmailJS:

```bash
VITE_EMAILJS_PUBLIC_KEY=...
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
```

Do not commit real keys. Update `submitContactForm` in `src/utils/api.js` to call EmailJS if that provider is chosen; the config object is already wired to the `VITE_EMAILJS_*` variables.

## SEO and deployment

- Per-page metadata lives beside each page as `PageMeta`.
- Global Organization and WebSite JSON-LD is rendered in `Layout`; FAQ, Service and BlogPosting JSON-LD are rendered on their respective pages.
- `public/favicon.svg` is the site icon.
- Netlify uses generated `public/_redirects`.
- Vercel uses generated `vercel.json`; the final rewrite sends unknown routes to `/index.html` for client-side routing.
- Unknown pages are marked `noindex`; placeholder legal pages are also marked `noindex`.

## Content gaps to resolve before launch

- Replace placeholder social URLs ending in `#`.
- Replace dummy blog posts and explicit placeholder legal text.
- Replace dummy team portraits and portfolio case studies with approved content.
- Connect the contact form to a real endpoint.
- Verify numeric claims in stats and confirm approved alt text.
- Run `npm run qa` after content changes; it checks internal links, audit route coverage and required generated files.
