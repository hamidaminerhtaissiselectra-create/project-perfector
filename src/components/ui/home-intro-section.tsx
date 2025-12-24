import { motion } from "framer-motion";
import { Shield, Heart, Star, Clock, MapPin, Camera, Lock, Award } from "lucide-react";
import { Card, CardContent } from "./card";

export const HomeIntroSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              DogWalking : La Plateforme de Confiance pour Votre Chien
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Fondée en 2023, DogWalking est née d'un constat simple : les propriétaires de chiens 
              méritent une solution fiable, sécurisée et transparente pour faire promener leur 
              compagnon. Fini les annonces douteuses et les prestataires non vérifiés. Avec DogWalking, 
              chaque promeneur est rigoureusement sélectionné, chaque prestation est documentée, 
              et chaque paiement est protégé.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="border-2 hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Promeneurs 100% Vérifiés</h3>
                    <p className="text-muted-foreground">
                      Chaque promeneur fournit une pièce d'identité, un casier judiciaire vierge et 
                      une assurance RC professionnelle. Notre équipe vérifie manuellement chaque candidature. 
                      Seuls 35% des candidats sont acceptés après ce processus exigeant.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Paiement Escrow Sécurisé</h3>
                    <p className="text-muted-foreground">
                      Votre argent reste bloqué jusqu'à réception des preuves photo/vidéo de la prestation. 
                      Sans validation, vous êtes automatiquement remboursé. Une innovation unique sur le 
                      marché français du pet-sitting qui garantit votre tranquillité.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Camera className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Preuves Photo Obligatoires</h3>
                    <p className="text-muted-foreground">
                      À chaque mission, le promeneur doit envoyer des photos et vidéos de votre chien 
                      via notre plateforme sécurisée. Vous suivez les aventures de votre compagnon 
                      et validez la prestation en toute connaissance de cause.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Assurance Premium Incluse</h3>
                    <p className="text-muted-foreground">
                      Chaque promenade est couverte par une assurance jusqu'à 2 millions d'euros. 
                      En cas d'incident, notre équipe gère toutes les démarches avec l'assureur. 
                      Votre chien est protégé à 100%, sans frais supplémentaires.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Avec plus de <strong>50 000 promenades réalisées</strong> et une note moyenne de 
              <strong> 4.9/5</strong>, DogWalking est devenue la référence nationale pour le bien-être 
              canin. Rejoignez les milliers de propriétaires qui nous font confiance et offrez à 
              votre chien l'attention qu'il mérite, même quand vous êtes occupé.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
