import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { PageSkeleton } from '../ui';
import { StructuredData } from '../seo';
import { organizationSchema, websiteSchema } from '../../data/seo';
import BackToTop from './BackToTop';
import CustomCursor from './CustomCursor';
import Footer from './Footer';
import Navbar from './Navbar';
import PageTransition from './PageTransition';
import ScrollProgress from './ScrollProgress';
import ScrollToTop from './ScrollToTop';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-ink">
      <StructuredData data={[organizationSchema, websiteSchema]} />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <CustomCursor />
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <PageTransition>
        <main id="main-content" tabIndex="-1" className="flex-1 outline-none">
          <Suspense fallback={<PageSkeleton />}>
            <Outlet />
          </Suspense>
        </main>
      </PageTransition>
      <Footer />
      <BackToTop />
    </div>
  );
}
