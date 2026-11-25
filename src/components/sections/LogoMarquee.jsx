import siteContent from '../../data/siteContent';

const labels = siteContent.services.map((service) => service.name);
const marqueeItems = [...labels, ...labels];

export default function LogoMarquee() {
  return (
    <section aria-labelledby="trusted-heading" className="relative border-y border-white/[0.07] bg-ink-900/50 py-12">
      <div className="mx-auto max-w-7xl px-5 text-center sm:px-8 lg:px-12">
        <h2 id="trusted-heading" className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
          Trusted by teams building with
        </h2>
        <p className="mt-2 text-[11px] text-slate-600">
          Client logo placeholders — replace with approved client logos before launch.
        </p>
      </div>

      <div className="group relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-14 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
          {marqueeItems.map((label, index) => (
            <span
              key={`${label}-${index}`}
              aria-hidden="true"
              className="flex-none font-display text-lg font-semibold tracking-tight text-slate-500 transition-colors duration-300 hover:text-white sm:text-xl"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
