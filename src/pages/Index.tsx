import { Header } from "@/components/ui/header";
import { HeroSection } from "@/components/ui/hero-section";
import { SearchForm } from "@/components/ui/search-form";
import { WhySection } from "@/components/ui/why-section";
import { HowItWorksSection } from "@/components/ui/how-it-works-section";
import { ServicesSection } from "@/components/ui/services-section";
import { FeaturesSection } from "@/components/ui/features-section";
import { DogWalkingProtect } from "@/components/ui/dogwalking-protect";
import { SecurityTrustSection } from "@/components/ui/security-trust-section";
import { TrustSection } from "@/components/ui/trust-section";
import { TestimonialsSection } from "@/components/ui/testimonials-section";
import { UserTypesSection } from "@/components/ui/user-types-section";
import { LocalPresenceSection } from "@/components/ui/local-presence-section";
import { Footer } from "@/components/ui/footer";
import { SEOHead } from "@/components/seo/SEOHead";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead />
      <Header />
      <main>
        <HeroSection />
        <section className="py-8 md:py-12 px-4 -mt-16 md:-mt-24 relative z-10">
          <div className="container mx-auto">
            <SearchForm />
          </div>
        </section>
        <WhySection />
        <HowItWorksSection />
        <ServicesSection />
        <FeaturesSection />
        <DogWalkingProtect />
        <SecurityTrustSection />
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