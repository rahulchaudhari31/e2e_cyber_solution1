import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 520, damping: 38, mass: 0.32 });
  const springY = useSpring(y, { stiffness: 520, damping: 38, mass: 0.32 });

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const query = window.matchMedia('(pointer: fine)');
    const update = () => setEnabled(query.matches && !reduceMotion);
    update();
    query.addEventListener?.('change', update);
    return () => query.removeEventListener?.('change', update);
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) return undefined;

    document.body.classList.add('has-custom-cursor');

    const handleMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      setActive(Boolean(event.target.closest?.('a, button, input, select, textarea, [role="button"]')));
    };
    const handleLeave = () => setVisible(false);

    window.addEventListener('pointermove', handleMove, { passive: true });
    document.addEventListener('pointerleave', handleLeave);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerleave', handleLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[300]"
      style={{ x: springX, y: springY }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.18 }}
    >
      <motion.div
        className="-ml-3 -mt-3 h-6 w-6 rounded-full border border-primary-200/80 bg-primary-400/10 backdrop-blur-sm"
        animate={{ scale: active ? 1.85 : 1, borderColor: active ? '#FFBC7D' : '#CBC3FF' }}
        transition={{ type: 'spring', stiffness: 420, damping: 26 }}
      >
        <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      </motion.div>
    </motion.div>
  );
}
