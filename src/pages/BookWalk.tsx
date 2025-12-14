import { useEffect, useState } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Star, MapPin, Shield, Clock, Calendar, Dog, CheckCircle, Lock, ArrowLeft } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type ServiceType = Database['public']['Enums']['service_type'];

interface ServiceOption {
  id: ServiceType;
  label: string;
  description: string;
  minPrice: number;
}

const serviceOptions: ServiceOption[] = [
  { id: 'promenade', label: 'Promenade', description: 'Balade en extérieur', minPrice: 8 },
  { id: 'visite', label: 'Visite à domicile', description: 'Passage chez vous', minPrice: 8 },
  { id: 'garde', label: 'Garde', description: 'Garde de votre chien', minPrice: 10 },
  { id: 'veterinaire', label: 'Accompagnement vétérinaire', description: 'Transport et RDV véto', minPrice: 13 },
];

const BookWalk = () => {
  const { walkerId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [dogs, setDogs] = useState<any[]>([]);
  const [walker, setWalker] = useState<any>(null);
  const [selectedDog, setSelectedDog] = useState<string>('');
  const [selectedService, setSelectedService] = useState<ServiceType>('promenade');
  const [duration, setDuration] = useState('30');
  const [step, setStep] = useState(1);

  useEffect(() => {
    checkAuth();
    if (walkerId) {
      fetchWalker();
    }
  }, [walkerId]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
      return;
    }
    setUserId(session.user.id);
    fetchDogs(session.user.id);
  };

  const fetchDogs = async (ownerId: string) => {
    const { data, error } = await supabase
      .from('dogs')
      .select('*')
      .eq('owner_id', ownerId);

    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      setDogs(data || []);
    }
  };

  const fetchWalker = async () => {
    // Fetch walker profile with user info
    const { data: walkerData, error: walkerError } = await supabase
      .from('walker_profiles')
      .select('*')
      .eq('user_id', walkerId)
      .single();

    if (walkerError) {
      // Try with id instead
      const { data: walkerById, error: walkerByIdError } = await supabase
        .from('walker_profiles')
        .select('*')
        .eq('id', walkerId)
        .single();
      
      if (walkerByIdError) {
        toast({ title: "Erreur", description: "Promeneur introuvable", variant: "destructive" });
        return;
      }
      
      // Get profile info
      const { data: profileData } = await supabase
        .from('profiles')
        .select('first_name, avatar_url, city')
        .eq('id', walkerById.user_id)
        .single();
      
      setWalker({ ...walkerById, ...profileData });
      return;
    }

    // Get profile info
    const { data: profileData } = await supabase
      .from('profiles')
      .select('first_name, avatar_url, city')
      .eq('id', walkerData.user_id)
      .single();

    setWalker({ ...walkerData, ...profileData });
  };

  const calculatePrice = () => {
    if (!walker) return 15;
    const serviceOption = serviceOptions.find(s => s.id === selectedService);
    const basePrice = serviceOption?.minPrice || 8;
    // For promenade, multiply by duration
    if (selectedService === 'promenade') {
      return (walker.hourly_rate || basePrice) * parseInt(duration) / 30;
    }
    return walker.hourly_rate || basePrice;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !walkerId) return;

    if (dogs.length === 0) {
      toast({
        title: "Aucun chien",
        description: "Vous devez d'abord ajouter un chien",
        variant: "destructive",
      });
      navigate('/dogs/add');
      return;
    }

    if (!selectedDog) {
      toast({
        title: "Sélectionnez un chien",
        description: "Veuillez sélectionner le chien pour cette prestation",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);

    try {
      const { error } = await supabase.from('bookings').insert({
        owner_id: userId,
        walker_id: walkerId,
        dog_id: selectedDog,
        scheduled_date: formData.get('date') as string,
        scheduled_time: formData.get('time') as string,
        duration_minutes: parseInt(duration),
        price: calculatePrice(),
        notes: formData.get('notes') as string || null,
        service_type: selectedService,
      });

      if (error) throw error;

      toast({
        title: "Réservation effectuée !",
        description: "Votre demande a été envoyée. Le paiement sera bloqué jusqu'à validation.",
      });
      navigate('/bookings');
    } catch (error: any) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main form */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-6">Réserver une prestation</h1>

            {/* Progress steps */}
            <div className="flex items-center gap-2 mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {s}
                  </div>
                  {s < 3 && <div className={`w-12 h-1 ${step > s ? 'bg-primary' : 'bg-muted'}`} />}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Choisir le service</CardTitle>
                    <CardDescription>Sélectionnez le type de prestation souhaitée</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup value={selectedService} onValueChange={(v) => setSelectedService(v as ServiceType)}>
                      <div className="grid grid-cols-1 gap-3">
                        {serviceOptions.map((service) => (
                          <Label
                            key={service.id}
                            htmlFor={service.id}
                            className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                              selectedService === service.id 
                                ? 'border-primary bg-primary/5' 
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value={service.id} id={service.id} />
                              <div>
                                <p className="font-medium">{service.label}</p>
                                <p className="text-sm text-muted-foreground">{service.description}</p>
                              </div>
                            </div>
                            <Badge variant="secondary">dès {service.minPrice}€</Badge>
                          </Label>
                        ))}
                      </div>
                    </RadioGroup>
                    <Button type="button" className="w-full mt-4" onClick={() => setStep(2)}>
                      Continuer
                    </Button>
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Détails de la réservation</CardTitle>
                    <CardDescription>Sélectionnez votre chien et la date</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>Chien *</Label>
                      <Select value={selectedDog} onValueChange={setSelectedDog} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un chien" />
                        </SelectTrigger>
                        <SelectContent>
                          {dogs.map((dog) => (
                            <SelectItem key={dog.id} value={dog.id}>
                              {dog.name} ({dog.breed})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {dogs.length === 0 && (
                        <Button variant="link" className="p-0 mt-2" onClick={() => navigate('/dogs/add')}>
                          + Ajouter un chien
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">Date *</Label>
                        <Input id="date" name="date" type="date" required min={new Date().toISOString().split('T')[0]} />
                      </div>
                      <div>
                        <Label htmlFor="time">Heure de début *</Label>
                        <Input id="time" name="time" type="time" required />
                      </div>
                    </div>

                    {selectedService === 'promenade' && (
                      <div>
                        <Label>Durée de la promenade</Label>
                        <Select value={duration} onValueChange={setDuration}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 heure</SelectItem>
                            <SelectItem value="90">1h30</SelectItem>
                            <SelectItem value="120">2 heures</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div>
                      <Label htmlFor="notes">Instructions spéciales (optionnel)</Label>
                      <Textarea 
                        id="notes" 
                        name="notes"
                        placeholder="Informations importantes pour le promeneur..."
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button type="button" variant="outline" onClick={() => setStep(1)}>
                        Retour
                      </Button>
                      <Button type="button" className="flex-1" onClick={() => setStep(3)} disabled={!selectedDog}>
                        Continuer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Confirmation</CardTitle>
                    <CardDescription>Vérifiez les détails de votre réservation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Service</span>
                        <span className="font-medium">
                          {serviceOptions.find(s => s.id === selectedService)?.label}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Chien</span>
                        <span className="font-medium">
                          {dogs.find(d => d.id === selectedDog)?.name}
                        </span>
                      </div>
                      {selectedService === 'promenade' && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Durée</span>
                          <span className="font-medium">{duration} minutes</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-3 border-t">
                        <span className="font-semibold">Total</span>
                        <span className="text-xl font-bold text-primary">{calculatePrice().toFixed(2)}€</span>
                      </div>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Lock className="h-5 w-5 text-amber-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-amber-800 dark:text-amber-200">Paiement sécurisé (Escrow)</p>
                          <p className="text-sm text-amber-700 dark:text-amber-300">
                            Le paiement sera bloqué et débloqué uniquement après réception de la preuve photo/vidéo de la prestation.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button type="button" variant="outline" onClick={() => setStep(2)}>
                        Retour
                      </Button>
                      <Button type="submit" className="flex-1" disabled={loading}>
                        {loading ? 'Réservation...' : 'Confirmer et payer'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </form>
          </div>

          {/* Walker sidebar */}
          <div className="md:col-span-1">
            {walker && (
              <Card className="sticky top-24">
                <CardContent className="p-6 text-center">
                  {walker.avatar_url ? (
                    <img 
                      src={walker.avatar_url} 
                      alt={walker.first_name} 
                      className="w-20 h-20 rounded-full mx-auto object-cover mb-4 border-4 border-primary/20" 
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full mx-auto bg-muted flex items-center justify-center text-3xl mb-4">
                      👤
                    </div>
                  )}
                  <h3 className="text-lg font-bold">{walker.first_name}</h3>
                  {walker.city && (
                    <p className="text-sm text-muted-foreground flex items-center justify-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {walker.city}
                    </p>
                  )}

                  <div className="flex items-center justify-center gap-2 mt-3">
                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                    <span className="font-bold">{walker.rating || '0.0'}</span>
                    {walker.total_reviews > 0 && (
                      <span className="text-sm text-muted-foreground">({walker.total_reviews})</span>
                    )}
                  </div>

                  {walker.verified && (
                    <Badge className="mt-3" variant="secondary">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Vérifié
                    </Badge>
                  )}

                  <div className="mt-4 pt-4 border-t text-left">
                    <p className="text-sm font-medium mb-2">Inclus avec DogWalking :</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li className="flex items-center gap-2">
                        <Shield className="h-3 w-3 text-primary" />
                        Assurance incluse
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-primary" />
                        Preuves photo/vidéo
                      </li>
                      <li className="flex items-center gap-2">
                        <Lock className="h-3 w-3 text-primary" />
                        Paiement sécurisé
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookWalk;