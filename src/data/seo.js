import siteContent from './siteContent';

export const siteUrl = siteContent.meta.sourceSite.replace(/\/$/, '');

export const defaultSeo = {
  title: siteContent.company.name,
  titleTemplate: `%s | ${siteContent.company.name}`,
  description:
    'e2e Cyber Solutions builds websites, digital marketing campaigns, branding and content strategies that connect businesses with their audience.',
  image:
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=72',
  locale: 'en_GB',
};

export function absoluteUrl(path = '/') {
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: siteContent.company.name,
  url: siteUrl,
  description: siteContent.company.description,
  foundingDate: siteContent.company.foundedYear,
  telephone: siteContent.contact.phone,
  email: siteContent.contact.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteContent.contact.addressLines[0],
    addressLocality: 'Birmingham',
    postalCode: 'B28 8HN',
    addressCountry: 'GB',
  },
  sameAs: siteContent.socialLinks.filter((link) => !link.isPlaceholder).map((link) => link.href),
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteContent.company.name,
  url: siteUrl,
  inLanguage: 'en-GB',
  publisher: { '@id': `${siteUrl}/#organization` },
};
