import {
  AboutTeaser,
  FinalCTA,
  HeroSection,
  LogoMarquee,
  ProcessTimeline,
  ServicesGrid,
  StatsCounters,
  TestimonialsCarousel,
  WorkPreview,
} from '../components/sections';
import { PageMeta } from '../components/seo';

export default function Home() {
  return (
    <>
      <PageMeta path="/" />
      <HeroSection />
      <LogoMarquee />
      <AboutTeaser />
      <ServicesGrid />
      <StatsCounters />
      <ProcessTimeline />
      <WorkPreview />
      <TestimonialsCarousel />
      <FinalCTA />
    </>
  );
}
