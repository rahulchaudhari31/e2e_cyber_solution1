import siteContent from '../data/siteContent';

const fallbackPaths = {
  'seo-optimization.php': '/seo',
  'content.php': '/content-writing',
  'service-detail.php': '/services',
  'services.php': '/services',
};

export function pathFromSourceHref(href) {
  if (!href || href === '#' || href.startsWith('http')) return '/services';

  const slug = href.split('/').pop();
  const route = siteContent.routes.find((item) => item.slug === slug || item.legacyPath === `/${slug}`);

  return route?.path || fallbackPaths[slug] || '/services';
}

export function serviceDetailPath(sourceHref) {
  const path = pathFromSourceHref(sourceHref);
  return path === '/services' ? '/services' : `/services/${path.replace(/^\//, '')}`;
}

export function getServicePageBySlug(slug) {
  return siteContent.servicePages.find((page) => page.path === `/${slug}`);
}

export function findServiceGroup(path) {
  const groups = siteContent.navigation.find((item) => item.label === 'Services')?.children || [];

  return groups.find(
    (group) =>
      group.path === path ||
      group.children?.some((child) => child.path === path),
  );
}

export function formatPhoneHref(phone) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}
