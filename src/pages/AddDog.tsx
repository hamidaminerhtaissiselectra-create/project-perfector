import { useEffect, useState } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AddDog = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
      return;
    }
    setUserId(session.user.id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    setLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);

    try {
      const { error } = await supabase.from('dogs').insert({
        owner_id: userId,
        name: formData.get('name') as string,
        breed: formData.get('breed') as string,
        age: formData.get('age') ? parseInt(formData.get('age') as string) : null,
        weight: formData.get('weight') ? parseFloat(formData.get('weight') as string) : null,
        temperament: formData.get('temperament') as string || null,
        special_needs: formData.get('medical') as string || null,
      });

      if (error) throw error;

      toast({
        title: "Chien ajouté !",
        description: "Votre chien a été ajouté avec succès.",
      });
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24 max-w-2xl">
        <h1 className="text-4xl font-bold mb-8">Ajouter un chien</h1>

        <Card>
          <CardHeader>
            <CardTitle>Informations du chien</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Nom du chien *</Label>
                <Input id="name" name="name" required placeholder="Rex, Bella..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="breed">Race *</Label>
                  <Input id="breed" name="breed" required placeholder="Labrador, Berger..." />
                </div>
                <div>
                  <Label htmlFor="age">Âge (années)</Label>
                  <Input id="age" name="age" type="number" min="0" placeholder="3" />
                </div>
              </div>

              <div>
                <Label htmlFor="weight">Poids (kg)</Label>
                <Input id="weight" name="weight" type="number" step="0.1" min="0" placeholder="25" />
              </div>

              <div>
                <Label htmlFor="temperament">Tempérament</Label>
                <Textarea 
                  id="temperament" 
                  name="temperament"
                  placeholder="Calme, joueur, sociable avec les autres chiens..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="medical">Notes médicales (optionnel)</Label>
                <Textarea 
                  id="medical" 
                  name="medical"
                  placeholder="Allergies, traitements, précautions particulières..."
                  rows={3}
                />
              </div>

              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => navigate('/dashboard')} className="flex-1">
                  Annuler
                </Button>
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? 'Ajout...' : 'Ajouter le chien'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AddDog;
