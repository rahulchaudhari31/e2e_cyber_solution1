import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import siteContent from '../../data/siteContent';
import { pathFromSourceHref } from '../../utils/content';
import { Badge, Button, Container, Reveal, SectionHeading } from '../ui';

const images = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=72',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=72',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=72',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=72',
];

const alts = [
  'Analytics dashboard representing a marketing project',
  'Team collaborating on a web design project',
  'Creative studio representing a branding project',
  'Marketing workshop representing a campaign project',
];

const projects = siteContent.services.slice(0, 4).map((service, index) => ({
  title: service.name,
  description: service.description,
  path: pathFromSourceHref(service.sourceHref),
  image: images[index],
  alt: alts[index],
}));

const portfolioIntro = `${siteContent.portfolio.mentions[0].split('. ')[0]}.`;

export default function WorkPreview() {
  return (
    <section aria-labelledby="work-heading" className="section-shell">
      <Container>
        <Reveal>
          <SectionHeading
            id="work-heading"
            align="center"
            eyebrow="Featured work"
            title="Design that moves people. Strategy that moves business."
            description={portfolioIntro}
          />
          <p className="mx-auto mt-5 max-w-2xl text-center text-[11px] text-slate-600">
            Concept previews only — replace with approved case studies before launch.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.08}>
              <article className="surface-card group relative overflow-hidden p-3">
                <Link
                  to={project.path}
                  aria-label={`View ${project.title} service details`}
                  className="block focus-visible:outline-none"
                >
                  <div className="relative overflow-hidden rounded-3xl">
                    <img
                      src={project.image}
                      alt={project.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-72 w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105 sm:h-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
                    <div className="absolute left-5 top-5">
                      <Badge variant="accent">Portfolio placeholder</Badge>
                    </div>
                    <div className="absolute inset-x-6 bottom-6">
                      <h3 className="text-xl font-semibold text-white sm:text-2xl">{project.title}</h3>
                      <div className="mt-2 translate-y-2 opacity-0 transition-all duration-500 ease-smooth group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                        <p className="line-clamp-2 text-sm leading-relaxed text-slate-300">{project.description}</p>
                        <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-primary-200">
                          Learn more <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-12 flex justify-center">
            <Button to="/portfolio" variant="outline" size="lg" iconRight={<ArrowUpRight className="h-4 w-4" />}>
              View all case studies
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
