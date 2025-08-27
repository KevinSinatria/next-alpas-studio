import HeroSection from "./components/HeroSection";
import OurTemplateSection from "./components/OurTemplateSection";
import TestimonialsSection from "./components/TestimonialsSection";

export default function HomePage() {
  return (

    <div className="px-8 pt-16">
      <HeroSection />
      <OurTemplateSection />
      <TestimonialsSection />
    </div>
  );
}
