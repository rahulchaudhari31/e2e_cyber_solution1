import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { ArrowUpRight, Clock3, Search, Sparkles } from 'lucide-react';
import { blogPosts, getReadingTime } from '../data/blogPosts';
import { CTASection, PageBanner } from '../components/sections';
import { PageMeta } from '../components/seo';
import { Badge, Container, Input, Reveal, SectionHeading } from '../components/ui';
import { cx } from '../utils/cx';

const categories = ['All', ...new Set(blogPosts.map((post) => post.category))];

function PostCard({ post }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="surface-card group overflow-hidden"
    >
      <Link to={`/blog/${post.slug}`} className="block focus-visible:outline-none">
        <div className="relative overflow-hidden">
          <img
            src={post.image}
            alt={`Dummy image for ${post.title}`}
            loading="lazy"
            decoding="async"
            className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent opacity-70" />
          <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-3">
            <Badge variant="glass">{post.category}</Badge>
            <ArrowUpRight className="h-5 w-5 text-white transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>
        <div className="p-6">
          <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-slate-500">
            <Clock3 className="h-3.5 w-3.5" />
            {post.date} · {getReadingTime(post)} min read
          </p>
          <h3 className="mt-4 text-lg font-semibold transition-colors group-hover:text-white">{post.title}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-400">{post.excerpt}</p>
        </div>
      </Link>
    </motion.article>
  );
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');

  const filteredPosts = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return blogPosts.filter((post) => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      const haystack = `${post.title} ${post.excerpt} ${post.category}`.toLowerCase();
      return matchesCategory && (!needle || haystack.includes(needle));
    });
  }, [activeCategory, query]);

  const featuredPost = filteredPosts.find((post) => post.featured);
  const gridPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <>
      <PageMeta
        title="Insights"
        description="Digital strategy, design, development, marketing and content guidance from the e2e Cyber Solutions team."
        path="/blog"
      />
      <PageBanner
        eyebrow="Blog"
        title="Ideas for better digital."
        description="Dummy articles shaped around the services and copy from the original site. No blog pages were found in the source crawl."
        image="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=72"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Blog', to: '/blog' },
        ]}
      >
        <Badge variant="accent">Dummy posts — replace before launch</Badge>
      </PageBanner>

      <section aria-labelledby="blog-filters-heading" className="section-shell">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-hero-glow opacity-45" />
        <Container className="relative">
          <Reveal>
            <SectionHeading
              id="blog-filters-heading"
              eyebrow="Explore"
              title="Find a useful idea."
              description="Filter by topic or search across titles, categories and summaries."
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Blog categories">
                {categories.map((category) => {
                  const isActive = activeCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveCategory(category)}
                      className={cx(
                        'rounded-full border px-4 py-2 text-xs font-semibold transition-all',
                        isActive
                          ? 'border-primary-300/50 bg-primary-500/15 text-white'
                          : 'border-white/10 text-slate-400 hover:border-white/25 hover:text-white',
                      )}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
              <div className="w-full lg:max-w-xs">
                <Input
                  name="blog-search"
                  type="search"
                  aria-label="Search blog posts"
                  placeholder="Search posts..."
                  icon={Search}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
            </div>
          </Reveal>

          {featuredPost && (
            <Reveal delay={0.12}>
              <article className="surface-card mt-10 overflow-hidden lg:grid lg:grid-cols-[1.05fr_0.95fr]">
                <div className="relative min-h-[18rem] overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={`Dummy image for ${featuredPost.title}`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent lg:bg-gradient-to-r" />
                </div>
                <div className="p-7 sm:p-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="accent">Featured</Badge>
                    <Badge variant="neutral">{featuredPost.category}</Badge>
                  </div>
                  <h2 className="mt-6 text-balance font-display text-2xl font-semibold sm:text-3xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-slate-400">{featuredPost.excerpt}</p>
                  <p className="mt-5 flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-slate-500">
                    <Clock3 className="h-3.5 w-3.5" />
                    {featuredPost.date} · {getReadingTime(featuredPost)} min read
                  </p>
                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary-200 transition-colors hover:text-white"
                  >
                    Read article <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          )}

          <LayoutGroup>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {gridPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </AnimatePresence>
            </div>
          </LayoutGroup>

          {filteredPosts.length === 0 && (
            <div className="surface-card mt-10 p-10 text-center">
              <Sparkles className="mx-auto h-6 w-6 text-accent-300" />
              <p className="mt-4 text-sm text-slate-400">No posts match that search.</p>
            </div>
          )}
        </Container>
      </section>

      <CTASection heading="Want help putting these ideas to work?" />
    </>
  );
}
