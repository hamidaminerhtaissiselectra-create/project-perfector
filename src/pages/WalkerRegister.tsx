import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { Briefcase, Euro, Clock, Shield, Users, MapPin, CheckCircle, Award, Heart, TrendingUp, FileText, Camera } from 'lucide-react';
import { SEOHead } from "@/components/ui/seo-head";
import { SEOFAQ } from "@/components/ui/seo-faq";

const deveniPromeneurFAQs = [
  {
    question: "Quels documents dois-je fournir pour devenir promeneur vérifié ?",
    answer: "Pour rejoindre notre réseau de promeneurs professionnels, vous devez fournir : une pièce d'identité valide (CNI ou passeport), un extrait de casier judiciaire de moins de 3 mois OU une attestation de non-antécédent judiciaire, une attestation d'assurance responsabilité civile (habitation ou RC professionnelle couvrant l'activité de garde d'animaux), et une photo de profil récente et professionnelle. Tous ces documents sont vérifiés manuellement par notre équipe dans un délai de 48 heures ouvrées."
  },
  {
    question: "Comment fonctionne la commission et le paiement sur DogWalking ?",
    answer: "DogWalking applique une commission de 13% sur chaque prestation effectuée. Cette commission couvre les frais de plateforme, le système de paiement sécurisé, l'assurance complémentaire et le support client. Les paiements sont versés automatiquement sur votre compte bancaire chaque semaine. Par exemple, pour une promenade facturée 15€, vous recevez 13,05€ net. Le système d'escrow garantit que vous êtes toujours payé pour les prestations effectuées."
  },
  {
    question: "Puis-je choisir mes horaires et ma zone d'intervention ?",
    answer: "Absolument ! Vous avez une liberté totale sur vos horaires de disponibilité et votre zone géographique d'intervention. Vous définissez vos jours de travail, vos créneaux horaires, et le rayon autour de votre domicile dans lequel vous acceptez les missions. Vous pouvez modifier ces paramètres à tout moment depuis votre tableau de bord promeneur. Cette flexibilité vous permet de concilier facilement cette activité avec vos autres engagements."
  },
  {
    question: "Quels sont les tarifs minimum imposés par la plateforme ?",
    answer: "DogWalking impose des tarifs minimum pour garantir une rémunération équitable et un service de qualité. Les minimums sont : 8€ pour une promenade courte (30 min), 12€ pour une promenade standard (1h), 16€ pour une garde journée, et des tarifs adaptés pour les visites à domicile et accompagnements vétérinaires. Vous êtes libre de fixer des tarifs supérieurs selon votre expérience, vos qualifications ou les spécificités de votre zone géographique."
  },
  {
    question: "Comment fonctionne le système de badges et de notation ?",
    answer: "Notre système de badges récompense votre engagement et votre qualité de service. Vous pouvez obtenir des badges comme 'Super Promeneur' (50+ promenades avec note moyenne supérieure à 4.8), 'Fidélité' (1 an d'ancienneté), 'Spécialiste grands chiens', etc. Les clients vous notent après chaque prestation sur 5 étoiles et peuvent laisser un commentaire. Une bonne réputation vous permet d'attirer plus de clients et de justifier des tarifs plus élevés."
  },
  {
    question: "Que se passe-t-il en cas de problème pendant une promenade ?",
    answer: "En cas d'incident (chien blessé, perdu, ou problème avec un tiers), vous êtes protégé par notre assurance complémentaire DogWalking Protect. Contactez immédiatement notre support d'urgence disponible 7j/7. Nous vous guiderons dans les démarches et prendrons en charge les frais vétérinaires si nécessaire. Chaque promenade est également suivie par GPS pour votre sécurité et celle du chien. Documentez toujours les incidents avec photos et descriptions."
  },
  {
    question: "Combien de temps faut-il pour être validé comme promeneur ?",
    answer: "Le processus de validation prend généralement 24 à 48 heures ouvrées après soumission de votre dossier complet. Notre équipe vérifie manuellement chaque document pour garantir la sécurité de notre communauté. Vous recevez un email de confirmation dès que votre profil est validé et vous pouvez immédiatement commencer à recevoir des demandes de promenade. Si des documents sont manquants ou illisibles, nous vous contactons pour les compléter."
  }
];

const WalkerRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Candidature envoyée !",
      description: "Nous étudierons votre demande sous 48h. Vous recevrez un email de confirmation.",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Devenir Promeneur de Chiens Professionnel | Rejoignez DogWalking"
        description="Devenez promeneur de chiens professionnel vérifié. Fixez vos tarifs, gérez vos horaires librement et gagnez un revenu attractif. Commission 13%, paiement sécurisé, assurance incluse."
        keywords="devenir promeneur chien, job promenade chien, travail avec animaux, revenus complémentaires, dog walker emploi, métier promeneur canin"
        canonicalUrl="https://dogwalking.fr/devenir-promeneur"
      />
      <Header />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Devenez promeneur professionnel vérifié</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Rejoignez notre réseau de promeneurs professionnels passionnés par les chiens. 
              Exercez une activité flexible et enrichissante tout en étant accompagné par une plateforme 
              qui valorise votre travail et garantit votre sécurité.
            </p>
          </div>

          {/* Avantages clés */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 rounded-2xl bg-card border hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Euro className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Revenus attractifs</h3>
              <p className="text-muted-foreground">
                Fixez vos propres tarifs (minimum 8-16€ selon service). 
                Gardez 87% de vos gains avec notre commission transparente de 13%.
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-card border hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Flexibilité totale</h3>
              <p className="text-muted-foreground">
                Choisissez vos horaires, vos jours de disponibilité et votre zone d'intervention. 
                Idéal en complément d'une autre activité.
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-card border hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Sécurité garantie</h3>
              <p className="text-muted-foreground">
                Paiement sécurisé par escrow, assurance complémentaire incluse, 
                et support disponible 7j/7 en cas de besoin.
              </p>
            </div>
          </div>

          {/* Pourquoi nous rejoindre */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Pourquoi devenir promeneur DogWalking ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Demande croissante</h3>
                    <p className="text-muted-foreground">
                      Le marché des services pour animaux de compagnie connaît une croissance annuelle de 15%. 
                      De plus en plus de propriétaires recherchent des promeneurs de confiance pour s'occuper de leurs compagnons 
                      pendant leurs heures de travail ou leurs absences.
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Clientèle fidèle</h3>
                    <p className="text-muted-foreground">
                      Une fois la confiance établie, les propriétaires préfèrent garder le même promeneur. 
                      Construisez une clientèle régulière et développez des relations durables avec les chiens dont vous vous occupez.
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                    <Heart className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Passion au quotidien</h3>
                    <p className="text-muted-foreground">
                      Transformez votre amour des animaux en activité professionnelle. 
                      Chaque jour est différent, chaque chien a sa personnalité. 
                      Un métier épanouissant pour les amoureux des animaux.
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Reconnaissance</h3>
                    <p className="text-muted-foreground">
                      Notre système de badges et d'avis valorise votre expertise. 
                      Les Super Promeneurs bénéficient d'une visibilité accrue et peuvent pratiquer des tarifs premium 
                      reconnus par la communauté.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Comment ça marche */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Comment devenir promeneur en 4 étapes</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: 1, icon: FileText, title: "Candidature", desc: "Remplissez le formulaire avec vos informations et votre motivation" },
                { step: 2, icon: Camera, title: "Documents", desc: "Envoyez CNI, casier judiciaire, attestation assurance et photo" },
                { step: 3, icon: CheckCircle, title: "Vérification", desc: "Notre équipe valide votre dossier sous 48h ouvrées" },
                { step: 4, icon: MapPin, title: "Activité", desc: "Configurez votre zone et commencez à recevoir des demandes" }
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground mb-4">
                    <item.icon className="h-7 w-7" />
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-secondary text-secondary-foreground text-sm font-bold flex items-center justify-center">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Formulaire de candidature */}
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="text-2xl">Candidature promeneur vérifié</CardTitle>
              <CardDescription className="text-base">
                Documents requis : CNI obligatoire, casier judiciaire OU attestation de non-antécédent, 
                preuve d'assurance RC (habitation ou RC pro), photo de profil réelle. 
                Validation manuelle sous 48h ouvrées.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input id="firstName" required placeholder="Jean" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input id="lastName" required placeholder="Dupont" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" required placeholder="jean.dupont@email.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input id="phone" type="tel" required placeholder="06 12 34 56 78" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">Ville *</Label>
                    <Input id="city" required placeholder="Paris" />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Code postal *</Label>
                    <Input id="postalCode" required placeholder="75001" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="experience">Expérience avec les chiens *</Label>
                  <Textarea 
                    id="experience" 
                    placeholder="Décrivez votre expérience avec les chiens : animaux personnels, bénévolat en refuge, formations suivies, races que vous connaissez bien..."
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="motivation">Pourquoi voulez-vous devenir promeneur ? *</Label>
                  <Textarea 
                    id="motivation" 
                    placeholder="Expliquez votre motivation : passion pour les animaux, recherche de flexibilité, reconversion professionnelle, complément de revenus..."
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="availability">Disponibilités souhaitées</Label>
                  <Textarea 
                    id="availability" 
                    placeholder="Indiquez vos créneaux de disponibilité : jours de la semaine, horaires préférés, contraintes particulières..."
                    rows={3}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Envoyer ma candidature
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Questions fréquentes sur le métier de promeneur</h2>
            <SEOFAQ 
              faqs={deveniPromeneurFAQs}
              title="FAQ Devenir Promeneur"
            />
          </section>

          {/* CTA final */}
          <div className="text-center p-8 rounded-2xl bg-primary/5 border border-primary/20">
            <h2 className="text-2xl font-bold mb-4">Prêt à rejoindre l'aventure ?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Des milliers de propriétaires de chiens recherchent des promeneurs de confiance dans votre quartier. 
              Rejoignez notre communauté et commencez à exercer une activité passionnante dès cette semaine.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" onClick={() => document.getElementById('firstName')?.focus()}>
                Postuler maintenant
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/tarifs')}>
                Voir les tarifs
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WalkerRegister;
