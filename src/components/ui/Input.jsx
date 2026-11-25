import { forwardRef, useId } from 'react';
import { cx } from '../../utils/cx';

const fieldStyles =
  'w-full rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3.5 text-sm text-white placeholder:text-slate-500 transition-all duration-300 hover:border-white/20 focus:border-primary-400/70 focus:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-primary-500/20';

const Input = forwardRef(function Input(
  { label, id, name, type = 'text', icon: Icon, error, className, containerClassName, ...props },
  ref,
) {
  const generatedId = useId();
  const inputId = id || name || generatedId;

  return (
    <div className={cx('w-full', containerClassName)}>
      {label && (
        <label htmlFor={inputId} className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        )}
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          aria-label={props['aria-label'] || label}
          aria-invalid={Boolean(error)}
          className={cx(fieldStyles, Icon && 'pl-11', error && 'border-rose-400/70', className)}
          {...props}
        />
      </div>
      {error && <p className="mt-2 text-xs text-rose-300">{error}</p>}
    </div>
  );
});

export default Input;
