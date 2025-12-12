import { Search, Calendar, Camera, ThumbsUp, ArrowRight } from "lucide-react";

export const HowItWorksSection = () => {
  const steps = [
    {
      number: "1",
      icon: Search,
      title: "Trouvez",
      description: "Consultez les profils vérifiés des promeneurs près de chez vous. CNI, casier judiciaire et assurance RC vérifiés.",
      highlight: "100% vérifiés"
    },
    {
      number: "2",
      icon: Calendar,
      title: "Réservez",
      description: "Sélectionnez le service, la date et l'heure. Votre paiement est sécurisé en escrow jusqu'à validation.",
      highlight: "Paiement bloqué"
    },
    {
      number: "3",
      icon: Camera,
      title: "Recevez les preuves",
      description: "Le promeneur vous envoie obligatoirement photo/vidéo avec message pendant la mission. Transparence totale.",
      highlight: "Preuves obligatoires"
    },
    {
      number: "4",
      icon: ThumbsUp,
      title: "Validez & Payez",
      description: "Le paiement est débloqué après réception de la preuve. Laissez un avis certifié pour aider la communauté.",
      highlight: "Satisfaction garantie"
    }
  ];

  return (
    <section id="comment-ca-marche" className="py-12 md:py-16 px-4 bg-warm">
      <div className="container mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-3">
            Simple & Sécurisé
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">Comment ça marche ?</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Un processus transparent avec paiement escrow et preuves obligatoires pour votre tranquillité
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-card rounded-2xl p-5 md:p-6 shadow-card border border-border h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-primary text-white font-bold text-lg">
                    {step.number}
                  </div>
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full mb-2">
                  {step.highlight}
                </span>
                <h3 className="text-lg md:text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};