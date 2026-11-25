import { useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { ArrowUpRight, Layers3 } from 'lucide-react';
import siteContent from '../data/siteContent';
import { CTASection, PageBanner } from '../components/sections';
import { PageMeta } from '../components/seo';
import { Badge, Button, Container, Modal, Reveal, SectionHeading } from '../components/ui';
import { findServiceGroup, pathFromSourceHref } from '../utils/content';

const { portfolio, services, servicePages, stats } = siteContent;

const projectImages = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=72',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=72',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=72',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=72',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=72',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=72',
];

const projects = services.map((service, index) => {
  const legacyPath = pathFromSourceHref(service.sourceHref);
  const servicePage = servicePages.find((page) => page.path === legacyPath);
  const category = findServiceGroup(legacyPath)?.label || 'Services';
  const challengeSentence = portfolio.mentions[index % portfolio.mentions.length].split('. ')[0];

  return {
    id: legacyPath.replace(/^\//, ''),
    title: `${service.name} case study`,
    category,
    image: projectImages[index % projectImages.length],
    alt: `Dummy image representing a ${service.name} project`,
    summary: service.description,
    challenge: `${challengeSentence}.`,
    solution: servicePage?.paragraphs[0] || service.description,
    results: [
      { value: '+120%', label: 'engagement', note: 'Illustrative metric' },
      { value: stats[0].value, label: 'clients supported', note: 'Source claim' },
      { value: '10+ years', label: 'digital experience', note: 'Source claim' },
    ],
  };
});

const categories = ['All', ...new Set(projects.map((project) => project.category))];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const visibleProjects = useMemo(
    () =>
      activeCategory === 'All'
        ? projects
        : projects.filter((project) => project.category === activeCategory),
    [activeCategory],
  );

  return (
    <>
      <PageMeta
        title="Portfolio"
        description="Illustrative digital projects and case studies based on the e2e Cyber Solutions service areas."
        path="/portfolio"
      />
      <PageBanner
        eyebrow="Portfolio / Case studies"
        title="Work shaped by strategy."
        description="Illustrative case studies built from the service areas described on the original site. No client case-study pages were provided in the source content."
        image="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=72"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Portfolio', to: '/portfolio' },
        ]}
      >
        <Button to="/contact" size="lg" iconRight={<ArrowUpRight className="h-4 w-4" />}>
          Start your project
        </Button>
      </PageBanner>

      <section aria-labelledby="portfolio-intro-heading" className="section-shell">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-hero-glow opacity-50" />
        <Container className="relative">
          <Reveal>
            <SectionHeading
              id="portfolio-intro-heading"
              eyebrow="Selected work"
              title="Design, development and growth—shown in context."
              description={portfolio.mentions[0]}
            />
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="portfolio-filter-heading" className="section-shell border-y border-white/[0.06] bg-ink-900/40">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                id="portfolio-filter-heading"
                eyebrow="Filter work"
                title="Explore by discipline."
              />
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Portfolio categories">
                {categories.map((category) => {
                  const isActive = activeCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveCategory(category)}
                      className={`relative rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                        isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="portfolio-active-tab"
                          className="absolute inset-0 rounded-full bg-primary-gradient shadow-glow"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{category}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <LayoutGroup>
            <motion.div
              layout
              role="tabpanel"
              aria-label={`${activeCategory} projects`}
              className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {visibleProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.94, y: 22 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: -14 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      aria-label={`View ${project.title} details`}
                      className="surface-card group block h-full w-full overflow-hidden text-left"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.alt}
                          loading="lazy"
                          decoding="async"
                          className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent opacity-80" />
                        <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-3">
                          <Badge variant="glass">{project.category}</Badge>
                          <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-ink-900/70 text-white backdrop-blur transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                            <ArrowUpRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold">{project.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-slate-400">{project.summary}</p>
                        <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-200">
                          View case study
                        </p>
                      </div>
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>

          {visibleProjects.length === 0 && (
            <p className="mt-10 text-sm text-slate-400">No projects in this category.</p>
          )}
        </Container>
      </section>

      <Modal
        open={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
        description="Placeholder case study — imagery and metrics are illustrative."
        size="lg"
        footer={
          <>
            <Button to="/contact" iconRight={<ArrowUpRight className="h-4 w-4" />}>
              Discuss a project
            </Button>
            <Button variant="outline" onClick={() => setSelectedProject(null)}>
              Close
            </Button>
          </>
        }
      >
        {selectedProject && (
          <div className="max-h-[65vh] space-y-7 overflow-y-auto pr-1">
            <img
              src={selectedProject.image}
              alt={selectedProject.alt}
              loading="lazy"
              decoding="async"
              className="h-56 w-full rounded-3xl border border-white/10 object-cover sm:h-72"
            />

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent-300">
                  <Layers3 className="h-4 w-4" />
                  Challenge
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{selectedProject.challenge}</p>
              </div>
              <div>
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-300">
                  <ArrowUpRight className="h-4 w-4" />
                  Solution
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{selectedProject.solution}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Results</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {selectedProject.results.map((result) => (
                  <div key={result.label + result.value} className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="font-display text-2xl font-semibold text-white">{result.value}</p>
                    <p className="mt-2 text-xs text-slate-300">{result.label}</p>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-slate-500">{result.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      <CTASection heading="Your project could be next." primaryLabel="Let's talk" />
    </>
  );
}
