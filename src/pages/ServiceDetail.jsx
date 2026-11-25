import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowUpRight, Check, CheckCircle2, Sparkles } from 'lucide-react';
import siteContent from '../data/siteContent';
import { Accordion, Badge, Button, Card, Container, Reveal, SectionHeading } from '../components/ui';
import { CTASection, PageBanner } from '../components/sections';
import { PageMeta, StructuredData } from '../components/seo';
import { findServiceGroup, getServicePageBySlug, serviceDetailPath } from '../utils/content';

const { about, home, servicePages } = siteContent;

const benefits = about.highlights.map((highlight) => {
  const [title, ...rest] = highlight.split('.');
  return {
    title: title.trim(),
    description: rest.length ? `${rest.join('.').trim()}.` : highlight,
  };
});

function relatedServicesFor(page) {
  const group = findServiceGroup(page.path);

  if (group?.children?.length) {
    return group.children
      .filter((child) => child.path !== page.path)
      .slice(0, 3)
      .map((child) => ({ title: child.label, to: serviceDetailPath(child.path) }));
  }

  return servicePages
    .filter((item) => item.path !== page.path)
    .slice(0, 3)
    .map((item) => ({ title: item.title, to: `/services/${item.path.replace(/^\//, '')}` }));
}

export default function ServiceDetail({ page: pageProp }) {
  const { slug } = useParams();
  const page = pageProp || getServicePageBySlug(slug);

  if (!page) {
    return <Navigate to="/services" replace />;
  }

  const description = page.paragraphs[0];
  const group = findServiceGroup(page.path);
  const included = page.listItems.length
    ? page.listItems.map((item) => ({ title: item, description: '' }))
    : home.process.slice(0, 4).map((step) => ({ title: step.title, description: step.description }));

  const faqs = [
    {
      question: `What does ${page.title} include?`,
      answer: page.listItems.length
        ? page.listItems.join(' ')
        : `${page.paragraphs[0]} ${home.process.map((step) => `${step.title}: ${step.description}`).join(' ')}`,
    },
    {
      question: `How does e2e Cyber Solutions approach ${page.title}?`,
      answer: home.process.map((step) => `${step.title}: ${step.description}`).join(' '),
    },
    {
      question: `Why choose e2e Cyber Solutions for ${page.title}?`,
      answer: about.highlights.join(' '),
    },
    {
      question: 'How do I get started?',
      answer: home.cta.paragraphs[0],
    },
  ];

  return (
    <>
      <PageMeta title={page.heading} description={description} path={page.path} />
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: page.heading,
          description,
          provider: { '@type': 'Organization', name: siteContent.company.name },
          areaServed: 'Birmingham, UK',
        }}
      />
      <PageBanner
        eyebrow={group?.label || 'Service'}
        title={page.heading}
        description={page.paragraphs[0]}
        image={page.image}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Services', to: '/services' },
          { label: page.title, to: `/services/${page.path.replace(/^\//, '')}` },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Button to="/contact" size="lg" iconRight={<ArrowUpRight className="h-4 w-4" />}>
            Discuss this service
          </Button>
          <Button to="/services" variant="outline" size="lg">
            All services
          </Button>
        </div>
      </PageBanner>

      <section aria-labelledby="service-overview-heading" className="section-shell">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-hero-glow opacity-50" />
        <Container className="relative grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <SectionHeading
              id="service-overview-heading"
              eyebrow="Overview"
              title={page.title}
              description={page.paragraphs[0]}
            />
            {page.paragraphs.slice(1).map((paragraph, index) => (
              <p key={index} className="mt-5 text-sm leading-7 text-slate-400">
                {paragraph}
              </p>
            ))}
            {page.subheadings.map((subheading, index) => (
              <div key={subheading} className="mt-7 border-l border-primary-400/40 pl-5">
                <h3 className="text-lg font-semibold">{subheading}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {page.paragraphs[index + 1] || page.paragraphs[0]}
                </p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.12}>
            <div className="overflow-hidden rounded-5xl border border-white/10 bg-white/[0.04] p-3">
              <img
                src={page.image}
                alt={`${page.title} service image from the original site`}
                loading="lazy"
                decoding="async"
                className="h-[22rem] w-full rounded-4xl object-cover opacity-90 sm:h-[30rem]"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="service-included-heading" className="section-shell border-y border-white/[0.06] bg-ink-900/40">
        <Container>
          <Reveal>
            <SectionHeading
              id="service-included-heading"
              eyebrow="What is included"
              title={page.listItems.length ? 'What you get.' : 'How we approach it.'}
              description={
                page.listItems.length
                  ? 'Capabilities and deliverables taken from the original service page.'
                  : 'This service page did not list deliverables, so these steps come from the original process copy.'
              }
            />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {included.map((item, index) => (
              <Reveal key={item.title + index} delay={index * 0.05}>
                <div className="surface-card flex h-full gap-4 p-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary-300" />
                  <div>
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    {item.description && (
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="service-process-heading" className="section-shell">
        <Container>
          <Reveal>
            <SectionHeading
              id="service-process-heading"
              eyebrow="Process"
              title="A clear path from idea to impact."
              description="The same five-stage process used across e2e Cyber Solutions."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {home.process.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.06}>
                <article className="surface-card h-full p-6">
                  <p className="font-display text-2xl font-semibold text-primary-200">{step.number}</p>
                  <h3 className="mt-5 text-base font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{step.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="service-benefits-heading" className="section-shell border-y border-white/[0.06] bg-ink-900/40">
        <Container>
          <Reveal>
            <SectionHeading
              id="service-benefits-heading"
              eyebrow="Benefits"
              title="Why it matters."
              description="The value we bring to every engagement."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <Card key={benefit.title} as="article" className="p-7">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-accent-400/25 bg-accent-500/10 text-accent-300">
                  <Sparkles className="h-4 w-4" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{benefit.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary-200">
                  <Check className="h-3.5 w-3.5" />
                  Included in our approach
                </span>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="service-faq-heading" className="section-shell">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionHeading
              id="service-faq-heading"
              eyebrow="FAQ"
              title="Good questions, clear answers."
              description="Answers are drawn from the original site content for this service."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="surface-card px-6 py-4 sm:px-8">
              <Accordion items={faqs} />
            </div>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="service-related-heading" className="section-shell border-t border-white/[0.06] bg-ink-900/40">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                id="service-related-heading"
                eyebrow="Keep exploring"
                title="Related services."
              />
              <Button to="/services" variant="outline">
                View all services
              </Button>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServicesFor(page).map((service, index) => (
              <Reveal key={service.to} delay={index * 0.06}>
                <Link to={service.to} className="surface-card group flex h-full items-center justify-between gap-4 p-6">
                  <div>
                    <Badge variant="neutral">Service</Badge>
                    <h3 className="mt-4 text-lg font-semibold transition-colors group-hover:text-white">
                      {service.title}
                    </h3>
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        heading={`Ready to grow with ${page.title}?`}
        description={home.cta.paragraphs[0]}
        primaryLabel="Get started"
      />
    </>
  );
}
