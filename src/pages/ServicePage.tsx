import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getServiceBySlug } from "@/data/servicesData";
import { ArrowRight, Check, Clock, MapPin, Search, Dog, Cat, Shield, Award, Heart, Users, Star, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import NotFound from "./NotFound";

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [animalType, setAnimalType] = useState<"chien" | "chat">("chien");

  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!service) {
    return <NotFound />;
  }

  const handleSearch = () => {
    navigate(`/walkers?service=${service.id}&address=${encodeURIComponent(address)}`);
  };

  // Schema.org structured data
  const schemaService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.metaDescription,
    "provider": {
      "@type": "Organization",
      "name": "DogWalking",
      "url": "https://dogwalking.fr"
    },
    "areaServed": {
      "@type": "Country",
      "name": "France"
    },
    "offers": {
      "@type": "Offer",
      "price": service.minPrice,
      "priceCurrency": "EUR",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": service.minPrice,
        "priceCurrency": "EUR",
        "unitText": "à partir de"
      }
    }
  };

  const schemaLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "DogWalking",
    "description": "Service de promenade et garde d'animaux partout en France",
    "url": "https://dogwalking.fr",
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
    "areaServed": "France",
    "priceRange": "€€"
  };

  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://dogwalking.fr" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://dogwalking.fr/#services" },
      { "@type": "ListItem", "position": 3, "name": service.title, "item": `https://dogwalking.fr/services/${service.slug}` }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{service.metaTitle}</title>
        <meta name="description" content={service.metaDescription} />
        <link rel="canonical" href={`https://dogwalking.fr/services/${service.slug}`} />
        <meta property="og:title" content={service.metaTitle} />
        <meta property="og:description" content={service.metaDescription} />
        <meta property="og:image" content={service.image} />
        <meta property="og:url" content={`https://dogwalking.fr/services/${service.slug}`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(schemaService)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaLocalBusiness)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaFAQ)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaBreadcrumb)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        {/* 1️⃣ Hero Section - Full Width avec image de fond */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden">
          {/* Image de fond */}
          <div className="absolute inset-0 z-0">
            <img 
              src={service.heroImage} 
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl">
              <nav className="text-sm text-muted-foreground mb-6">
                <a href="/" className="hover:text-primary transition-colors">Accueil</a>
                <span className="mx-2">/</span>
                <a href="/#services" className="hover:text-primary transition-colors">Services</a>
                <span className="mx-2">/</span>
                <span className="text-foreground font-medium">{service.title}</span>
              </nav>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {service.h1}
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-4 leading-relaxed">
                {service.heroDescription}
              </p>
              
              <div className="flex items-center gap-2 text-primary font-medium mb-8">
                <MapPin className="h-5 w-5" />
                <span>{service.localZoneMention}</span>
              </div>

              <div className="flex flex-wrap gap-4 mb-10">
                <Badge className="bg-primary/15 text-primary border-0 text-base py-2 px-4 backdrop-blur-sm">
                  <Clock className="h-4 w-4 mr-2" />{service.duration}
                </Badge>
                <Badge className="bg-accent/15 text-accent border-0 text-base py-2 px-4 backdrop-blur-sm">
                  <Star className="h-4 w-4 mr-2" />Dès {service.minPrice}€
                </Badge>
              </div>

              {/* Formulaire de recherche */}
              <div className="bg-card/95 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-border/50">
                <div className="flex gap-3 mb-5">
                  <button 
                    onClick={() => setAnimalType("chien")} 
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${
                      animalType === "chien" 
                        ? "bg-primary text-primary-foreground shadow-lg" 
                        : "bg-muted/80 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <Dog className="h-4 w-4" />Chien
                  </button>
                  <button 
                    onClick={() => setAnimalType("chat")} 
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${
                      animalType === "chat" 
                        ? "bg-primary text-primary-foreground shadow-lg" 
                        : "bg-muted/80 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <Cat className="h-4 w-4" />Chat
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                      type="text" 
                      placeholder="Votre adresse ou ville..." 
                      value={address} 
                      onChange={(e) => setAddress(e.target.value)} 
                      className="pl-12 h-14 text-base rounded-xl border-border/50 bg-background/50"
                    />
                  </div>
                  <Button size="lg" className="h-14 px-8 rounded-xl text-base font-semibold" onClick={handleSearch}>
                    <Search className="h-5 w-5 mr-2" />Rechercher
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2️⃣ Galerie d'images avec présentation */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Images en grille créative */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img 
                    src={service.images[0]?.src} 
                    alt={service.images[0]?.alt}
                    className="rounded-2xl shadow-lg w-full h-48 md:h-64 object-cover transform hover:scale-[1.02] transition-transform duration-300"
                  />
                  {service.images[2] && (
                    <img 
                      src={service.images[2].src} 
                      alt={service.images[2].alt}
                      className="rounded-2xl shadow-lg w-full h-32 md:h-40 object-cover transform hover:scale-[1.02] transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="pt-8">
                  {service.images[1] && (
                    <img 
                      src={service.images[1].src} 
                      alt={service.images[1].alt}
                      className="rounded-2xl shadow-lg w-full h-56 md:h-72 object-cover transform hover:scale-[1.02] transition-transform duration-300"
                    />
                  )}
                </div>
              </div>

              {/* Contenu texte */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Tout savoir sur notre service de {service.title.toLowerCase()}
                </h2>
                <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                  <p>{service.description.intro}</p>
                </div>
                
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="font-medium">Vérifiés & assurés</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                    <Star className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="font-medium">Avis vérifiés</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3️⃣ À qui s'adresse ce service */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">À qui s'adresse ce service ?</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">{service.description.forWhom}</p>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Quels problèmes résout-il ?</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">{service.description.problemsSolved}</p>
              </div>
            </div>
            
            <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-transparent border border-primary/20">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Heart className="h-7 w-7 text-primary" />
                Les bénéfices pour votre animal
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{service.description.benefits}</p>
            </div>
          </div>
        </section>

        {/* 4️⃣ Déroulement du service */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{service.howItWorks.title}</h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{service.howItWorks.intro}</p>
            </div>
            
            {/* Étapes avec timeline */}
            <div className="relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20" />
              
              <div className="space-y-8">
                {service.howItWorks.steps.map((step, index) => (
                  <div 
                    key={index} 
                    className={`flex flex-col md:flex-row gap-6 items-center ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="bg-card rounded-2xl p-6 shadow-lg border border-border inline-block max-w-lg">
                        <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                    
                    <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold text-xl shadow-lg">
                      {index + 1}
                    </div>
                    
                    <div className="flex-1 hidden md:block" />
                  </div>
                ))}
              </div>
            </div>

            {/* Sécurité et bien-être */}
            <div className="grid md:grid-cols-2 gap-6 mt-16">
              <div className="bg-card rounded-3xl p-8 shadow-lg border border-border">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Sécurité garantie</h3>
                <p className="text-muted-foreground leading-relaxed">{service.howItWorks.safety}</p>
              </div>
              <div className="bg-card rounded-3xl p-8 shadow-lg border border-border">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
                  <Heart className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3">Bien-être animal</h3>
                <p className="text-muted-foreground leading-relaxed">{service.howItWorks.dogWelfare}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5️⃣ Expertise & Avantages */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Notre expertise et vos avantages</h2>
            
            {/* 4 piliers d'expertise */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <div className="text-center p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Expérience</h3>
                <p className="text-sm text-muted-foreground">{service.expertiseAdvantages.experience}</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Assurance</h3>
                <p className="text-sm text-muted-foreground">{service.expertiseAdvantages.insurance}</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Méthode</h3>
                <p className="text-sm text-muted-foreground">{service.expertiseAdvantages.method}</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Confiance</h3>
                <p className="text-sm text-muted-foreground">{service.expertiseAdvantages.trust}</p>
              </div>
            </div>

            {/* Liste des avantages */}
            <div className="bg-gradient-to-br from-muted/50 to-muted/20 rounded-3xl p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-8 text-center">Tous les avantages de notre service</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.advantages.map((advantage, index) => (
                  <div key={index} className="flex items-start gap-4 bg-card rounded-xl p-4 shadow-sm">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-foreground">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6️⃣ Zones d'intervention */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <MapPin className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Zones d'intervention</h2>
            <div className="space-y-4 text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
              <p>{service.localAvailability.mainCity}</p>
              <p>{service.localAvailability.surroundingAreas}</p>
              <p>{service.localAvailability.coverage}</p>
            </div>
            <Button size="lg" variant="outline" className="rounded-full px-8" onClick={() => navigate('/zones')}>
              Voir toutes les zones couvertes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* 7️⃣ FAQ */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Questions fréquentes</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {service.faq.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-card rounded-2xl border border-border px-6 shadow-sm"
                >
                  <AccordionTrigger className="text-left font-semibold text-lg py-5 hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 text-base leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* 8️⃣ CTA Final */}
        <section className="py-20 px-4 bg-gradient-to-r from-primary via-primary to-accent relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>
          <div className="container mx-auto max-w-3xl text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Trouvez un professionnel près de chez vous
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-10 max-w-xl mx-auto">
              Des professionnels vérifiés vous attendent pour prendre soin de votre animal
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="rounded-full px-10 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-shadow"
              onClick={() => navigate(`/walkers?service=${service.id}`)}
            >
              Rechercher un professionnel
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ServicePage;
