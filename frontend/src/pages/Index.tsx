import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DestinationsSection from "@/components/DestinationsSection";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ImageSwiper from "@/components/ImageSwiper";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ImageSwiper />
      <DestinationsSection />
      <StatsSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
