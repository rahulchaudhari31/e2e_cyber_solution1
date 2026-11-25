import {
  ArrowUpRight,
  Chrome,
  Code2,
  Facebook,
  Linkedin,
  Sparkles,
  Target,
  TrendingUp,
  Twitter,
  Youtube,
} from 'lucide-react';
import siteContent from '../data/siteContent';
import { CTASection, PageBanner } from '../components/sections';
import { PageMeta } from '../components/seo';
import { Badge, Button, Card, Container, Reveal, SectionHeading } from '../components/ui';

const { about, company, stats, socialLinks } = siteContent;

const valueIcons = [Sparkles, Code2, TrendingUp, Target];

const values = about.highlights.map((highlight) => {
  const [title, ...rest] = highlight.split('.');
  return {
    title: title.trim(),
    description: rest.length ? `${rest.join('.').trim()}.` : highlight,
  };
});

const socialIcons = {
  facebook: Facebook,
  twitter: Twitter,
  google: Chrome,
  'youtube-play': Youtube,
  linkedin: Linkedin,
};

const teamPortraits = [
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=72',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=72',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=72',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=72',
];

const team = teamPortraits.map((portrait, index) => ({
  name: `Team member ${String(index + 1).padStart(2, '0')}`,
  role: 'Placeholder role',
  portrait,
}));

const aboutSentences = about.paragraphs[0].split('. ');

const milestones = [
  {
    year: company.foundedYear,
    title: 'Founded',
    description: `As the digital wing of the e2e World—e2e Cyber Solutions is an integrated web development, marketing agency with digital at its core.`,
    source: 'Provided for this rebuild',
  },
  {
    year: 'Over the last decade',
    title: 'The digital shift',
    description: `${aboutSentences[1] || aboutSentences[0]}.`,
    source: 'Source claim',
  },
  {
    year: '1,000+',
    title: 'Clients supported',
    description: `“${stats[0].value} to our credit.”`,
    source: 'Source claim',
  },
  {
    year: 'Today',
    title: 'Integrated solutions',
    description: company.footerDescription.split('. ')[0] + '.',
    source: 'From source copy',
  },
];

export default function About() {
  return (
    <>
      <PageMeta title="About" description={about.statement} path="/about" />
      <PageBanner
        eyebrow={about.subtitle}
        title={about.title}
        description={about.statement}
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=72"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'About', to: '/about' },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button to="/contact" size="lg" iconRight={<ArrowUpRight className="h-4 w-4" />}>
            Work with us
          </Button>
          <Button to="/services" variant="outline" size="lg">
            Explore services
          </Button>
          <Badge variant="accent" className="ml-1">
            Founded {company.foundedYear}
          </Badge>
        </div>
      </PageBanner>

      <section aria-labelledby="about-story-heading" className="relative py-16 sm:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-hero-glow opacity-50" />
        <Container className="relative grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="overflow-hidden rounded-5xl border border-white/10 bg-white/[0.04] p-3">
              <img
                src={about.image}
                alt="e2e Cyber Solutions agency image"
                loading="lazy"
                decoding="async"
                className="h-[26rem] w-full rounded-4xl object-cover opacity-90 sm:h-[34rem]"
              />
            </div>
            <div className="glass absolute -bottom-6 -right-4 max-w-[16rem] rounded-3xl p-5 shadow-card sm:-right-8 sm:max-w-[19rem]">
              <Sparkles className="h-5 w-5 text-accent-300" />
              <p className="mt-3 font-display text-xl font-semibold text-white">
                Founded {company.foundedYear}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">Digital at our core.</p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <SectionHeading
              id="about-story-heading"
              eyebrow="Our story"
              title={company.tagline}
              description={company.description}
            />
            <p className="mt-6 text-sm leading-7 text-slate-400">{about.paragraphs[0]}</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.value} className="surface-card p-5">
                  <p className="font-display text-base font-semibold text-white">
                    {stat.value.charAt(0).toUpperCase() + stat.value.slice(1)}
                  </p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-slate-500">From the source</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="about-values-heading" className="section-shell border-y border-white/[0.06] bg-ink-900/40">
        <Container>
          <Reveal>
            <SectionHeading
              id="about-values-heading"
              eyebrow="What we value"
              title="Creative, contemporary and credible."
              description="The principles that shape how we build, write, design and grow."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = valueIcons[index] || Sparkles;
              return (
                <Card key={value.title} as="article" className="p-6" glow>
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-primary-400/20 bg-primary-500/10 text-primary-200">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      <section aria-labelledby="about-team-heading" className="section-shell">
        <Container>
          <Reveal>
            <SectionHeading
              id="about-team-heading"
              align="center"
              eyebrow="Our people"
              title="The team behind the work."
              description="Individual profiles were not available in the source content, so these portraits are placeholders."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <Reveal key={member.name} delay={index * 0.07}>
                <article className="surface-card group overflow-hidden">
                  <div className="relative">
                    <img
                      src={member.portrait}
                      alt={`Dummy portrait for ${member.name} placeholder`}
                      loading="lazy"
                      decoding="async"
                      className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent opacity-80" />
                    <div className="absolute inset-x-4 bottom-4 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                      {socialLinks.map((social) => {
                        const Icon = socialIcons[social.label.toLowerCase()] || ArrowUpRight;
                        return (
                          <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${member.name} ${social.label} placeholder profile`}
                            className="grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-ink-900/80 text-slate-200 backdrop-blur transition-colors hover:border-primary-300/60 hover:text-white"
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-semibold">{member.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">{member.role}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="about-milestones-heading" className="section-shell border-y border-white/[0.06] bg-ink-900/40">
        <Container>
          <Reveal>
            <SectionHeading
              id="about-milestones-heading"
              eyebrow="Our journey"
              title="Milestones that shaped the agency."
              description="A blend of provided details and claims taken from the original site copy."
            />
          </Reveal>
          <ol className="relative mt-12 space-y-6 border-l border-white/10 pl-8 sm:pl-12">
            {milestones.map((milestone, index) => (
              <Reveal as="li" key={milestone.year + milestone.title} delay={index * 0.07} className="relative">
                <span className="absolute -left-[2.15rem] top-2 grid h-7 w-7 place-items-center rounded-full border border-primary-300/40 bg-ink-900 font-display text-[10px] text-primary-200 sm:-left-[3.1rem]">
                  {index + 1}
                </span>
                <div className="surface-card p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-display text-xl font-semibold text-primary-200">{milestone.year}</p>
                    <Badge variant={milestone.source === 'Source claim' ? 'accent' : 'neutral'}>{milestone.source}</Badge>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold">{milestone.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{milestone.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <CTASection heading="Let's build your next chapter." primaryLabel="Start a conversation" />
    </>
  );
}
