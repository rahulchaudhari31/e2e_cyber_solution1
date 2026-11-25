import { ArrowLeft, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import siteContent from '../data/siteContent';
import { Button, Container, GlowOrb, Reveal } from '../components/ui';
import { PageMeta } from '../components/seo';

function MissingPageIllustration() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 320 240"
      role="img"
      aria-label="Animated illustration of a missing page"
      className="mx-auto w-full max-w-md"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <defs>
        <linearGradient id="page-404-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B78FF" />
          <stop offset="100%" stopColor="#F9812B" />
        </linearGradient>
        <linearGradient id="page-404-card" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0C1322" />
          <stop offset="100%" stopColor="#070B14" />
        </linearGradient>
      </defs>

      <motion.circle
        cx="160"
        cy="120"
        r="94"
        fill="none"
        stroke="url(#page-404-gradient)"
        strokeWidth="1"
        strokeDasharray="4 10"
        opacity="0.35"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '160px 120px' }}
      />

      <motion.g
        animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="82" y="35" width="156" height="172" rx="22" fill="url(#page-404-card)" stroke="rgba(255,255,255,0.14)" />
        <rect x="102" y="58" width="76" height="7" rx="3.5" fill="rgba(169,155,255,0.7)" />
        <rect x="102" y="78" width="116" height="6" rx="3" fill="rgba(255,255,255,0.12)" />
        <rect x="102" y="94" width="96" height="6" rx="3" fill="rgba(255,255,255,0.1)" />
        <rect x="102" y="110" width="108" height="6" rx="3" fill="rgba(255,255,255,0.08)" />
        <motion.path
          d="M111 148 L141 178 M141 148 L111 178"
          stroke="url(#page-404-gradient)"
          strokeWidth="8"
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: 'easeOut' }}
        />
      </motion.g>

      <motion.g
        animate={reduceMotion ? undefined : { rotate: [0, 8, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '248px 62px' }}
      >
        <circle cx="248" cy="62" r="22" fill="#6D5EF8" opacity="0.25" />
        <Sparkles x="237" y="51" width="22" height="22" color="#FFBC7D" />
      </motion.g>
    </motion.svg>
  );
}

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden py-24">
      <PageMeta
        title="Page not found"
        description="The page you requested could not be found on the e2e Cyber Solutions website."
        path="/404"
        noindex
      />
      <GlowOrb tone="primary" className="-left-32 top-0 h-96 w-96 opacity-70" />
      <GlowOrb tone="accent" className="-right-32 bottom-0 h-96 w-96 opacity-60" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-fade opacity-50" />

      <Container className="relative grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="text-center lg:text-left">
            <p className="font-display text-[clamp(6rem,14vw,11rem)] font-semibold leading-none tracking-[-0.08em] text-gradient">
              {siteContent.notFound.title}
            </p>
            <h1 className="mt-4 text-balance font-display text-2xl font-semibold sm:text-4xl">
              {siteContent.notFound.subtitle}
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-slate-400 sm:text-base lg:mx-0">
              The page you were looking for has moved, or never existed. Let's get you back to something useful.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Button to="/" icon={<ArrowLeft className="h-4 w-4" />}>
                Back home
              </Button>
              <Button consultation variant="outline">
                Get a free consultation
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <MissingPageIllustration />
        </Reveal>
      </Container>
    </section>
  );
}
