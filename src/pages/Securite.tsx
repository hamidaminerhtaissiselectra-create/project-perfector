import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, FileCheck, Lock, Users, Camera, Phone, CheckCircle, BadgeCheck, CreditCard, Clock, Eye, AlertTriangle, Heart } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { SEOHead } from "@/components/ui/seo-head";
import { SEOFAQ, securiteFAQs } from "@/components/ui/seo-faq";

const Securite = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: BadgeCheck,
      title: "Vérification d'identité complète",
      description: "Chaque promeneur fournit une pièce d'identité officielle (CNI ou passeport) vérifiée manuellement par notre équipe de conformité. Nous vérifions l'authenticité du document et l'identité du candidat avant toute validation."
    },
    {
      icon: FileCheck,
      title: "Casier judiciaire vérifié",
      description: "Nous exigeons une attestation de non-antécédent ou un extrait de casier judiciaire (bulletin n°3) pour garantir la fiabilité et l'intégrité de chaque promeneur inscrit sur notre plateforme."
    },
    {
      icon: Shield,
      title: "Assurance responsabilité civile 2M€",
      description: "Tous nos promeneurs disposent d'une assurance RC habitation ou professionnelle couvrant les prestations jusqu'à 2 millions d'euros. Cette couverture protège votre chien en cas d'incident pendant la prestation."
    },
    {
      icon: Camera,
      title: "Preuves photo/vidéo obligatoires",
      description: "À chaque prestation, le promeneur doit envoyer une preuve visuelle (photo ou vidéo) accompagnée d'un message. Sans cette preuve, le paiement reste bloqué en escrow et peut être remboursé automatiquement."
    },
    {
      icon: Lock,
      title: "Paiement Escrow ultra-sécurisé",
      description: "Votre paiement est bloqué sur un compte tiers sécurisé pendant 24 à 48 heures. Le promeneur ne reçoit les fonds qu'après validation de la preuve de prestation. Protection totale contre les arnaques."
    },
    {
      icon: Users,
      title: "Avis et notes certifiés",
      description: "Système d'évaluation après chaque prestation pour maintenir un haut niveau de qualité. Seuls les clients ayant effectivement réservé peuvent laisser un avis, garantissant l'authenticité des retours."
    },
    {
      icon: CreditCard,
      title: "Transactions 100% cryptées",
      description: "Paiements sécurisés via Stripe, leader mondial du paiement en ligne, conforme aux normes bancaires PCI-DSS niveau 1. Vos données bancaires ne transitent jamais par nos serveurs."
    },
    {
      icon: Phone,
      title: "Support réactif 7j/7",
      description: "Notre équipe est disponible tous les jours pour répondre à vos questions et vous assister en cas de problème. Temps de réponse moyen inférieur à 2 heures pendant les heures ouvrées."
    }
  ];

  const verificationSteps = [
    {
      step: "1",
      title: "Inscription",
      description: "Le candidat remplit son profil complet avec photo réelle et informations vérifiables"
    },
    {
      step: "2",
      title: "Documents",
      description: "Envoi de la CNI, attestation casier judiciaire et preuve d'assurance RC"
    },
    {
      step: "3",
      title: "Vérification",
      description: "Notre équipe vérifie manuellement l'authenticité de tous les documents"
    },
    {
      step: "4",
      title: "Validation",
      description: "Le promeneur obtient son badge vérifié et peut recevoir des réservations"
    }
  ];

  const securityBenefits = [
    {
      icon: Eye,
      title: "Transparence totale",
      description: "Historique complet des prestations, preuves conservées, communications archivées"
    },
    {
      icon: AlertTriangle,
      title: "Médiation disponible",
      description: "En cas de litige, notre équipe intervient pour trouver une solution équitable"
    },
    {
      icon: Heart,
      title: "Bien-être animal prioritaire",
      description: "Tout signalement de maltraitance entraîne une suspension immédiate et une enquête"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Sécurité et Confiance - Promeneurs Vérifiés"
        description="Découvrez comment DogWalking garantit la sécurité de votre chien : promeneurs vérifiés, paiement escrow, preuves obligatoires, assurance 2M€. La confiance au cœur de chaque promenade."
        keywords="sécurité promenade chien, promeneur vérifié, paiement escrow, assurance chien, dog walking sécurisé"
        canonicalUrl={`${window.location.origin}/securite`}
      />
      
      <Header />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
              <Shield className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Votre sécurité, notre engagement absolu
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Chez DogWalking, nous comprenons que confier son chien à un inconnu demande une confiance 
              absolue. C'est pourquoi nous avons mis en place le système de vérification et de protection 
              le plus rigoureux du marché français de la promenade canine.
            </p>
          </section>

          {/* Introduction */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Pourquoi la sécurité est notre priorité n°1 ?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Votre chien est un membre à part entière de votre famille. Lorsque vous faites appel 
                    à un promeneur, vous lui confiez ce que vous avez de plus précieux. Nous avons conçu 
                    DogWalking avec cette responsabilité à l'esprit.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Chaque promeneur sur notre plateforme passe par un processus de vérification complet 
                    qui prend généralement 24 à 48 heures. Nous ne faisons aucun compromis sur la sécurité.
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Notre système de paiement escrow unique en France garantit que vous ne payez que pour 
                    un service effectivement réalisé. Les preuves photo/vidéo obligatoires vous permettent 
                    de suivre chaque promenade à distance.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    L'assurance responsabilité civile de 2 millions d'euros couvre tous les incidents 
                    potentiels, vous offrant une tranquillité d'esprit totale.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Verification Process */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              Processus de vérification en 4 étapes
            </h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Chaque candidat promeneur passe par un processus rigoureux avant de pouvoir 
              proposer ses services sur notre plateforme.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {verificationSteps.map((item, index) => (
                <div key={index} className="text-center relative">
                  <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground text-xl font-bold flex items-center justify-center mx-auto mb-4 shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  {index < verificationSteps.length - 1 && (
                    <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-0.5 bg-border" />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Security Features Grid */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              8 piliers de sécurité pour votre tranquillité
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                          <feature.icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Additional Benefits */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {securityBenefits.map((benefit, index) => (
                <div key={index} className="text-center p-6 rounded-2xl bg-muted/50 border border-border">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
                    <benefit.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Escrow Explanation */}
          <section className="mb-16">
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8 bg-primary text-primary-foreground">
                  <h2 className="text-2xl font-bold mb-6">Comment fonctionne le paiement Escrow ?</h2>
                  <p className="opacity-90 mb-6">
                    Le système escrow est votre garantie de ne payer que pour un service effectivement réalisé. 
                    Votre argent est protégé à chaque étape.
                  </p>
                  <div className="space-y-4">
                    {[
                      "Vous réservez et payez en ligne de manière sécurisée",
                      "Le paiement est bloqué sur un compte sécurisé (24-48h)",
                      "Le promeneur effectue la prestation et envoie une preuve",
                      "Vous validez la preuve et le paiement est débloqué"
                    ].map((step, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <p>{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-xl font-bold mb-6">Protection garantie à chaque prestation</h3>
                  <ul className="space-y-4">
                    {[
                      "Remboursement intégral si prestation non effectuée",
                      "Médiation professionnelle en cas de litige",
                      "Historique complet des preuves conservé 1 an",
                      "Commission transparente de 13% tout inclus",
                      "Support client disponible 7 jours sur 7"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </section>

          {/* DogWalking Protect Stats */}
          <section className="mb-16">
            <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-2">DogWalking Protect</h2>
                <p className="opacity-90 mb-8 max-w-2xl mx-auto">
                  Notre programme de protection complet qui garantit la sécurité de votre chien 
                  et votre tranquillité d'esprit à chaque prestation.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
                    <div className="opacity-90">Promeneurs vérifiés</div>
                  </div>
                  <div>
                    <div className="text-4xl md:text-5xl font-bold mb-2">2M€</div>
                    <div className="opacity-90">Assurance incluse</div>
                  </div>
                  <div>
                    <div className="text-4xl md:text-5xl font-bold mb-2">24-48h</div>
                    <div className="opacity-90">Paiement sécurisé</div>
                  </div>
                  <div>
                    <div className="text-4xl md:text-5xl font-bold mb-2">4.9/5</div>
                    <div className="opacity-90">Satisfaction client</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* FAQ Section */}
          <SEOFAQ
            title="Questions fréquentes sur la sécurité"
            subtitle="Toutes vos interrogations sur la protection de votre chien"
            faqs={securiteFAQs}
          />

          {/* CTA */}
          <section className="text-center mt-16 py-12 bg-muted/50 rounded-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Prêt à confier votre chien en toute sérénité ?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Rejoignez la communauté DogWalking et bénéficiez de la plateforme de promenade 
              de chiens la plus sécurisée de France.
            </p>
            <Button size="lg" onClick={() => navigate('/walkers')}>
              Trouver un promeneur vérifié
            </Button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Securite;
