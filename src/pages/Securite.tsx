import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, FileCheck, Lock, Users, Camera, Phone, CheckCircle, BadgeCheck, CreditCard, Clock } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { SEOHead } from "@/components/ui/seo-head";
import { SEOFAQ } from "@/components/ui/seo-faq";
import securiteHero from "@/assets/pages/securite-hero.jpg";

const Securite = () => {
  const navigate = useNavigate();

  const faqItems = [
    {
      question: "Comment vérifiez-vous l'identité des promeneurs ?",
      answer: "Chaque promeneur doit fournir une pièce d'identité officielle (CNI ou passeport) qui est vérifiée manuellement par notre équipe. Nous vérifions également la cohérence des informations avec le profil créé."
    },
    {
      question: "Qu'est-ce que le paiement escrow et comment fonctionne-t-il ?",
      answer: "Le paiement escrow est un système de séquestre sécurisé. Lorsque vous réservez, votre paiement est bloqué sur un compte sécurisé pendant 24-48h. Il n'est libéré au promeneur qu'après réception et validation de la preuve de prestation (photo/vidéo)."
    },
    {
      question: "Quelle assurance couvre les prestations DogWalking ?",
      answer: "Tous nos promeneurs disposent d'une assurance responsabilité civile couvrant les prestations jusqu'à 2 millions d'euros. Cette assurance protège votre chien, le promeneur et les tiers en cas d'incident."
    },
    {
      question: "Que se passe-t-il si le promeneur n'envoie pas de preuve ?",
      answer: "Sans preuve photo/vidéo obligatoire, le paiement reste bloqué et vous êtes automatiquement remboursé. C'est notre garantie de tranquillité d'esprit."
    },
    {
      question: "Comment signaler un problème pendant ou après une prestation ?",
      answer: "Vous pouvez nous contacter via la messagerie intégrée, par email ou téléphone. Notre équipe support est disponible pour traiter tout litige et assurer une médiation si nécessaire."
    },
    {
      question: "Les promeneurs ont-ils un casier judiciaire vérifié ?",
      answer: "Oui, nous demandons une attestation de non-antécédent ou un extrait de casier judiciaire à tous nos promeneurs avant leur validation sur la plateforme."
    }
  ];

  const features = [
    {
      icon: BadgeCheck,
      title: "Vérification d'identité",
      description: "Chaque promeneur fournit une pièce d'identité vérifiée manuellement par notre équipe avant d'être accepté sur la plateforme."
    },
    {
      icon: FileCheck,
      title: "Casier judiciaire vérifié",
      description: "Attestation de non-antécédent ou extrait de casier judiciaire demandé pour garantir la fiabilité de nos promeneurs."
    },
    {
      icon: Shield,
      title: "Assurance responsabilité civile",
      description: "Tous nos promeneurs disposent d'une assurance RC habitation ou professionnelle couvrant les prestations jusqu'à 2M€."
    },
    {
      icon: Camera,
      title: "Preuves photo/vidéo obligatoires",
      description: "Le promeneur doit envoyer une preuve photo ou vidéo avec un message à chaque prestation. Sans preuve, le paiement reste bloqué."
    },
    {
      icon: Lock,
      title: "Paiement Escrow sécurisé",
      description: "Votre paiement est bloqué 24-48h et n'est débloqué qu'après réception et validation de la preuve de prestation."
    },
    {
      icon: Users,
      title: "Avis et notes transparents",
      description: "Système d'évaluation après chaque prestation pour maintenir un haut niveau de qualité et de confiance."
    },
    {
      icon: CreditCard,
      title: "Transactions cryptées",
      description: "Paiements sécurisés via Stripe, conformes PCI-DSS. Vos données bancaires ne sont jamais stockées sur nos serveurs."
    },
    {
      icon: Phone,
      title: "Support disponible",
      description: "Notre équipe est disponible pour répondre à vos questions et vous assister en cas de problème."
    }
  ];

  const verificationSteps = [
    {
      step: "1",
      title: "Inscription",
      description: "Le promeneur remplit son profil complet avec photo réelle"
    },
    {
      step: "2",
      title: "Documents",
      description: "Envoi de la CNI, attestation casier et preuve d'assurance"
    },
    {
      step: "3",
      title: "Vérification",
      description: "Notre équipe vérifie manuellement tous les documents"
    },
    {
      step: "4",
      title: "Validation",
      description: "Le promeneur est validé et peut recevoir des réservations"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Sécurité DogWalking | Promeneurs Vérifiés, Paiement Escrow, Assurance 2M€"
        description="Découvrez comment DogWalking garantit votre sécurité : vérification d'identité, casier judiciaire, assurance RC 2M€, paiement escrow et preuves photo obligatoires."
        canonicalUrl="https://dogwalking.fr/securite"
      />
      <Header />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-5xl mx-auto">
          {/* Hero with image */}
          <div className="relative rounded-2xl overflow-hidden mb-16">
            <img 
              src={securiteHero} 
              alt="Promeneur vérifié DogWalking avec badge de confiance" 
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 backdrop-blur mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Votre sécurité, notre priorité</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Nous mettons tout en œuvre pour garantir la sécurité de votre chien et votre tranquillité d'esprit à chaque prestation.
              </p>
            </div>
          </div>

          {/* Process */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">Processus de vérification des promeneurs</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {verificationSteps.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground text-xl font-bold flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
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
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Escrow explanation */}
          <Card className="mb-16 overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 bg-primary text-primary-foreground">
                <h2 className="text-2xl font-bold mb-4">Comment fonctionne le paiement Escrow ?</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">1</div>
                    <p>Vous réservez et payez en ligne de manière sécurisée</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">2</div>
                    <p>Le paiement est bloqué sur un compte sécurisé (24-48h)</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">3</div>
                    <p>Le promeneur effectue la prestation et envoie une preuve</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">4</div>
                    <p>Vous validez la preuve et le paiement est débloqué</p>
                  </div>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-xl font-bold mb-4">Protection garantie</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Remboursement si prestation non effectuée</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Médiation en cas de litige</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Historique des preuves conservé</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Commission DogWalking : 13%</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Stats */}
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-8">DogWalking Protect</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <div className="text-4xl font-bold mb-2">100%</div>
                  <div className="opacity-90">Promeneurs vérifiés</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">2M€</div>
                  <div className="opacity-90">Assurance incluse</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">24-48h</div>
                  <div className="opacity-90">Paiement sécurisé</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">13%</div>
                  <div className="opacity-90">Commission transparente</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">Questions fréquentes sur la sécurité</h2>
            <SEOFAQ faqs={faqItems} title="" />
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button size="lg" onClick={() => navigate('/walkers')}>
              Trouver un promeneur vérifié
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Securite;
