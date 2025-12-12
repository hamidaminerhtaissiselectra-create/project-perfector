import { useEffect } from 'react';
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Dog, MapPin, Euro } from 'lucide-react';
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooking();
  }, [id]);

  const fetchBooking = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          dogs (name, breed, age, weight)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      // Fetch walker info
      const { data: walker, error: walkerError } = await supabase
        .from('profiles')
        .select('first_name, city, phone')
        .eq('id', data.walker_id)
        .single();

      if (walkerError) throw walkerError;

      setBooking({ ...data, walker });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: any }> = {
      pending: { label: 'En attente', variant: 'secondary' },
      confirmed: { label: 'Confirmée', variant: 'default' },
      completed: { label: 'Terminée', variant: 'outline' },
      cancelled: { label: 'Annulée', variant: 'destructive' },
    };
    const { label, variant } = statusMap[status] || statusMap.pending;
    return <Badge variant={variant}>{label}</Badge>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-24">
          <p>Chargement...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-24">
          <h1 className="text-4xl font-bold mb-8">Réservation introuvable</h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2">Détails de la réservation</h1>
            <p className="text-muted-foreground">Réservation #{booking.id.slice(0, 8)}</p>
          </div>
          {getStatusBadge(booking.status)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations de la promenade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-semibold">{new Date(booking.booking_date).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Heure et durée</p>
                  <p className="font-semibold">{booking.start_time} - {booking.duration_minutes} minutes</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Euro className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Prix</p>
                  <p className="font-semibold text-lg">{Number(booking.total_price).toFixed(2)}€</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informations du chien</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Dog className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Nom</p>
                  <p className="font-semibold">{booking.dogs?.name}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Race</p>
                <p className="font-semibold">{booking.dogs?.breed}</p>
              </div>
              {booking.dogs?.age && (
                <div>
                  <p className="text-sm text-muted-foreground">Âge</p>
                  <p className="font-semibold">{booking.dogs.age} ans</p>
                </div>
              )}
              {booking.dogs?.weight && (
                <div>
                  <p className="text-sm text-muted-foreground">Poids</p>
                  <p className="font-semibold">{booking.dogs.weight} kg</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Promeneur</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Nom</p>
              <p className="font-semibold text-lg">{booking.walker?.first_name}</p>
            </div>
            {booking.walker?.city && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{booking.walker.city}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {booking.special_notes && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Instructions spéciales</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{booking.special_notes}</p>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BookingDetails;
