import { Badge, Container, GlowOrb, Reveal } from '../ui';
import { cx } from '../../utils/cx';

export default function PageHero({ eyebrow, title, description, children, className }) {
  return (
    <section className={cx('relative overflow-hidden pb-14 pt-20 sm:pb-20 sm:pt-28', className)}>
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div className="pointer-events-none absolute inset-0 bg-grid-fade opacity-60" />
      <GlowOrb tone="primary" className="-left-48 -top-40 h-[28rem] w-[28rem]" />

      <Container className="relative">
        {eyebrow && (
          <Reveal>
            <Badge dot>{eyebrow}</Badge>
          </Reveal>
        )}
        <Reveal delay={0.08}>
          <h1 className="mt-6 max-w-4xl text-balance font-display text-[clamp(2.75rem,6.5vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">{description}</p>
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
