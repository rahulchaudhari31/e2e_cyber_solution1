import { useId } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Badge, Container, Reveal } from '../ui';
import { responsiveSrcSet } from '../../utils/images';

export default function PageBanner({
  eyebrow,
  title,
  description,
  image,
  breadcrumbs = [{ label: 'Home', to: '/' }],
  children,
}) {
  const titleId = useId();

  return (
    <section aria-labelledby={titleId} className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24">
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        {image && (
          <img
            src={image}
            srcSet={responsiveSrcSet(image)}
            sizes="100vw"
            alt=""
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink-950/80" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/85 to-primary-900/30" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-grid-fade opacity-40" />

      <Container className="relative">
        <Reveal>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
              {breadcrumbs.map((crumb, index) => (
                <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                  {index > 0 && <ChevronRight aria-hidden="true" className="h-3 w-3 text-slate-600" />}
                  {crumb.to ? (
                    <Link to={crumb.to} className="transition-colors hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </Reveal>

        <Reveal delay={0.08}>
          {eyebrow && (
            <div className="mt-8">
              <Badge dot>{eyebrow}</Badge>
            </div>
          )}
          <h1
            id={titleId}
            className="mt-5 max-w-4xl text-balance font-display text-[clamp(2.75rem,6vw,5rem)] font-semibold leading-[1.03] tracking-[-0.045em] text-white"
          >
            {title}
          </h1>
        </Reveal>

        {description && (
          <Reveal delay={0.14}>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">{description}</p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.2}>
            <div className="mt-8">{children}</div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
