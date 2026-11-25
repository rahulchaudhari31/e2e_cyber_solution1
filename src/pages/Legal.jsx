import { CTASection, PageBanner } from '../components/sections';
import { PageMeta } from '../components/seo';
import { Badge, Container, Reveal, SectionHeading } from '../components/ui';

export default function Legal({ legalDocument }) {
  return (
    <>
      <PageMeta
        title={legalDocument.title}
        description={`${legalDocument.title} for e2e Cyber Solutions. ${legalDocument.notice}`}
        path={`/${legalDocument.slug}`}
        noindex
      />
      <PageBanner
        eyebrow="Legal"
        title={legalDocument.title}
        description="Placeholder legal copy for launch planning. Replace with approved text before publishing."
        image={legalDocument.image}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: legalDocument.title, to: `/${legalDocument.slug}` },
        ]}
      >
        <Badge variant="accent">Placeholder copy</Badge>
      </PageBanner>

      <section aria-labelledby="legal-heading" className="section-shell">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-hero-glow opacity-40" />
        <Container className="relative">
          <Reveal>
            <SectionHeading
              id="legal-heading"
              eyebrow="Important information"
              title={legalDocument.title}
              description={legalDocument.notice}
            />
          </Reveal>

          <div className="mx-auto mt-12 max-w-3xl space-y-6">
            {legalDocument.sections.map((section, index) => (
              <Reveal key={section.heading} delay={index * 0.05}>
                <section className="surface-card p-6 sm:p-8">
                  <h2 className="text-xl font-semibold sm:text-2xl">{section.heading}</h2>
                  <div className="mt-4 space-y-4">
                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex} className="text-sm leading-7 text-slate-400">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.list?.length > 0 && (
                    <ul className="mt-5 space-y-2">
                      {section.list.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-300" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection heading="Need clarity on something?" primaryLabel="Ask us directly" />
    </>
  );
}
