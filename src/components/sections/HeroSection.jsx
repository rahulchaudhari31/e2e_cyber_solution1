import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Activity, ArrowRight, ArrowUpRight, Radio, Sparkles } from 'lucide-react';
import siteContent from '../../data/siteContent';
import { Badge, Button, Container, GlowOrb, Reveal } from '../ui';
import { responsiveSrcSet } from '../../utils/images';

const heroImage = 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=72';

const particles = Array.from({ length: 24 }, (_, index) => ({
  left: `${(index * 37) % 100}%`,
  top: `${(index * 61) % 100}%`,
  size: 2 + (index % 4) * 2,
  duration: 5 + (index % 5),
  delay: (index % 7) * 0.45,
}));

const { home } = siteContent;

export default function HeroSection() {
  const heroRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const yGrowth = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yCampaign = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const headline = home.hero.headings[0].text.split(' ');

  return (
    <section ref={heroRef} aria-labelledby="home-hero-title" className="relative overflow-hidden pb-24 pt-12 sm:pb-32 sm:pt-16">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div className="pointer-events-none absolute inset-0 bg-grid-fade opacity-70" />
      <GlowOrb tone="primary" className="-left-52 top-0 h-[34rem] w-[34rem]" />
      <GlowOrb tone="accent" className="-right-40 top-32 h-[28rem] w-[28rem] opacity-70" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((particle, index) => (
          <motion.span
            key={index}
            className="absolute rounded-full bg-primary-200"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
            }}
            animate={reduceMotion ? undefined : { y: [0, -26, 0], opacity: [0.1, 0.65, 0.1] }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <Container className="relative grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div>
          <Reveal>
            <Badge dot>Digital-first creative agency</Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h1
              id="home-hero-title"
              className="mt-7 text-balance font-display text-[clamp(3.25rem,8vw,6.75rem)] font-semibold leading-[0.94] tracking-[-0.06em]"
            >
              {headline[0]} <span className="text-gradient">{headline[1]}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-2xl font-display text-xl font-medium text-white sm:text-2xl">
              {home.hero.headings[1].text}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              {home.intro.paragraphs[0]}
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button to="/contact" size="lg" iconRight={<ArrowUpRight className="h-4 w-4" />}>
                {home.cta.buttons[0]}
              </Button>
              <Button to="/contact" variant="outline" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
                {home.cta.buttons[1]}
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.18} className="relative">
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-6 rounded-full border border-white/[0.06]" />
            <div className="absolute -inset-2 animate-float rounded-full bg-primary-500/15 blur-3xl" />
            <div className="glass relative overflow-hidden rounded-5xl p-3 shadow-card sm:p-4">
              <img
                src={heroImage}
                srcSet={responsiveSrcSet(heroImage, [640, 960, 1200])}
                sizes="(max-width: 640px) 100vw, 50vw"
                alt="Marketing team collaborating around a table"
                loading="lazy"
                decoding="async"
                className="h-80 w-full rounded-4xl object-cover opacity-90 sm:h-[26rem]"
              />
              <div className="pointer-events-none absolute inset-0 rounded-5xl bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
              <div className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8">
                <p className="font-display text-xl text-white sm:text-2xl">{siteContent.company.tagline}</p>
              </div>
            </div>

            <motion.div
              style={reduceMotion ? undefined : { y: yGrowth }}
              className="absolute -right-3 top-10 z-20 sm:-right-6"
            >
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="glass rounded-3xl px-4 py-3 shadow-lift sm:px-5 sm:py-4"
              >
                <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-slate-500">
                  <Activity className="h-3 w-3 text-accent-300" /> Illustrative metric
                </span>
                <p className="mt-1 font-display text-lg font-semibold text-white sm:text-xl">+120% growth</p>
              </motion.div>
            </motion.div>

            <motion.div
              style={reduceMotion ? undefined : { y: yCampaign }}
              className="absolute -left-3 bottom-10 z-20 sm:-left-8"
            >
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, 12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="glass rounded-3xl px-4 py-3 shadow-lift sm:px-5 sm:py-4"
              >
                <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-slate-500">
                  <Radio className="h-3 w-3 text-primary-300" /> Status preview
                </span>
                <p className="mt-1 font-display text-base font-semibold text-white sm:text-lg">Campaign live</p>
              </motion.div>
            </motion.div>

            <div className="absolute -bottom-5 right-6 z-10 hidden items-center gap-2 rounded-full border border-white/10 bg-ink-900/80 px-4 py-2 text-[11px] text-slate-300 backdrop-blur-xl sm:flex">
              <Sparkles className="h-3.5 w-3.5 text-accent-300" />
              Strategy. Design. Growth.
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
