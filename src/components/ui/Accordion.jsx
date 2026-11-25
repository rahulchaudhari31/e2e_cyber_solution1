import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cx } from '../../utils/cx';

export default function Accordion({ items, defaultOpen = 0, allowMultiple = false, className }) {
  const baseId = useId();
  const [openItems, setOpenItems] = useState(() =>
    allowMultiple ? (defaultOpen === null ? [] : [defaultOpen]) : defaultOpen === null ? [] : [defaultOpen],
  );

  const toggle = (index) => {
    setOpenItems((current) => {
      if (current.includes(index)) {
        return current.filter((item) => item !== index);
      }
      return allowMultiple ? [...current, index] : [index];
    });
  };

  return (
    <div className={cx('divide-y divide-white/10', className)}>
      {items.map((item, index) => {
        const isOpen = openItems.includes(index);
        const contentId = `${baseId}-${index}`;

        return (
          <div key={item.title || item.question || index}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={contentId}
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-white"
            >
              <span className="font-display text-base font-medium text-white sm:text-lg">
                {item.title || item.question}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-primary-300"
              >
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={contentId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pr-12 text-sm leading-relaxed text-slate-400">
                    {item.content || item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
