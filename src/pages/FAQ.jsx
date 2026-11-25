import siteContent from '../data/siteContent';
import { CTASection, PageBanner } from '../components/sections';
import { PageMeta, StructuredData } from '../components/seo';
import { Accordion, Badge, Container, Reveal, SectionHeading } from '../components/ui';

const { about, company, contact, home, portfolio, services } = siteContent;

const faqGroups = [
  {
    eyebrow: 'About us',
    title: 'Who we are',
    items: [
      { question: 'What does e2e Cyber Solutions do?', answer: company.description },
      {
        question: 'How long have you been working in digital?',
        answer: `Founded in ${company.foundedYear}. ${about.paragraphs[0]}`,
      },
      { question: 'What makes your approach different?', answer: about.highlights[0] },
    ],
  },
  {
    eyebrow: 'Services',
    title: 'Working with us',
    items: [
      {
        question: 'Which services can you help with?',
        answer: `${services.map((service) => service.name).join(', ')}.`,
      },
      {
        question: 'What does the process look like?',
        answer: home.process.map((step) => `${step.title}: ${step.description}`).join(' '),
      },
      {
        question: 'Do you work on websites and ecommerce?',
        answer: `${about.highlights[1]} ${portfolio.mentions[1]}`,
      },
    ],
  },
  {
    eyebrow: 'Getting started',
    title: 'Practical questions',
    items: [
      {
        question: 'How do I start a project?',
        answer: `${home.cta.paragraphs[0]} You can reach us at ${contact.email} or ${contact.phone}.`,
      },
      {
        question: 'Can you help with marketing and growth?',
        answer: `${about.highlights[2]} ${services[2].description}`,
      },
      {
        question: 'Where are you based?',
        answer: contact.addressLines.join(', '),
      },
    ],
  },
];

export default function FAQ() {
  return (
    <>
      <PageMeta
        title="FAQ"
        description="Answers about e2e Cyber Solutions, our services, process and Birmingham studio."
        path="/faq"
      />
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqGroups.flatMap((group) =>
            group.items.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: { '@type': 'Answer', text: item.answer },
            })),
          ),
        }}
      />
      <PageBanner
        eyebrow="FAQ"
        title="Questions answered."
        description="Answers assembled from the original site copy. No FAQ content was found in the source crawl, so these questions are placeholders."
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=72"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'FAQ', to: '/faq' },
        ]}
      >
        <Badge variant="accent">Source copy based</Badge>
      </PageBanner>

      <section aria-labelledby="faq-heading" className="section-shell">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-hero-glow opacity-45" />
        <Container className="relative">
          <Reveal>
            <SectionHeading
              id="faq-heading"
              align="center"
              eyebrow="Good to know"
              title="Everything you need to know."
              description="Choose a question to expand the answer."
            />
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-4xl gap-8">
            {faqGroups.map((group, index) => (
              <Reveal key={group.title} delay={index * 0.08}>
                <section aria-labelledby={`faq-group-${index}`}>
                  <div className="mb-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-300">
                      {group.eyebrow}
                    </span>
                    <h2 id={`faq-group-${index}`} className="mt-2 text-xl font-semibold sm:text-2xl">
                      {group.title}
                    </h2>
                  </div>
                  <div className="surface-card px-6 py-4 sm:px-8">
                    <Accordion items={group.items} defaultOpen={index === 0 ? 0 : null} />
                  </div>
                </section>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection heading="Still have a question?" primaryLabel="Ask us directly" />
    </>
  );
}
