import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    const target = document.getElementById(id);

    if (!target) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    }

    target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    target.focus?.({ preventScroll: true });
  }, [pathname, hash]);

  useEffect(() => {
    const handleClick = (event) => {
      const anchor = event.target.closest?.('a[href^="#"]');
      if (!anchor || anchor.getAttribute('href') === '#') return;

      const id = decodeURIComponent(anchor.getAttribute('href').slice(1));
      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
      target.focus?.({ preventScroll: true });
      window.history.replaceState(null, '', `#${id}`);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
