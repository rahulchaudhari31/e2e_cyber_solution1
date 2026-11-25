import siteContent from '../../data/siteContent';
import CountUp from './CountUp';
import { Badge, Container, Reveal, SectionHeading } from '../ui';

const statItems = [
  {
    value: 1000,
    suffix: '+',
    label: 'clients supported',
    claim: siteContent.stats[0].value,
  },
  {
    value: 10,
    suffix: '+',
    label: 'years in digital',
    claim: siteContent.stats[1].value,
  },
  {
    value: siteContent.services.length,
    suffix: '',
    label: 'core services',
    claim: null,
  },
  {
    value: siteContent.home.process.length,
    suffix: '',
    label: 'process stages',
    claim: null,
  },
];

export default function StatsCounters() {
  return (
    <section aria-labelledby="stats-heading" className="section-shell border-y border-white/[0.06] bg-ink-900/40">
      <Container>
        <Reveal>
          <SectionHeading
            id="stats-heading"
            align="center"
            eyebrow="By the numbers"
            title="Built on experience, measured by outcomes."
            description="A snapshot of the scale and structure behind the work."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statItems.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.08}>
              <div className="surface-card h-full p-7 text-center">
                {stat.claim && (
                  <Badge variant="accent" className="mb-4">
                    Source claim
                  </Badge>
                )}
                <p className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{stat.label}</p>
                {stat.claim && <p className="mt-3 text-[11px] leading-relaxed text-slate-600">“{stat.claim}”</p>}
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-[11px] leading-relaxed text-slate-600">
          Figures marked “Source claim” are taken from the original site copy and should be verified before publication.
        </p>
      </Container>
    </section>
  );
}
