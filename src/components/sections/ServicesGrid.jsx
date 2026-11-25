import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Code2,
  FileText,
  Megaphone,
  Palette,
  PenTool,
  Search,
  Sparkles,
} from 'lucide-react';
import siteContent from '../../data/siteContent';
import { pathFromSourceHref } from '../../utils/content';
import { Card, Container, Reveal, SectionHeading } from '../ui';

const serviceIcons = {
  Marketing: Megaphone,
  Development: Code2,
  'Web Design': PenTool,
  'SEO Optimization': Search,
  Content: FileText,
  Branding: Palette,
};

export default function ServicesGrid() {
  return (
    <section aria-labelledby="services-heading" className="section-shell">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-50" />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            id="services-heading"
            eyebrow="What we do"
            title="Everything your brand needs to grow online."
            description="Strategy, design, development and marketing — connected into one clear growth system."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {siteContent.services.map((service, index) => {
            const Icon = serviceIcons[service.name] || Sparkles;
            const path = pathFromSourceHref(service.sourceHref);

            return (
              <Card key={service.name} as="article" className="group p-7" glow>
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-primary-400/20 bg-primary-500/10 text-primary-200 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-xs text-slate-600">0{index + 1}</span>
                </div>
                <h3 className="mt-7 text-xl font-semibold">{service.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{service.description}</p>
                <Link
                  to={path}
                  aria-label={`Learn more about ${service.name}`}
                  className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-primary-200 transition-colors hover:text-white"
                >
                  Learn more
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
