import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
      className="fixed inset-x-0 top-0 z-[130] h-0.5 bg-gradient-to-r from-primary-400 via-primary-300 to-accent-400"
    />
  );
}
