import { motion } from 'framer-motion';
import siteContent from '../../data/siteContent';
import { Container, Reveal, SectionHeading } from '../ui';

const source = siteContent.home.process;
const strategy = siteContent.servicePages.find((page) => page.path === '/digital-strategy');

const steps = [
  {
    number: '01',
    title: 'Discover',
    sourceLabel: source[0].title,
    description: source[0].description,
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1000&q=72',
    alt: 'Creative team discussing a new project',
  },
  {
    number: '02',
    title: 'Strategy',
    sourceLabel: source[0].title,
    description: strategy?.paragraphs[0] || source[0].description,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=72',
    alt: 'Laptop displaying digital strategy analytics',
  },
  {
    number: '03',
    title: 'Design',
    sourceLabel: source[1].title,
    description: source[1].description,
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1000&q=72',
    alt: 'Designers reviewing layouts in a workshop',
  },
  {
    number: '04',
    title: 'Launch',
    sourceLabel: `${source[2].title} / ${source[3].title}`,
    description: `${source[2].description} ${source[3].description}`,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=72',
    alt: 'Team preparing a digital campaign launch',
  },
  {
    number: '05',
    title: 'Optimize',
    sourceLabel: source[4].title,
    description: siteContent.about.highlights[2],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=72',
    alt: 'Analytics dashboard used to optimize campaigns',
  },
];

export default function ProcessTimeline() {
  return (
    <section aria-labelledby="process-heading" className="section-shell border-y border-white/[0.06] bg-ink-900/40">
      <Container>
        <Reveal>
          <SectionHeading
            id="process-heading"
            eyebrow="How we work"
            title="From first idea to measurable impact."
            description="A clear five-step process built to keep creative thinking and business goals moving together."
          />
        </Reveal>

        <div className="relative mt-14">
          <motion.div
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-4 top-0 hidden h-full w-px origin-top bg-gradient-to-b from-primary-400 via-accent-400 to-primary-500 sm:block"
          />

          <ol className="space-y-8 sm:space-y-12">
            {steps.map((step, index) => (
              <Reveal as="li" key={step.number} delay={index * 0.06} className="relative sm:pl-14">
                <span className="absolute left-0 top-6 hidden h-8 w-8 place-items-center rounded-full border border-primary-300/40 bg-ink-900 font-display text-xs text-primary-200 sm:grid">
                  {step.number}
                </span>
                <article className="surface-card grid gap-6 overflow-hidden p-4 sm:p-6 lg:grid-cols-2 lg:items-center">
                  <div className={index % 2 ? 'lg:order-2' : ''}>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-300">
                      {step.number} · Source: {step.sourceLabel}
                    </span>
                    <h3 className="mt-3 text-2xl font-semibold">{step.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-slate-400">{step.description}</p>
                  </div>
                  <div className={index % 2 ? 'lg:order-1' : ''}>
                    <img
                      src={step.image}
                      alt={step.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-56 w-full rounded-3xl border border-white/10 object-cover sm:h-64"
                    />
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
