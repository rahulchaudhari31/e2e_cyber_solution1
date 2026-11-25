import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

export default function CountUp({ value, suffix = '', duration = 1.8 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      return undefined;
    }

    if (!inView) return undefined;

    let frame;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, reduceMotion]);

  return (
    <span ref={ref}>
      <span aria-hidden="true">{display.toLocaleString()}{suffix}</span>
      <span className="sr-only">{value.toLocaleString()}{suffix}</span>
    </span>
  );
}
