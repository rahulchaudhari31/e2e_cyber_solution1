import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { useConsultation } from '../../context/ConsultationContext';
import { cx } from '../../utils/cx';

const variants = {
  primary:
    'bg-primary-gradient text-white shadow-glow hover:shadow-[0_28px_80px_-28px_rgba(109,94,248,0.9)]',
  ghost:
    'border border-white/10 bg-white/[0.06] text-white hover:border-white/20 hover:bg-white/[0.12]',
  outline:
    'border border-white/20 text-white hover:border-primary-300/70 hover:bg-primary-500/10',
  accent:
    'bg-accent-gradient text-ink-950 shadow-[0_20px_60px_-30px_rgba(249,129,43,0.9)] hover:shadow-[0_28px_70px_-28px_rgba(249,129,43,0.8)]',
};

const sizes = {
  sm: 'h-10 px-4 text-xs',
  md: 'h-12 px-6 text-sm',
  lg: 'h-14 px-7 text-sm sm:text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  icon,
  iconRight,
  fullWidth = false,
  consultation = false,
  type = 'button',
  onClick,
  onPointerMove,
  onPointerLeave,
  className,
  children,
  ...props
}) {
  const { openConsultation } = useConsultation();
  const reduceMotion = useReducedMotion();
  const buttonRef = useRef(null);
  const opensConsultation = consultation || to === '/contact';

  const handlePointerMove = (event) => {
    onPointerMove?.(event);
    if (reduceMotion || event.pointerType === 'touch' || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
    buttonRef.current.style.setProperty('--mag-x', `${x.toFixed(2)}px`);
    buttonRef.current.style.setProperty('--mag-y', `${y.toFixed(2)}px`);
  };

  const handlePointerLeave = (event) => {
    onPointerLeave?.(event);
    if (!buttonRef.current) return;
    buttonRef.current.style.setProperty('--mag-x', '0px');
    buttonRef.current.style.setProperty('--mag-y', '0px');
  };

  const classes = cx(
    'group magnetic relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-wide transition-all duration-300 ease-smooth',
    'hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className,
  );

  const pointerProps = {
    ref: buttonRef,
    onPointerMove: handlePointerMove,
    onPointerLeave: handlePointerLeave,
  };

  const content = (
    <>
      {icon && <span className="transition-transform duration-300 group-hover:-translate-x-0.5">{icon}</span>}
      <span className="relative z-10">{children}</span>
      {iconRight && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">{iconRight}</span>
      )}
    </>
  );

  if (opensConsultation) {
    return (
      <button
        type={type}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) openConsultation();
        }}
        aria-haspopup="dialog"
        className={classes}
        {...pointerProps}
        {...props}
      >
        {content}
      </button>
    );
  }

  if (to) {
    return (
      <Link to={to} className={classes} {...pointerProps} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...pointerProps} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...pointerProps} {...props}>
      {content}
    </button>
  );
}
