import { cx } from '../../utils/cx';

const variants = {
  primary: 'border-primary-400/25 bg-primary-500/15 text-primary-100',
  accent: 'border-accent-400/25 bg-accent-500/15 text-accent-200',
  neutral: 'border-white/10 bg-white/[0.06] text-slate-300',
  glass: 'border-white/10 bg-white/[0.04] text-white backdrop-blur-xl',
};

export default function Badge({ variant = 'primary', dot = false, className, children }) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em]',
        variants[variant],
        className,
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
