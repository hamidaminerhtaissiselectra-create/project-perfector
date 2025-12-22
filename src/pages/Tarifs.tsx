import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Shield, Lock, Camera, CreditCard, Clock, Award, Euro, Users, Heart } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { SEOHead, generateServiceSchema } from "@/components/ui/seo-head";
import { SEOFAQ, tarifsFAQs } from "@/components/ui/seo-faq";

const Tarifs = () => {
  const navigate = useNavigate();
  
  const services = [
    {
      name: "Promenade",
      minPrice: "8€",
      description: "Durée libre",
      features: ["Exercice adapté", "Preuves photo/vidéo", "Message du promeneur", "Tarif libre promeneur"],
      details: "La promenade est le service le plus demandé. Votre chien profite d'une sortie en extérieur avec un promeneur vérifié qui adapte le parcours et l'intensité à ses besoins."
    },
    {
      name: "Visite à domicile",
      minPrice: "8€",
      description: "Passage chez vous",
      features: ["Nourriture et eau", "Compagnie et jeux", "Preuves photo/vidéo", "Rapport détaillé"],
      details: "Idéal pour les absences courtes. Le promeneur passe chez vous pour nourrir, abreuver et câliner votre compagnon dans son environnement familier."
    },
    {
      name: "Hébergement nuit",
      minPrice: "10€",
      description: "Chez le promeneur",
      features: ["Nuit complète sécurisée", "Environnement familial", "Suivi régulier", "Photos et messages"],
      popular: true,
      details: "Votre chien passe la nuit chez le promeneur dans un cadre familial sécurisé. Il bénéficie d'une attention constante et de compagnie."
    },
    {
      name: "Garderie jour",
      minPrice: "10€",
      description: "Garderie de jour",
      features: ["Journée complète", "Socialisation", "Activités variées", "Preuves régulières"],
      details: "Parfait pour les journées de travail. Votre chien est gardé en journée avec des activités, jeux et socialisation avec d'autres chiens si compatible."
    },
    {
      name: "Garde à domicile",
      minPrice: "12€",
      description: "Chez vous - Nuit",
      features: ["Promeneur chez vous", "Routine préservée", "Sécurité maximale", "Suivi complet"],
      details: "Le promeneur dort chez vous pour que votre chien reste dans son environnement. Sa routine quotidienne est parfaitement préservée."
    },
    {
      name: "Visite sanitaire",
      minPrice: "16€",
      description: "Entretien + soins",
      features: ["Brossage et soins", "Produits propriétaire", "Hygiène quotidienne", "Photos avant/après"],
      details: "Soins d'hygiène et entretien quotidien : brossage, nettoyage des yeux et oreilles, vérification générale. Produits fournis par vos soins."
    },
    {
      name: "Accomp. vétérinaire",
      minPrice: "13€",
      description: "Transport inclus",
      features: ["Prise en charge", "Accompagnement RDV", "Compte-rendu détaillé", "Photos et suivi"],
      details: "Transport et accompagnement de votre chien chez le vétérinaire. Le promeneur vous envoie un compte-rendu détaillé après la consultation."
    }
  ];

  const guarantees = [
    { icon: Shield, title: "Promeneurs vérifiés", description: "CNI, casier judiciaire et assurance RC vérifiés par notre équipe" },
    { icon: Lock, title: "Paiement escrow", description: "Votre argent est bloqué jusqu'à validation de la preuve de prestation" },
    { icon: Camera, title: "Preuves obligatoires", description: "Photo/vidéo + message obligatoire pendant chaque mission" },
    { icon: CreditCard, title: "Commission 13%", description: "Tout inclus : assurance 2M€, support client, plateforme sécurisée" }
  ];

  const advantages = [
    {
      icon: Euro,
      title: "Tarifs transparents",
      description: "Pas de frais cachés ni d'abonnement obligatoire. Vous payez uniquement le service réservé au tarif affiché."
    },
    {
      icon: Users,
      title: "Promeneurs locaux",
      description: "Des promeneurs de votre quartier qui connaissent les meilleurs endroits pour promener votre chien en toute sécurité."
    },
    {
      icon: Heart,
      title: "Satisfaction garantie",
      description: "Si la prestation ne correspond pas, remboursement possible après médiation. Votre satisfaction est notre priorité."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Tarifs Promenade et Garde de Chien"
        description="Découvrez nos tarifs transparents pour la promenade et garde de chien. Dès 8€ avec paiement escrow sécurisé, promeneurs vérifiés et preuves photo obligatoires."
        keywords="tarifs promenade chien, prix garde chien, coût dog sitter, tarif dog walking France"
        canonicalUrl={`${window.location.origin}/tarifs`}
        structuredData={generateServiceSchema({
          name: "Promenade de chien",
          description: "Service de promenade de chien avec promeneur vérifié, paiement sécurisé et preuves photo obligatoires",
          price: "8"
        })}
      />
      
      <Header />
      <main className="container mx-auto px-4 pt-20 pb-12">
        {/* Hero Section */}
        <section className="text-center mb-12 md:mb-16">
          <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
            Tarifs transparents & sans surprise
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Nos Services & Tarifs de Promenade de Chien
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Chez DogWalking, nous croyons en la transparence totale. Nos tarifs minimums sont garantis, 
            et notre commission de 13% inclut l'assurance jusqu'à 2 millions d'euros, le support client 
            et la plateforme sécurisée avec paiement escrow.
          </p>
        </section>

        {/* Guarantees Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto mb-12 md:mb-16">
          {guarantees.map((item, index) => (
            <div key={index} className="bg-card rounded-xl p-4 text-center shadow-soft border border-border hover:shadow-card transition-shadow">
              <item.icon className="h-6 w-6 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </section>

        {/* Services Introduction */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4">Pourquoi choisir DogWalking pour votre chien ?</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Trouver un promeneur de confiance pour votre chien peut être stressant. Chez DogWalking, 
              nous avons créé une plateforme où la sécurité et la transparence sont au cœur de chaque 
              prestation. Chaque promeneur est rigoureusement vérifié : pièce d'identité, casier judiciaire 
              vierge et assurance responsabilité civile sont contrôlés avant toute validation.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Le système de paiement escrow garantit que votre argent n'est débloqué qu'après réception 
              d'une preuve photo ou vidéo de la prestation. Vous gardez le contrôle total et pouvez 
              suivre chaque promenade de votre compagnon à quatre pattes.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            7 services adaptés à vos besoins
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {services.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative ${plan.popular ? 'border-primary shadow-lg ring-2 ring-primary/20' : ''} hover:shadow-card transition-shadow`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    ⭐ Populaire
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
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{plan.details}</p>
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
        </section>

        {/* Advantages Section */}
        <section className="max-w-5xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Les avantages DogWalking
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {advantages.map((adv, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-card border border-border">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <adv.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{adv.title}</h3>
                <p className="text-sm text-muted-foreground">{adv.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How Payment Works */}
        <section className="max-w-4xl mx-auto space-y-4 mb-12">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Comment fonctionne le paiement escrow sécurisé ?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Le paiement escrow est un système de tiers de confiance qui protège à la fois le propriétaire 
                et le promeneur. Voici comment ça fonctionne étape par étape :
              </p>
              {[
                { step: "1", title: "Réservation & Paiement", desc: "Vous réservez un service et payez en ligne. Votre paiement est immédiatement sécurisé sur un compte escrow. Le promeneur ne reçoit rien à ce stade.", icon: CreditCard },
                { step: "2", title: "Prestation & Preuves", desc: "Le promeneur effectue la mission et doit obligatoirement envoyer une photo ou vidéo de votre chien avec un message décrivant la promenade.", icon: Camera },
                { step: "3", title: "Validation", desc: "Vous recevez la preuve en temps réel. Le paiement est automatiquement débloqué après 24-48h, ou vous pouvez valider manuellement plus tôt.", icon: Check },
                { step: "4", title: "Paiement du promeneur", desc: "Le promeneur reçoit 87% du tarif (après commission de 13%). Les fonds sont virés sur son compte sous 2-3 jours ouvrés.", icon: Euro }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-muted/50">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <item.icon className="h-5 w-5 text-primary flex-shrink-0 hidden md:block" />
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
              <p className="text-muted-foreground mb-4">
                Les promeneurs peuvent souscrire à un abonnement PRO pour bénéficier d'avantages supplémentaires 
                et augmenter leur visibilité sur la plateforme.
              </p>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 px-6 bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl">
                <div>
                  <p className="font-bold text-xl text-primary">6-12€/mois</p>
                  <p className="text-sm text-muted-foreground">Mise en avant prioritaire, badges premium, statistiques avancées, support prioritaire</p>
                </div>
                <Button variant="outline" onClick={() => navigate('/walker/register')}>
                  Devenir promeneur PRO
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQ Section */}
        <SEOFAQ
          title="Questions fréquentes sur nos tarifs"
          subtitle="Tout ce que vous devez savoir sur les prix et le paiement"
          faqs={tarifsFAQs}
        />

        {/* Final CTA */}
        <section className="text-center mt-12 py-12 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Prêt à trouver le promeneur idéal ?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Rejoignez des milliers de propriétaires qui font confiance à DogWalking 
            pour le bien-être de leur compagnon à quatre pattes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/walkers')}>
              Trouver un promeneur
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/walker/register')}>
              Devenir promeneur
            </Button>
          </div>
        </section>

        <p className="text-center text-xs text-muted-foreground mt-8">
          * Tarifs minimums garantis. Chaque promeneur fixe ses propres tarifs. Pourboires possibles et appréciés.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Tarifs;
