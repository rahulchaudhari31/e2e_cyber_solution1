import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Clock3, Facebook, Linkedin, Link2, Share2, Twitter } from 'lucide-react';
import { getPostBySlug, getReadingTime, getRelatedPosts } from '../data/blogPosts';
import { CTASection, PageBanner } from '../components/sections';
import { PageMeta, StructuredData } from '../components/seo';
import { Badge, Container, Reveal, SectionHeading } from '../components/ui';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const encodedUrl = encodeURIComponent(typeof window === 'undefined' ? '' : window.location.href);
  const encodedTitle = encodeURIComponent(post.title);
  const shareLinks = [
    {
      label: 'Share on X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: Twitter,
    },
    {
      label: 'Share on LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
    },
    {
      label: 'Share on Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Facebook,
    },
  ];

  const handleNativeShare = async () => {
    if (!navigator.share) return;
    try {
      await navigator.share({ title: post.title, text: post.excerpt, url: window.location.href });
    } catch {
      return;
    }
  };

  const publishedTime = Number.isNaN(Date.parse(post.date))
    ? undefined
    : new Date(post.date).toISOString();

  return (
    <>
      <PageMeta
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.image}
        type="article"
        publishedTime={publishedTime}
      />
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          image: post.image,
          datePublished: publishedTime,
          author: { '@type': 'Organization', name: post.author.name },
          publisher: { '@type': 'Organization', name: 'e2e Cyber Solutions' },
        }}
      />
      <PageBanner
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        image={post.image}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Blog', to: '/blog' },
          { label: post.title, to: `/blog/${post.slug}` },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="glass">{post.date}</Badge>
          <Badge variant="accent">{getReadingTime(post)} min read</Badge>
          {post.isDummy && <Badge variant="neutral">Dummy post</Badge>}
        </div>
      </PageBanner>

      <section aria-labelledby="blog-post-heading" className="section-shell">
        <Container className="grid gap-12 lg:grid-cols-[1fr_0.32fr]">
          <Reveal>
            <article>
              <h1 id="blog-post-heading" className="sr-only">
                {post.title}
              </h1>
              <div className="space-y-12">
                {post.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="font-display text-2xl font-semibold sm:text-3xl">{section.heading}</h2>
                    <div className="mt-5 space-y-4">
                      {section.paragraphs?.map((paragraph, index) => (
                        <p key={index} className="text-sm leading-7 text-slate-400 sm:text-base">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    {section.list?.length > 0 && (
                      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                        {section.list.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-slate-300"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-300" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

              <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary-200 transition-colors hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to blog
                </Link>
                <p className="text-xs text-slate-500">Dummy content — replace with approved articles before launch.</p>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <aside aria-label="Article information" className="space-y-5 lg:sticky lg:top-24">
              <div className="surface-card p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Author</p>
                <div className="mt-4 flex items-center gap-4">
                  <img
                    src={post.author.avatar}
                    alt={`Dummy avatar for ${post.author.name}`}
                    loading="lazy"
                    decoding="async"
                    className="h-14 w-14 rounded-2xl border border-white/10 object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">{post.author.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{post.author.role}</p>
                  </div>
                </div>
                <p className="mt-5 flex items-center gap-2 text-xs text-slate-400">
                  <Clock3 className="h-3.5 w-3.5 text-primary-300" />
                  {getReadingTime(post)} min read
                </p>
              </div>

              <div className="surface-card p-6">
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  <Share2 className="h-3.5 w-3.5" />
                  Share
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {shareLinks.map((share) => {
                    const Icon = share.icon;
                    return (
                      <a
                        key={share.label}
                        href={share.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={share.label}
                        className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-slate-400 transition-all hover:-translate-y-1 hover:border-primary-300/60 hover:text-white"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                  {typeof navigator !== 'undefined' && navigator.share && (
                    <button
                      type="button"
                      onClick={handleNativeShare}
                      aria-label="Share this article"
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-slate-400 transition-all hover:-translate-y-1 hover:border-primary-300/60 hover:text-white"
                    >
                      <Link2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </aside>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="related-posts-heading" className="section-shell border-y border-white/[0.06] bg-ink-900/40">
        <Container>
          <Reveal>
            <SectionHeading
              id="related-posts-heading"
              eyebrow="Keep reading"
              title="Related posts."
              description="More thinking from the same topics."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {getRelatedPosts(post).map((related, index) => (
              <Reveal key={related.slug} delay={index * 0.06}>
                <Link to={`/blog/${related.slug}`} className="surface-card group block h-full overflow-hidden">
                  <img
                    src={related.image}
                    alt={`Dummy image for ${related.title}`}
                    loading="lazy"
                    decoding="async"
                    className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="p-6">
                    <Badge variant="neutral">{related.category}</Badge>
                    <h3 className="mt-4 flex items-start justify-between gap-3 text-base font-semibold">
                      <span>{related.title}</span>
                      <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </h3>
                    <p className="mt-3 text-xs text-slate-500">{getReadingTime(related)} min read</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection heading="Ready to put this thinking to work?" />
    </>
  );
}
