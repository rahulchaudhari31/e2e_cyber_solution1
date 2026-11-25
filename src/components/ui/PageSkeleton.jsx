import Container from './Container';

export default function PageSkeleton() {
  return (
    <div className="fixed inset-0 z-[95] overflow-hidden bg-ink" role="status" aria-label="Loading page">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-40" />
      <Container className="relative pt-32">
        <div className="h-4 w-40 animate-pulse rounded-full bg-white/10" />
        <div className="mt-8 h-14 w-2/3 max-w-2xl animate-pulse rounded-3xl bg-white/10" />
        <div className="mt-5 h-4 w-full max-w-xl animate-pulse rounded-full bg-white/[0.07]" />
        <div className="mt-3 h-4 w-4/5 max-w-lg animate-pulse rounded-full bg-white/[0.07]" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-44 animate-pulse rounded-4xl border border-white/[0.06] bg-white/[0.04]"
              style={{ animationDelay: `${index * 80}ms` }}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
