import { ArrowUpRight, Quote } from 'lucide-react';
import siteContent from '../../data/siteContent';
import { Button, Container, Reveal, SectionHeading } from '../ui';

const { home, about, company } = siteContent;

export default function AboutTeaser() {
  return (
    <section aria-labelledby="about-teaser-heading" className="section-shell border-b border-white/[0.06] bg-ink-900/40">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <SectionHeading
            id="about-teaser-heading"
            eyebrow="Who we are"
            title={home.intro.heading}
            description={company.tagline}
          />
          <p className="mt-6 max-w-xl text-sm leading-7 text-slate-400">{home.intro.paragraphs[0]}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button to="/about" variant="ghost" iconRight={<ArrowUpRight className="h-4 w-4" />}>
              More about us
            </Button>
          </div>
          <div className="mt-9 flex items-start gap-4 rounded-3xl border border-white/[0.07] bg-white/[0.03] p-5">
            <Quote className="mt-0.5 h-5 w-5 shrink-0 text-accent-300" />
            <p className="font-display text-sm leading-relaxed text-white sm:text-base">{about.statement}</p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=72"
                alt="Team collaborating on a digital campaign"
                loading="lazy"
                decoding="async"
                className="h-64 w-full rounded-4xl border border-white/10 object-cover sm:h-80"
              />
            </div>
            <div className="col-span-2 sm:col-span-1 sm:mt-10">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=72"
                alt="Analytics dashboard showing campaign performance"
                loading="lazy"
                decoding="async"
                className="h-64 w-full rounded-4xl border border-white/10 object-cover sm:h-80"
              />
            </div>
            <div className="col-span-2 -mt-20 sm:col-span-1 sm:ml-10 sm:mt-0">
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=72"
                alt="Creative studio workspace"
                loading="lazy"
                decoding="async"
                className="h-52 w-full rounded-4xl border border-white/10 object-cover sm:h-60"
              />
            </div>
            <div className="col-span-2 flex items-end sm:col-span-1">
              <div className="glass w-full rounded-4xl p-5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-300">
                  What we deliver
                </span>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  Experiential digital products, conversion-based designs and engaging content solutions.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
