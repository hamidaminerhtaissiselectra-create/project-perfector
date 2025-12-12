import { Link } from 'react-router-dom';
import { MapPin, ChevronRight } from 'lucide-react';
import { zones } from '@/data/localSeoData';
import { Card, CardContent } from './card';

export function LocalPresenceSection() {
  // Afficher les zones prioritaires (1 et 2)
  const priorityZones = zones.filter(z => z.priority <= 2 && z.type === 'city');
  const parisArrondissements = zones.filter(z => z.type === 'arrondissement' && z.parent === 'paris');

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <MapPin className="w-4 h-4" />
            Couverture nationale
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Nous sommes présents près de chez vous
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Des promeneurs et gardiens de chien vérifiés dans toute la France. 
            Trouvez un professionnel de confiance dans votre ville.
          </p>
        </div>

        {/* Paris et 94 - Priorité 1 */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            Paris & Val-de-Marne
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {zones.filter(z => z.priority === 1 && z.type === 'city').map((zone) => (
              <Link key={zone.id} to={`/zone/${zone.slug}`}>
                <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="relative h-24 md:h-28 overflow-hidden">
                    <img
                      src={zone.image}
                      alt={zone.altText}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white font-semibold text-sm md:text-base truncate">{zone.name}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          
          {/* Arrondissements de Paris */}
          <div className="mt-4 flex flex-wrap gap-2">
            {parisArrondissements.slice(0, 6).map((arr) => (
              <Link 
                key={arr.id} 
                to={`/zone/${arr.slug}`}
                className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors bg-background px-3 py-1.5 rounded-full border border-border hover:border-primary"
              >
                {arr.name}
              </Link>
            ))}
            <Link 
              to="/zones" 
              className="text-xs md:text-sm text-primary font-medium px-3 py-1.5 rounded-full border border-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Tous les arrondissements →
            </Link>
          </div>
        </div>

        {/* Grandes villes - Priorité 2 */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-secondary rounded-full"></span>
            Grandes villes françaises
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {zones.filter(z => z.priority === 2).map((zone) => (
              <Link key={zone.id} to={`/zone/${zone.slug}`}>
                <Card className="group overflow-hidden hover:shadow-md transition-all duration-300 h-full">
                  <div className="relative h-20 md:h-24 overflow-hidden">
                    <img
                      src={zone.image}
                      alt={zone.altText}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white font-medium text-sm truncate">{zone.name}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Quartiers clés */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-accent rounded-full"></span>
            Quartiers populaires
          </h3>
          <div className="flex flex-wrap gap-2">
            {zones.filter(z => z.type === 'quartier').map((zone) => (
              <Link 
                key={zone.id} 
                to={`/zone/${zone.slug}`}
                className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors bg-background px-3 py-1.5 rounded-full border border-border hover:border-primary"
              >
                {zone.name}
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4 border-t border-border">
          <Link 
            to="/zones" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Voir toutes nos zones d'intervention
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
