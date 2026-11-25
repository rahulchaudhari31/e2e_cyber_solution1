import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { cx } from '../../utils/cx';

export default function Toast({ message, type = 'success', onClose }) {
  const isSuccess = type === 'success';

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={cx(
            'fixed bottom-6 right-6 z-[200] flex max-w-sm items-start gap-3 rounded-3xl border p-4 pr-3 shadow-card backdrop-blur-xl',
            isSuccess
              ? 'border-accent-400/25 bg-ink-800/95 text-slate-200'
              : 'border-rose-400/25 bg-ink-800/95 text-slate-200',
          )}
        >
          <span
            className={cx(
              'grid h-9 w-9 shrink-0 place-items-center rounded-full',
              isSuccess ? 'bg-accent-400/20 text-accent-200' : 'bg-rose-400/20 text-rose-200',
            )}
          >
            <CheckCircle2 className="h-4 w-4" />
          </span>
          <p className="pt-1 text-sm leading-relaxed">{message}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Dismiss notification"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-slate-500 transition-colors hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
