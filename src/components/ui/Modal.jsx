import { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cx } from '../../utils/cx';

const sizes = {
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-3xl',
};

export default function Modal({ open, onClose, title, description, children, footer, size = 'md' }) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-ink-950/80 backdrop-blur-md"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={cx(
              'relative z-10 w-full rounded-4xl border border-white/10 bg-ink-800 p-6 shadow-card sm:p-8',
              sizes[size],
            )}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-white/10 text-slate-400 transition hover:border-white/25 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            {title && (
              <h2 id={titleId} className="pr-10 text-2xl font-semibold sm:text-3xl">
                {title}
              </h2>
            )}
            {description && <p className="mt-3 text-sm leading-relaxed text-slate-400">{description}</p>}
            {children && <div className="mt-6">{children}</div>}
            {footer && <div className="mt-8 flex flex-wrap gap-3">{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
