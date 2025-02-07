import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { AboutSection } from './AboutSection';
import { ContactSection } from './ContactSection';

export const HomeContent = () => {
  return (
    <div className="pt-24 pb-12">
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
};