import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout';
import siteContent from './data/siteContent';
import { legalContent } from './data/legalContent';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Legal = lazy(() => import('./pages/Legal'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:slug" element={<ServiceDetail />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="privacy-policy" element={<Legal legalDocument={legalContent.privacy} />} />
        <Route path="terms" element={<Legal legalDocument={legalContent.terms} />} />
        <Route path="contact" element={<Contact />} />

        {siteContent.servicePages.map((page) => (
          <Route key={page.path} path={page.path.replace(/^\//, '')} element={<ServiceDetail page={page} />} />
        ))}

        {siteContent.routes
          .filter(
            (route) =>
              route.legacyPath &&
              route.legacyPath !== route.path &&
              route.legacyPath !== '/service-detail.php',
          )
          .map((route) => (
            <Route
              key={route.legacyPath}
              path={route.legacyPath.replace(/^\//, '')}
              element={<Navigate to={route.path} replace />}
            />
          ))}

        <Route path="service-detail" element={<Navigate to="/services" replace />} />
        <Route path="service-detail.php" element={<Navigate to="/services" replace />} />
        <Route path="seo-optimization" element={<Navigate to="/seo" replace />} />
        <Route path="content" element={<Navigate to="/content-writing" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
