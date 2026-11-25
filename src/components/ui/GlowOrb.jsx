import { cx } from '../../utils/cx';

const tones = {
  primary: 'bg-primary-500/30',
  accent: 'bg-accent-500/25',
  white: 'bg-white/10',
};

export default function GlowOrb({ tone = 'primary', className }) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        'pointer-events-none absolute rounded-full blur-[110px] animate-glow-pulse',
        tones[tone],
        className,
      )}
    />
  );
}
