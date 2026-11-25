import siteContent from './siteContent';

const { about, company, home, services } = siteContent;

const editorialTeam = {
  name: 'e2e Editorial Team',
  role: 'Placeholder author',
  avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=200&q=72',
};

const serviceParagraph = (path) =>
  siteContent.servicePages.find((page) => page.path === path)?.paragraphs[0] || '';

export const blogPosts = [
  {
    slug: 'digital-strategy-that-connects',
    title: 'Digital strategy that connects brand and audience',
    category: 'Strategy',
    date: '26 Nov 2026',
    featured: true,
    isDummy: true,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=72',
    excerpt: company.description,
    author: editorialTeam,
    sections: [
      {
        heading: 'Start with the gap',
        paragraphs: [
          company.description,
          'As the digital wing of the e2e World—e2e Cyber Solutions is an integrated web development, marketing agency with digital at its core.',
        ],
      },
      {
        heading: 'Build the right avenues',
        paragraphs: [
          about.highlights[0],
          home.process[0].description,
        ],
        list: ['Brand positioning', 'Audience research', 'Channel planning', 'Conversion goals'],
      },
      {
        heading: 'Measure and refine',
        paragraphs: [about.highlights[2], home.process[3].description],
      },
    ],
  },
  {
    slug: 'responsive-web-design-checklist',
    title: 'A practical checklist for responsive web design',
    category: 'Design',
    date: '18 Nov 2026',
    isDummy: true,
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=72',
    excerpt:
      'Our web design will facilitate the user-journey by creating a design that is functional, easy on the eyes and responsive to all screen sizes.',
    author: editorialTeam,
    sections: [
      {
        heading: 'Design for the journey',
        paragraphs: [
          siteContent.portfolio.mentions[0],
          home.process[1].description,
        ],
      },
      {
        heading: 'Check every touchpoint',
        paragraphs: [serviceParagraph('/web-design')],
        list: ['Layout', 'Navigation', 'Content', 'Performance'],
      },
    ],
  },
  {
    slug: 'ecommerce-experiences-that-convert',
    title: 'Ecommerce experiences built to convert',
    category: 'Design',
    date: '09 Nov 2026',
    isDummy: true,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=72',
    excerpt: serviceParagraph('/ecommerce-websites'),
    author: editorialTeam,
    sections: [
      {
        heading: 'Agile and user-friendly',
        paragraphs: [serviceParagraph('/ecommerce-websites'), about.highlights[1]],
      },
      {
        heading: 'Keep the path clear',
        paragraphs: [home.process[2].description, about.highlights[3]],
      },
    ],
  },
  {
    slug: 'seo-and-content-working-together',
    title: 'Why SEO and content work better together',
    category: 'Marketing',
    date: '31 Oct 2026',
    isDummy: true,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=72',
    excerpt: 'Ace SEO Support That Can Resultin Engagement, Growth and Conversion.',
    author: editorialTeam,
    sections: [
      {
        heading: 'Visibility is only the start',
        paragraphs: [siteContent.servicePages.find((page) => page.path === '/seo')?.paragraphs[0] || '', about.highlights[2]],
      },
      {
        heading: 'Content earns attention',
        paragraphs: [services[4].description, home.process[4].description],
      },
    ],
  },
  {
    slug: 'content-that-keeps-people-engaged',
    title: 'Content that keeps people engaged',
    category: 'Content',
    date: '22 Oct 2026',
    isDummy: true,
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=72',
    excerpt: 'Creative and strategic content for your brand across all formats and devices.',
    author: editorialTeam,
    sections: [
      {
        heading: 'Write for people first',
        paragraphs: [services[4].description, about.highlights[0]],
      },
      {
        heading: 'Match the format to the channel',
        paragraphs: [home.process[4].description, company.footerDescription],
      },
    ],
  },
  {
    slug: 'from-strategy-to-launch',
    title: 'From strategy to launch: how we work',
    category: 'Development',
    date: '14 Oct 2026',
    isDummy: true,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=72',
    excerpt: home.process[0].description,
    author: editorialTeam,
    sections: [
      {
        heading: 'Five clear stages',
        paragraphs: home.process.map((step) => `${step.title}: ${step.description}`),
      },
      {
        heading: 'Built for what comes next',
        paragraphs: [about.highlights[1], siteContent.portfolio.mentions[1]],
      },
    ],
  },
];

export function getPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(post, limit = 3) {
  const sameCategory = blogPosts.filter(
    (item) => item.slug !== post.slug && item.category === post.category,
  );
  const others = blogPosts.filter((item) => item.slug !== post.slug && item.category !== post.category);

  return [...sameCategory, ...others].slice(0, limit);
}

export function getReadingTime(post) {
  const words = post.sections
    .flatMap((section) => [
      section.heading,
      ...(section.paragraphs || []),
      ...(section.list || []),
    ])
    .join(' ')
    .trim()
    .split(/\s+/).length;

  return Math.max(1, Math.ceil(words / 200));
}
