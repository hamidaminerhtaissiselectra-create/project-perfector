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
import { SEOHead } from "@/components/ui/seo-head";

const Index = () => {
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "DogWalking",
    "description": "Plateforme de mise en relation entre propriétaires de chiens et promeneurs professionnels vérifiés. Promenade, garde, visite à domicile partout en France.",
    "url": "https://dogwalking.fr",
    "logo": "https://dogwalking.fr/logo.png",
    "image": "https://dogwalking.fr/og-image.jpg",
    "telephone": "+33-1-XX-XX-XX-XX",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "48.8566",
      "longitude": "2.3522"
    },
    "areaServed": {
      "@type": "Country",
      "name": "France"
    },
    "priceRange": "€€",
    "openingHours": "Mo-Su 07:00-21:00",
    "sameAs": [
      "https://facebook.com/dogwalkingfr",
      "https://instagram.com/dogwalkingfr",
      "https://twitter.com/dogwalkingfr"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services de promenade et garde de chiens",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Promenade de chien",
            "description": "Promenade individuelle ou en groupe avec un promeneur professionnel vérifié"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Garde de chien",
            "description": "Garde à domicile ou chez le promeneur, courte ou longue durée"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Visite à domicile",
            "description": "Visite et soins à domicile pour votre chien"
          }
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="DogWalking | Promeneurs de Chiens Professionnels Vérifiés en France"
        description="Trouvez un promeneur de chien professionnel vérifié près de chez vous. Promenade, garde, visite à domicile. Paiement sécurisé, assurance incluse, suivi GPS en temps réel."
        keywords="promeneur chien, dog walking, garde chien, promenade chien paris, dog sitter, pet sitting, promeneur canin professionnel"
        canonicalUrl="https://dogwalking.fr"
        structuredData={homeJsonLd}
      />
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