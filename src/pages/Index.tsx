import { Header } from "@/components/ui/header";
import { HeroSection } from "@/components/ui/hero-section";
import { SearchForm } from "@/components/ui/search-form";
import { FeaturesSection } from "@/components/ui/features-section";
import { ServicesSection } from "@/components/ui/services-section";
import { HowItWorksSection } from "@/components/ui/how-it-works-section";
import { DogWalkingProtect } from "@/components/ui/dogwalking-protect";
import { TrustSection } from "@/components/ui/trust-section";
import { TestimonialsSection } from "@/components/ui/testimonials-section";
import { UserTypesSection } from "@/components/ui/user-types-section";
import { LocalPresenceSection } from "@/components/ui/local-presence-section";
import { Footer } from "@/components/ui/footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <section className="py-8 md:py-12 px-4 -mt-16 md:-mt-24 relative z-10">
          <div className="container mx-auto">
            <SearchForm />
          </div>
        </section>
        <HowItWorksSection />
        <ServicesSection />
        <FeaturesSection />
        <DogWalkingProtect />
        <TrustSection />
        <TestimonialsSection />
        <UserTypesSection />
        <LocalPresenceSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;