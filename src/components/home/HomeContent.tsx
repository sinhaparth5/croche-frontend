import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { AboutSection } from './AboutSection';
import { ContactSection } from './ContactSection';

export const HomeContent = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
};