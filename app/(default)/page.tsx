import Header from "@/components/showcase/header";
import HeroSection from "@/components/showcase/hero";
import FeaturesSection from "@/components/showcase/feature";
import TestimonialsSection from "@/components/showcase/purpose";
import CallToActionSection from "@/components/showcase/callToAction";
import Footer from "@/components/showcase/footer";

const DefaultPage = () => {
  return (
    <div className="bg-black text-white">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CallToActionSection />
      <Footer />
    </div>
  );
};

export default DefaultPage;
