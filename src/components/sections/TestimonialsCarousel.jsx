import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import siteContent from '../../data/siteContent';
import { Container, Reveal, SectionHeading } from '../ui';

const testimonials = siteContent.testimonials;
const AUTOPLAY_MS = 6000;

export default function TestimonialsCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (paused || reduceMotion) return undefined;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % testimonials.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [paused, reduceMotion]);

  const goTo = (direction) => {
    setActive((current) => (current + direction + testimonials.length) % testimonials.length);
  };

  const current = testimonials[active];

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="section-shell border-y border-white/[0.06] bg-ink-900/40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="testimonials-heading"
            align="center"
            eyebrow="Testimonials"
            title={siteContent.testimonialsHeading}
            description="Real words from teams we've helped build, launch and grow."
          />
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-4xl">
          <div
            role="group"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
            className="surface-card p-6 sm:p-10"
          >
            <figure>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Testimonial ${active + 1} of ${testimonials.length}`}
                  initial={{ opacity: 0, x: reduceMotion ? 0 : 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: reduceMotion ? 0 : -32 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Quote className="h-9 w-9 text-primary-300/70" />
                  <blockquote className="mt-6 font-display text-xl leading-relaxed text-white sm:text-2xl">
                    “{current.quote}”
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4">
                    <img
                      src={current.image}
                      alt={current.name}
                      loading="lazy"
                      decoding="async"
                      className="h-12 w-12 rounded-full border border-white/15 object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold text-white">{current.name}</p>
                      <p className="mt-1 text-xs text-slate-500">Verified client</p>
                    </div>
                  </figcaption>
                </motion.div>
              </AnimatePresence>
            </figure>

            <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2" role="group" aria-label="Choose a testimonial">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={testimonial.name}
                    type="button"
                    aria-label={`Show testimonial ${index + 1} from ${testimonial.name}`}
                    aria-current={active === index ? 'true' : undefined}
                    onClick={() => setActive(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      active === index ? 'w-8 bg-primary-gradient' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() => goTo(-1)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-primary-300/60 hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() => goTo(1)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-primary-300/60 hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="sr-only" aria-live="polite">
              Testimonial {active + 1} of {testimonials.length}: {current.name}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
