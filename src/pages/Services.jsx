import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  BarChart3,
  Code2,
  Layers3,
  Palette,
  PenLine,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react';
import siteContent from '../data/siteContent';
import { CTASection, PageBanner } from '../components/sections';
import { PageMeta } from '../components/seo';
import { Badge, Button, Card, Container, Reveal, SectionHeading } from '../components/ui';
import { findServiceGroup, pathFromSourceHref, serviceDetailPath } from '../utils/content';

const { services, company, about } = siteContent;

const serviceIcons = [Palette, Code2, BarChart3, Layers3, PenLine, Sparkles];

const valueIcons = [Sparkles, Code2, TrendingUp, Target];

const values = about.highlights.map((highlight) => {
  const [title, ...rest] = highlight.split('.');
  return {
    title: title.trim(),
    description: rest.length ? `${rest.join('.').trim()}.` : highlight,
  };
});

export default function Services() {
  return (
    <>
      <PageMeta title="Services" description={company.description} path="/services" />
      <PageBanner
        eyebrow={company.tagline}
        title="Services"
        description={company.description}
        image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=72"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Services', to: '/services' },
        ]}
      >
        <Button to="/contact" size="lg" iconRight={<ArrowUpRight className="h-4 w-4" />}>
          Start a project
        </Button>
      </PageBanner>

      <section aria-labelledby="services-intro-heading" className="section-shell">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-hero-glow opacity-50" />
        <Container className="relative">
          <Reveal>
            <SectionHeading
              id="services-intro-heading"
              eyebrow="What we do"
              title="Strategy, design, technology and growth in one place."
              description={about.paragraphs[0]}
            />
          </Reveal>
          <div className="mt-10 flex flex-wrap gap-3">
            {services.map((service) => (
              <Badge key={service.name} variant="neutral">
                {service.name}
              </Badge>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="services-grid-heading" className="section-shell border-y border-white/[0.06] bg-ink-900/40">
        <Container>
          <Reveal>
            <SectionHeading
              id="services-grid-heading"
              eyebrow="Our services"
              title="Explore what we can build together."
              description="Each service page is generated from the original site content and paired with the same design system used across the site."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = serviceIcons[index] || Sparkles;
              const to = serviceDetailPath(service.sourceHref);
              const group = findServiceGroup(pathFromSourceHref(service.sourceHref));

              return (
                <Card key={service.name} as="article" className="group p-7" glow>
                  <Link to={to} className="absolute inset-0 z-10" aria-label={`View ${service.name} details`}>
                    <span className="sr-only">View {service.name} details</span>
                  </Link>
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-primary-400/20 bg-primary-500/10 text-primary-200">
                      <Icon className="h-5 w-5" />
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-slate-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </div>
                  {group && (
                    <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-300">
                      {group.label}
                    </p>
                  )}
                  <h3 className="mt-3 text-xl font-semibold sm:text-2xl">{service.name}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400">{service.description}</p>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-primary-200">
                    View service
                  </p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      <section aria-labelledby="services-why-heading" className="section-shell">
        <Container>
          <Reveal>
            <SectionHeading
              id="services-why-heading"
              align="center"
              eyebrow="Why e2e"
              title="Why choose us?"
              description="Creative, contemporary and credible work—built around your audience."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = valueIcons[index] || Sparkles;
              return (
                <Reveal key={value.title} delay={index * 0.06}>
                  <article className="surface-card h-full p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] text-accent-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 text-base font-semibold">{value.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{value.description}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <CTASection heading="Need the right mix of services?" primaryLabel="Tell us your goals" />
    </>
  );
}
