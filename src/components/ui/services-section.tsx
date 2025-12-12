import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Camera, ArrowRight, Dog, Home, Moon, Sun, Heart, Stethoscope, Car, PawPrint, Shield, Check } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export const ServicesSection = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: "promenade",
      title: "Promenade",
      description: "Promenade en extérieur adaptée aux besoins de votre chien. Exercice physique et stimulation mentale garantis.",
      minPrice: 8,
      duration: "30 min - 2h",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop",
      tags: ["Exercice adapté", "Preuves photo"],
      icon: Dog,
      benefits: ["Socialisation", "Dépense d'énergie"]
    },
    {
      id: "visite_domicile",
      title: "Visite à domicile",
      description: "Nourriture, eau fraîche et câlins pour vos animaux dans le confort de leur maison.",
      minPrice: 8,
      duration: "30 min",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop",
      tags: ["Chiens & chats", "Soins quotidiens"],
      icon: Home,
      benefits: ["Routine préservée", "Moins de stress"]
    },
    {
      id: "hebergement_nuit",
      title: "Hébergement nuit",
      description: "Votre chien passe la nuit chez le promeneur dans un environnement sécurisé et familial.",
      minPrice: 10,
      duration: "Nuit complète",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop",
      tags: ["Env. familial", "Suivi régulier"],
      icon: Moon,
      benefits: ["Attention 24h", "Compagnie"],
      popular: true
    },
    {
      id: "hebergement_jour",
      title: "Garderie de jour",
      description: "Garderie de jour chez le promeneur, idéal pour la socialisation et l'exercice en journée.",
      minPrice: 10,
      duration: "Journée",
      image: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=600&h=400&fit=crop",
      tags: ["Socialisation", "Activités variées"],
      icon: Sun,
      benefits: ["Jeux", "Stimulation"]
    },
    {
      id: "garde_domicile",
      title: "Garde à domicile",
      description: "Le promeneur reste chez vous la nuit pour garder votre chien dans son environnement habituel.",
      minPrice: 12,
      duration: "Nuit chez vous",
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=400&fit=crop",
      tags: ["Chez vous", "Routine préservée"],
      icon: Heart,
      benefits: ["Confort maison", "Sécurité"]
    },
    {
      id: "visite_sanitaire",
      title: "Visite sanitaire",
      description: "Entretien quotidien avec produits fournis par le propriétaire (brossage, soins, hygiène).",
      minPrice: 16,
      duration: "45 min",
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&h=400&fit=crop",
      tags: ["Soins hygiène", "Brossage"],
      icon: Stethoscope,
      benefits: ["Bien-être", "Propreté"]
    },
    {
      id: "accompagnement_veterinaire",
      title: "Accompagnement vétérinaire",
      description: "Transport et accompagnement de votre chien chez le vétérinaire pour ses rendez-vous.",
      minPrice: 13,
      duration: "Variable",
      image: "https://images.unsplash.com/photo-1628009368231-7bb7cf0a65ea?w=600&h=400&fit=crop",
      tags: ["Transport inclus", "Compte-rendu"],
      icon: Car,
      benefits: ["Tranquillité", "Suivi santé"]
    }
  ];

  return (
    <section id="services" className="py-12 md:py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-3">
            <PawPrint className="h-3 w-3" />
            7 services disponibles
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">Nos Services</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Une gamme complète de services avec preuves photo/vidéo obligatoires et paiement escrow sécurisé
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 max-w-7xl mx-auto">
          {services.map((service) => (
            <div 
              key={service.id}
              className={`group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 border ${
                service.popular ? 'border-primary ring-2 ring-primary/20' : 'border-border/50'
              }`}
            >
              {/* Image */}
              <div className="relative h-36 md:h-40 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {service.popular && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-primary text-primary-foreground text-xs">
                      Populaire
                    </Badge>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <Badge className="bg-white/90 text-foreground font-bold text-sm shadow-sm">
                    dès {service.minPrice}€
                  </Badge>
                </div>
                <div className="absolute bottom-2 left-2">
                  <Badge variant="secondary" className="bg-black/60 text-white text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {service.duration}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <service.icon className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-bold">{service.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {service.description}
                </p>

                {/* Benefits */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {service.benefits.map((benefit, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center gap-1 text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full"
                    >
                      <Check className="h-3 w-3" />
                      {benefit}
                    </span>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {service.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs font-normal py-0">
                      {index === 0 && <Camera className="h-2.5 w-2.5 mr-1" />}
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button 
                  variant="ghost" 
                  size="sm"
                  className="p-0 h-auto font-semibold text-primary hover:text-primary/80 group/btn"
                  onClick={() => navigate(`/walkers?service=${service.id}`)}
                >
                  Réserver
                  <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-10 text-center">
          <div className="inline-flex items-center gap-2 bg-card rounded-xl px-4 py-3 shadow-soft border border-border mb-6">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm">
              <strong>Garantie DogWalking :</strong> Preuves photo obligatoires + Paiement escrow + Commission 13%
            </span>
          </div>
          <div>
            <Button size="lg" onClick={() => navigate('/walkers')}>
              Voir tous les promeneurs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};