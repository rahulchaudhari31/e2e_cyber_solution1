import { cx } from '../../utils/cx';

const alignments = {
  left: 'text-left items-start',
  center: 'text-center items-center mx-auto',
  right: 'text-right items-end ml-auto',
};

export default function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = 'left',
  light = true,
  className,
  actions,
}) {
  return (
    <div className={cx('flex flex-col gap-5', alignments[align], className)}>
      {eyebrow && <span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-300">{eyebrow}</span>}
      <h2
        id={id}
        className={cx(
          'max-w-3xl text-balance font-display text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-5xl',
          align === 'center' && 'mx-auto',
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cx('max-w-2xl text-base leading-relaxed sm:text-lg', light ? 'text-slate-400' : 'text-slate-600')}>
          {description}
        </p>
      )}
      {actions && <div className="flex flex-wrap gap-3 pt-2">{actions}</div>}
    </div>
  );
}
