import { ArrowUpRight } from 'lucide-react';
import siteContent from '../../data/siteContent';
import { Button, Container, Reveal } from '../ui';

const content = siteContent.home.cta;

export default function FinalCTA() {
  return (
    <section aria-labelledby="final-cta-heading" className="relative py-20 sm:py-28">
      <Container>
        <Reveal className="relative overflow-hidden rounded-5xl bg-primary-gradient p-8 shadow-lift sm:p-14 lg:p-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.28),transparent_45%),radial-gradient(circle_at_5%_90%,rgba(4,7,13,0.35),transparent_45%)]" />
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/20" />
          <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full border border-white/10" />

          <div className="relative grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
                Ready when you are
              </span>
              <h2
                id="final-cta-heading"
                className="mt-5 max-w-2xl text-balance font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl"
              >
                {content.heading}
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
                {content.paragraphs[0]}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button
                to="/contact"
                variant="ghost"
                size="lg"
                className="border-white/30 bg-white/15 text-white hover:bg-white/25"
                iconRight={<ArrowUpRight className="h-4 w-4" />}
              >
                {content.buttons[1]}
              </Button>
              <Button to="/contact" variant="accent" size="lg">
                {content.buttons[0]}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
