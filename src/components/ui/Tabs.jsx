import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cx } from '../../utils/cx';

export default function Tabs({ tabs, defaultIndex = 0, className, tabClassName }) {
  const baseId = useId();
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div className={cx('w-full', className)}>
      <div role="tablist" className="scrollbar-none flex gap-2 overflow-x-auto border-b border-white/10 pb-px">
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={tab.label}
              type="button"
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${index}`}
              onClick={() => setActiveIndex(index)}
              className={cx(
                'relative shrink-0 px-4 py-3 text-sm font-medium transition-colors sm:px-5',
                isActive ? 'text-white' : 'text-slate-500 hover:text-slate-200',
                tabClassName,
              )}
            >
              {tab.icon && <span className="mr-2 inline-flex">{tab.icon}</span>}
              {tab.label}
              {isActive && (
                <motion.span
                  layoutId={`${baseId}-underline`}
                  className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary-gradient"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          role="tabpanel"
          id={`${baseId}-panel-${activeIndex}`}
          aria-labelledby={`${baseId}-tab-${activeIndex}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="pt-8"
        >
          {tabs[activeIndex]?.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
