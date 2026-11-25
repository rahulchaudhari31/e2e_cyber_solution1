import { motion } from 'framer-motion';
import { cx } from '../../utils/cx';

export default function Reveal({
  as = 'div',
  className,
  children,
  delay = 0,
  y = 24,
  once = true,
  ...props
}) {
  const Component = motion[as] || motion.div;

  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}
