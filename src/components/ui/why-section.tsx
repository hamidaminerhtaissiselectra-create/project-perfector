import { Heart, Users, MapPin, Shield, Clock } from "lucide-react";

export const WhySection = () => {
  const reasons = [
    {
      icon: Users,
      title: "Mise en relation",
      description: "Connectez-vous avec des professionnels passionnés et vérifiés près de chez vous"
    },
    {
      icon: Heart,
      title: "Confiance",
      description: "Profils vérifiés, avis certifiés et preuves photo obligatoires à chaque prestation"
    },
    {
      icon: MapPin,
      title: "Proximité",
      description: "Des promeneurs disponibles dans votre quartier, partout en France"
    },
    {
      icon: Shield,
      title: "Sécurité",
      description: "Paiement escrow sécurisé, libéré uniquement après validation de la prestation"
    },
    {
      icon: Clock,
      title: "Flexibilité",
      description: "Réservez selon vos horaires, annulez facilement si besoin"
    }
  ];

  return (
    <section id="pourquoi" className="py-12 md:py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-3">
            Notre mission
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Une solution simple et fiable pour le bien-être de vos animaux
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Partout en France, nous connectons les propriétaires d'animaux avec des professionnels de confiance pour des services adaptés à chaque besoin.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {reasons.map((reason, index) => (
            <div 
              key={index}
              className="bg-card rounded-2xl p-5 md:p-6 shadow-soft border border-border text-center hover:shadow-card transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                <reason.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{reason.title}</h3>
              <p className="text-sm text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
