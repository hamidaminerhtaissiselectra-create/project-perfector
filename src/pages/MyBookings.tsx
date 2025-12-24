import { useEffect, useState } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Dog as DogIcon } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
      return;
    }

    try {
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
          *,
          dogs (name, breed)
        `)
        .eq('owner_id', session.user.id)
        .order('booking_date', { ascending: false });

      if (bookingsError) throw bookingsError;

      // Fetch walker profiles separately
      const walkerIds = [...new Set(bookingsData?.map(b => b.walker_id) || [])];
      const { data: walkersData, error: walkersError } = await supabase
        .from('profiles')
        .select('id, first_name, city')
        .in('id', walkerIds);

      if (walkersError) throw walkersError;

      // Map walker info to bookings
      const walkerMap = new Map(walkersData?.map(w => [w.id, w]) || []);
      const enrichedBookings = bookingsData?.map(booking => {
        const walker = walkerMap.get(booking.walker_id);
        return {
          ...booking,
          walker_name: walker?.first_name || 'Promeneur',
          walker_city: walker?.city || ''
        };
      });

      setBookings(enrichedBookings || []);
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

  const filterBookings = (status?: string) => {
    if (!status) {
      const now = new Date();
      return bookings.filter(
        b => new Date(b.booking_date) >= now && b.status !== 'cancelled'
      );
    }
    return bookings.filter(b => b.status === status);
  };

  const BookingCard = ({ booking }: { booking: any }) => (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">{booking.dogs?.name}</h3>
            <p className="text-sm text-muted-foreground">{booking.dogs?.breed}</p>
          </div>
          {getStatusBadge(booking.status)}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{new Date(booking.booking_date).toLocaleDateString('fr-FR')}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{booking.start_time} - {booking.duration_minutes} min</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <DogIcon className="h-4 w-4 text-muted-foreground" />
            <span>{booking.walker_name}</span>
          </div>
          {booking.walker_city && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{booking.walker_city}</span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Prix total</span>
          <span className="text-lg font-bold">{Number(booking.total_price).toFixed(2)}€</span>
        </div>
      </CardContent>
    </Card>
  );

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

  const upcomingBookings = filterBookings();
  const pastBookings = filterBookings('completed');
  const cancelledBookings = filterBookings('cancelled');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Mes Réservations</h1>
          <p className="text-muted-foreground">Gérez toutes vos promenades</p>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="upcoming">À venir ({upcomingBookings.length})</TabsTrigger>
            <TabsTrigger value="past">Terminées ({pastBookings.length})</TabsTrigger>
            <TabsTrigger value="cancelled">Annulées ({cancelledBookings.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            {upcomingBookings.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-semibold mb-2">Aucune réservation à venir</h3>
                <p className="text-muted-foreground">
                  Trouvez un promeneur pour réserver votre prochaine promenade
                </p>
              </div>
            ) : (
              upcomingBookings.map(booking => <BookingCard key={booking.id} booking={booking} />)
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            {pastBookings.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-semibold mb-2">Aucune promenade terminée</h3>
                <p className="text-muted-foreground">
                  Votre historique de promenades apparaîtra ici
                </p>
              </div>
            ) : (
              pastBookings.map(booking => <BookingCard key={booking.id} booking={booking} />)
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="mt-6">
            {cancelledBookings.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">Aucune réservation annulée</h3>
              </div>
            ) : (
              cancelledBookings.map(booking => <BookingCard key={booking.id} booking={booking} />)
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default MyBookings;
