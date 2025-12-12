import { Star, Quote, Shield } from "lucide-react";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Marie L.",
      city: "Paris 15e",
      rating: 5,
      comment: "Le système de preuves photo est génial ! Je reçois des photos de mon golden pendant sa promenade. Ça me rassure énormément au bureau.",
      dog: "Max, Golden Retriever",
      verified: true
    },
    {
      name: "Thomas B.",
      city: "Lyon 6e",
      rating: 5,
      comment: "Enfin une plateforme sérieuse. Le paiement en escrow et la vérification du casier judiciaire, c'est ce qui m'a convaincu.",
      dog: "Luna, Berger Australien",
      verified: true
    },
    {
      name: "Sophie M.",
      city: "Marseille",
      rating: 5,
      comment: "J'ai testé 3 plateformes avant DogWalking. La différence ? Les preuves obligatoires et le support ultra réactif. Je recommande !",
      dog: "Coco, Bouledogue Français",
      verified: true
    },
    {
      name: "Pierre D.",
      city: "Bordeaux",
      rating: 5,
      comment: "Mon promeneur m'envoie toujours une vidéo de la balade. Voir mon chien heureux en pleine nature, ça n'a pas de prix.",
      dog: "Rocky, Labrador",
      verified: true
    },
    {
      name: "Julie R.",
      city: "Toulouse",
      rating: 5,
      comment: "Le badge 'Super Promeneur' m'a aidée à choisir. Sarah est incroyable avec mon anxieux de Beauceron. Merci DogWalking !",
      dog: "Oscar, Beauceron",
      verified: true
    },
    {
      name: "Marc V.",
      city: "Nantes",
      rating: 5,
      comment: "Je voyage souvent pour le travail. Savoir que mon chien est entre de bonnes mains vérifiées, c'est un vrai soulagement.",
      dog: "Milo, Jack Russell",
      verified: true
    }
  ];

  return (
    <section className="py-12 md:py-16 px-4 bg-warm">
      <div className="container mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-3">
            Avis certifiés
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Ce que disent nos clients</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Des milliers de propriétaires satisfaits partagent leur expérience. 
            Seuls les clients ayant réservé peuvent laisser un avis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-card p-5 md:p-6 rounded-2xl shadow-card border border-border hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-3 mb-3">
                <Quote className="h-8 w-8 text-primary/20 flex-shrink-0" />
                <div className="flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-foreground mb-4 text-sm md:text-base">{testimonial.comment}</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    {testimonial.name}
                    {testimonial.verified && (
                      <Shield className="h-3.5 w-3.5 text-primary" />
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">{testimonial.city}</div>
                  <div className="text-xs text-primary mt-1">{testimonial.dog}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};