import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Shield, Lock, Camera, CreditCard, Clock, Award } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { SEOHead } from "@/components/ui/seo-head";
import { SEOFAQ } from "@/components/ui/seo-faq";
import tarifsHero from "@/assets/pages/tarifs-hero.jpg";

const Tarifs = () => {
  const navigate = useNavigate();
  const services = [
    {
      name: "Promenade",
      minPrice: "8€",
      description: "Durée libre",
      features: ["Exercice adapté", "Preuves photo/vidéo", "Message du promeneur", "Tarif libre promeneur"]
    },
    {
      name: "Visite à domicile",
      minPrice: "8€",
      description: "Passage chez vous",
      features: ["Nourriture et eau", "Compagnie et jeux", "Preuves photo/vidéo", "Rapport détaillé"]
    },
    {
      name: "Hébergement nuit",
      minPrice: "10€",
      description: "Chez le promeneur",
      features: ["Nuit complète sécurisée", "Environnement familial", "Suivi régulier", "Photos et messages"],
      popular: true
    },
    {
      name: "Garderie jour",
      minPrice: "10€",
      description: "Garderie de jour",
      features: ["Journée complète", "Socialisation", "Activités variées", "Preuves régulières"]
    },
    {
      name: "Garde à domicile",
      minPrice: "12€",
      description: "Chez vous - Nuit",
      features: ["Promeneur chez vous", "Routine préservée", "Sécurité maximale", "Suivi complet"]
    },
    {
      name: "Visite sanitaire",
      minPrice: "16€",
      description: "Entretien + soins",
      features: ["Brossage et soins", "Produits propriétaire", "Hygiène quotidienne", "Photos avant/après"]
    },
    {
      name: "Accomp. vétérinaire",
      minPrice: "13€",
      description: "Transport inclus",
      features: ["Prise en charge", "Accompagnement RDV", "Compte-rendu détaillé", "Photos et suivi"]
    }
  ];

  const guarantees = [
    { icon: Shield, title: "Promeneurs vérifiés", description: "CNI, casier judiciaire et assurance RC vérifiés" },
    { icon: Lock, title: "Paiement escrow", description: "Argent bloqué jusqu'à validation de la preuve" },
    { icon: Camera, title: "Preuves obligatoires", description: "Photo/vidéo + message pendant chaque mission" },
    { icon: CreditCard, title: "Commission 13%", description: "Tout inclus : assurance, support, plateforme" }
  ];

  const faqItems = [
    {
      question: "Comment sont calculés les tarifs sur DogWalking ?",
      answer: "Nous fixons des tarifs minimums garantis pour chaque type de service (à partir de 8€). Chaque promeneur est ensuite libre de fixer ses propres tarifs au-dessus de ces minimums, en fonction de son expérience et de ses services."
    },
    {
      question: "Que comprend la commission de 13% ?",
      answer: "La commission DogWalking de 13% inclut l'assurance responsabilité civile jusqu'à 2M€, le support client, la plateforme sécurisée, le système de paiement escrow et la gestion des preuves photo/vidéo."
    },
    {
      question: "Puis-je donner un pourboire au promeneur ?",
      answer: "Oui, vous pouvez donner un pourboire à votre promeneur après chaque prestation. Les pourboires sont 100% reversés au promeneur sans commission."
    },
    {
      question: "Quand suis-je débité pour une réservation ?",
      answer: "Le paiement est effectué au moment de la réservation mais reste bloqué en escrow. Il n'est libéré au promeneur qu'après validation de la preuve de prestation (photo/vidéo obligatoire)."
    },
    {
      question: "Puis-je annuler une réservation et être remboursé ?",
      answer: "Oui, vous pouvez annuler gratuitement jusqu'à 24h avant la prestation prévue. Passé ce délai, des frais d'annulation peuvent s'appliquer selon les conditions du promeneur."
    },
    {
      question: "L'abonnement PRO est-il obligatoire pour les promeneurs ?",
      answer: "Non, l'abonnement PRO (6-12€/mois) est optionnel. Il offre des avantages supplémentaires comme une mise en avant dans les résultats, des badges premium et des statistiques avancées."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Tarifs DogWalking | Prix Promenade Chien, Garde, Visite à Domicile"
        description="Découvrez nos tarifs transparents : promenade dès 8€, garde dès 10€, visite à domicile dès 8€. Commission 13% tout inclus avec assurance et paiement sécurisé."
        canonicalUrl="https://dogwalking.fr/tarifs"
      />
      <Header />
      <main className="container mx-auto px-4 pt-20 pb-12">
        {/* Hero with image */}
        <div className="relative rounded-2xl overflow-hidden mb-10 md:mb-12">
          <img 
            src={tarifsHero} 
            alt="Réservation et paiement sécurisé sur l'application DogWalking" 
            className="w-full h-48 md:h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
            <span className="inline-block bg-primary/10 backdrop-blur text-primary px-4 py-1 rounded-full text-sm font-medium mb-3">
              Tarifs transparents
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">Nos Services & Tarifs</h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Tarifs minimums garantis. Commission DogWalking : 13% (assurance + support inclus).
            </p>
          </div>
        </div>
        {/* Guarantees */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto mb-10 md:mb-12">
          {guarantees.map((item, index) => (
            <div key={index} className="bg-card rounded-xl p-4 text-center shadow-soft border border-border">
              <item.icon className="h-6 w-6 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto mb-10 md:mb-12">
          {services.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${plan.popular ? 'border-primary shadow-lg ring-2 ring-primary/20' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  Populaire
                </div>
              )}
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-primary">dès {plan.minPrice}</span>
                </div>
                <p className="text-xs text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  variant={plan.popular ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => navigate('/walkers')}
                >
                  Réserver
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How Payment Works */}
        <div className="max-w-4xl mx-auto space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Comment fonctionne le paiement escrow ?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { step: "1", title: "Réservation", desc: "Votre paiement est bloqué en sécurité (escrow). Le promeneur ne reçoit rien immédiatement." },
                { step: "2", title: "Mission + Preuve", desc: "Le promeneur effectue la mission et envoie obligatoirement une photo/vidéo avec message." },
                { step: "3", title: "Validation", desc: "Vous recevez la preuve. Le paiement est débloqué automatiquement (ou vous validez manuellement)." },
                { step: "4", title: "Paiement promeneur", desc: "Le promeneur reçoit son paiement (87%). DogWalking prélève 13% (assurance + support inclus)." }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-accent" />
                Abonnement PRO Promeneur (optionnel)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 py-2">
                <div>
                  <p className="font-semibold">6-12€/mois</p>
                  <p className="text-sm text-muted-foreground">Mise en avant, badges premium, stats avancées</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('/walker/register')}>
                  Devenir promeneur PRO
                </Button>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground mb-12">
            * Tarifs minimums garantis. Chaque promeneur fixe ses propres tarifs. Pourboires possibles.
          </p>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Questions fréquentes sur les tarifs</h2>
            <SEOFAQ faqs={faqItems} title="" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tarifs;