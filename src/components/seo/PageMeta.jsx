import { Helmet } from 'react-helmet-async';
import { absoluteUrl, defaultSeo } from '../../data/seo';

export default function PageMeta({
  title,
  description = defaultSeo.description,
  path = '/',
  image = defaultSeo.image,
  type = 'website',
  publishedTime,
  noindex = false,
}) {
  const resolvedTitle = title
    ? defaultSeo.titleTemplate.replace('%s', title)
    : defaultSeo.title;
  const url = absoluteUrl(path);
  const resolvedImage = /^https?:\/\//.test(image) ? image : absoluteUrl(image);

  return (
    <Helmet>
      <html lang="en" />
      <title>{resolvedTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={defaultSeo.title} />
      <meta property="og:locale" content={defaultSeo.locale} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={resolvedImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedImage} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
    </Helmet>
  );
}
