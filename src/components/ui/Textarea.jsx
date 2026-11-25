import { forwardRef, useId } from 'react';
import { cx } from '../../utils/cx';

const Textarea = forwardRef(function Textarea(
  { label, id, name, rows = 5, error, className, containerClassName, ...props },
  ref,
) {
  const generatedId = useId();
  const textareaId = id || name || generatedId;

  return (
    <div className={cx('w-full', containerClassName)}>
      {label && (
        <label htmlFor={textareaId} className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        name={name}
        rows={rows}
        aria-label={props['aria-label'] || label}
        aria-invalid={Boolean(error)}
        className={cx(
          'w-full resize-none rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3.5 text-sm text-white placeholder:text-slate-500 transition-all duration-300 hover:border-white/20 focus:border-primary-400/70 focus:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-primary-500/20',
          error && 'border-rose-400/70',
          className,
        )}
        {...props}
      />
      {error && <p className="mt-2 text-xs text-rose-300">{error}</p>}
    </div>
  );
});

export default Textarea;
