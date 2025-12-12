import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const defaultTab = searchParams.get('type') === 'owner' ? 'register' : 'login';

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/dashboard');
      }
    });
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Erreur de connexion",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
    } else {
      toast({
        title: "Connexion réussie",
        description: "Bienvenue !",
      });
      navigate('/dashboard');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const phone = formData.get('phone') as string;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          first_name: firstName,
          last_name: lastName,
          user_type: 'owner',
          phone: phone || null,
        }
      }
    });

    if (error) {
      toast({
        title: "Erreur d'inscription",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
    } else {
      toast({
        title: "Inscription réussie",
        description: "Vous pouvez maintenant vous connecter",
      });
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button 
          variant="ghost" 
          className="mb-4 text-white hover:text-white/80"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à l'accueil
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Bienvenue sur DogWalking</CardTitle>
            <CardDescription className="text-center">
              Connectez-vous ou créez un compte pour continuer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={defaultTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Connexion</TabsTrigger>
                <TabsTrigger value="register">Inscription</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="votre@email.com" required />
                  </div>
                  <div>
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input id="password" name="password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Connexion...' : 'Se connecter'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input id="firstName" name="firstName" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nom</Label>
                      <Input id="lastName" name="lastName" required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email-register">Email</Label>
                    <Input id="email-register" name="email" type="email" placeholder="votre@email.com" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="06 12 34 56 78" />
                  </div>
                  <div>
                    <Label htmlFor="password-register">Mot de passe</Label>
                    <Input id="password-register" name="password" type="password" required minLength={6} />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Inscription...' : 'S\'inscrire'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
