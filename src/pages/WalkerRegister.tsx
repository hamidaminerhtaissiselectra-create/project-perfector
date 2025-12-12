import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { Briefcase, Euro, Clock } from 'lucide-react';

const WalkerRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Candidature envoyée !",
      description: "Nous étudierons votre demande. Connectez Lovable Cloud pour la gestion réelle.",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Devenez promeneur professionnel vérifié</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Rejoignez notre réseau de promeneurs professionnels. Fixez vos tarifs (en respectant nos minimums), 
              gérez vos horaires et gagnez un revenu attractif en prenant soin des chiens de votre quartier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ocean/10 mb-4">
                <Euro className="h-8 w-8 text-ocean" />
              </div>
              <h3 className="font-semibold mb-2">Revenus attractifs</h3>
              <p className="text-sm text-muted-foreground">Fixez vos tarifs (min 8-16€ selon service)</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ocean/10 mb-4">
                <Clock className="h-8 w-8 text-ocean" />
              </div>
              <h3 className="font-semibold mb-2">Total flexibilité</h3>
              <p className="text-sm text-muted-foreground">Horaires et zones d'intervention libres</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ocean/10 mb-4">
                <Briefcase className="h-8 w-8 text-ocean" />
              </div>
              <h3 className="font-semibold mb-2">Paiement sécurisé</h3>
              <p className="text-sm text-muted-foreground">Escrow + commission 13%</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Candidature promeneur vérifié</CardTitle>
              <CardDescription>
                Documents requis : CNI obligatoire, casier judiciaire OU attestation de non-antécédent, 
                preuve d'assurance RC (habitation ou RC pro), photo de profil réelle. Validation manuelle sous 48h.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input id="firstName" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input id="lastName" required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input id="phone" type="tel" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="city">Ville *</Label>
                  <Input id="city" required />
                </div>

                <div>
                  <Label htmlFor="experience">Expérience avec les chiens *</Label>
                  <Textarea 
                    id="experience" 
                    placeholder="Parlez-nous de votre expérience avec les chiens..."
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="motivation">Pourquoi voulez-vous devenir promeneur ? *</Label>
                  <Textarea 
                    id="motivation" 
                    placeholder="Quelle est votre motivation ?"
                    rows={4}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Envoyer ma candidature
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WalkerRegister;
