import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-dog-walking.jpg";
import { Shield, Star, Clock, MapPin } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white pt-16 md:pt-0">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Plateforme #1 en France - 100% sécurisée</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-tight">
            Votre chien mérite la{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              meilleure promenade
            </span>
          </h1>

          <p className="text-lg md:text-2xl mb-6 md:mb-8 opacity-90 max-w-2xl mx-auto">
            Trouvez des promeneurs vérifiés près de chez vous. Paiement sécurisé en escrow, 
            preuves photo/vidéo obligatoires à chaque mission.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4 h-auto w-full sm:w-auto" 
              onClick={() => window.location.href = '/walkers'}
            >
              Trouver un promeneur
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4 h-auto bg-white/10 border-white/30 text-white hover:bg-white/20 w-full sm:w-auto" 
              onClick={() => window.location.href = '/walker/register'}
            >
              Devenir promeneur
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 md:mt-12 grid grid-cols-2 md:flex md:justify-center items-center gap-4 md:gap-8 text-xs md:text-sm">
            <div className="flex items-center gap-2 justify-center">
              <Shield className="h-4 w-4 text-primary" />
              <span>CNI & casier vérifiés</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Star className="h-4 w-4 text-yellow-400" />
              <span>4.9/5 (2000+ avis)</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Clock className="h-4 w-4 text-accent" />
              <span>Réponse &lt; 1h</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <MapPin className="h-4 w-4 text-destructive" />
              <span>+50 villes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};