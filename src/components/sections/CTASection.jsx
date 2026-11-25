import { ArrowUpRight } from 'lucide-react';
import siteContent from '../../data/siteContent';
import { Button, Container, GlowOrb, Reveal } from '../ui';

export default function CTASection({ heading, description, primaryLabel, secondaryLabel }) {
  const content = siteContent.home.cta;

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-x-0 inset-y-6 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal className="relative h-full overflow-hidden rounded-5xl border border-white/10 bg-ink-800 px-6 py-14 sm:px-12 sm:py-16 lg:px-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(249,129,43,0.22),transparent_45%),radial-gradient(circle_at_10%_90%,rgba(109,94,248,0.3),transparent_45%)]" />
          <GlowOrb tone="primary" className="-right-20 -top-24 h-72 w-72" />
          <div className="relative grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-300">
                Ready when you are
              </span>
              <h2 className="mt-5 max-w-2xl text-balance font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                {heading || content.heading}
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
                {description || content.paragraphs[0]}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button consultation size="lg" iconRight={<ArrowUpRight className="h-4 w-4" />}>
                {primaryLabel || content.buttons[0]}
              </Button>
              <Button consultation variant="outline" size="lg">
                {secondaryLabel || content.buttons[1]}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
