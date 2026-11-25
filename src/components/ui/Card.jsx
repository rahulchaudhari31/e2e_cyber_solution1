import { motion, useReducedMotion, useSpring } from 'framer-motion';
import { cx } from '../../utils/cx';

export default function Card({
  as = 'div',
  className,
  children,
  hover = true,
  glow = false,
  onPointerMove,
  onPointerLeave,
  style,
  ...props
}) {
  const Component = motion[as] || motion.div;
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 260, damping: 24 });
  const rotateY = useSpring(0, { stiffness: 260, damping: 24 });

  const handlePointerMove = (event) => {
    onPointerMove?.(event);
    if (reduceMotion || event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-y * 7);
    rotateY.set(x * 7);
  };

  const handlePointerLeave = (event) => {
    onPointerLeave?.(event);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <Component
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hover ? { y: -7 } : undefined}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 900, ...style }}
      className={cx('surface-card relative overflow-hidden', glow && 'hover:shadow-lift', className)}
      {...props}
    >
      {glow && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary-500/20 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        />
      )}
      {children}
    </Component>
  );
}
