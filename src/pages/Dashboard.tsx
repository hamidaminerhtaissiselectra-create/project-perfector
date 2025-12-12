import { useEffect, useState } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, Dog as DogIcon, Euro, Clock, Star, Heart, 
  Bell, MessageCircle, Plus, Search, ChevronRight, 
  CheckCircle, AlertCircle, Camera, MapPin, Gift,
  Shield, Eye, Send
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [dogs, setDogs] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingBookings: 0,
    completedBookings: 0,
    totalDogs: 0,
    totalSpent: 0,
    pendingProofs: 0,
    totalFavorites: 0,
    unreadNotifications: 0
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
      return;
    }
    fetchData(session.user.id);
  };

  const fetchData = async (userId: string) => {
    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      setProfile(profileData);

      // Fetch dogs
      const { data: dogsData } = await supabase
        .from('dogs')
        .select('*')
        .eq('owner_id', userId);
      setDogs(dogsData || []);

      // Fetch bookings with walker info
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select('*, dogs(name, breed, photo_url)')
        .eq('owner_id', userId)
        .order('booking_date', { ascending: false });

      if (bookingsData && bookingsData.length > 0) {
        const walkerIds = [...new Set(bookingsData.map(b => b.walker_id))];
        const { data: walkersData } = await supabase
          .from('profiles')
          .select('id, first_name, avatar_url, city')
          .in('id', walkerIds);

        const walkerMap = new Map(walkersData?.map(w => [w.id, w]) || []);
        const enrichedBookings = bookingsData.map(b => ({
          ...b,
          walker: walkerMap.get(b.walker_id)
        }));
        setBookings(enrichedBookings);
      }

      // Fetch favorites
      const { data: favoritesData } = await supabase
        .from('favorites')
        .select('*, walker_profiles(*)')
        .eq('user_id', userId);
      setFavorites(favoritesData || []);

      // Fetch notifications
      const { data: notificationsData } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(5);
      setNotifications(notificationsData || []);

      // Calculate stats
      const now = new Date();
      const upcoming = bookingsData?.filter(
        b => new Date(b.booking_date) >= now && b.status !== 'cancelled'
      ) || [];
      const completed = bookingsData?.filter(b => b.status === 'completed') || [];
      const totalSpent = completed.reduce((sum, b) => sum + Number(b.total_price), 0);
      const pendingProofs = bookingsData?.filter(b => 
        b.status === 'completed' && !b.proof_validated
      ) || [];
      const unreadNotifs = notificationsData?.filter(n => !n.is_read) || [];

      setStats({
        totalBookings: bookingsData?.length || 0,
        upcomingBookings: upcoming.length,
        completedBookings: completed.length,
        totalDogs: dogsData?.length || 0,
        totalSpent,
        pendingProofs: pendingProofs.length,
        totalFavorites: favoritesData?.length || 0,
        unreadNotifications: unreadNotifs.length
      });
    } catch (error: any) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string, proofSubmitted?: boolean) => {
    const statusMap: Record<string, { label: string; variant: any; icon?: any }> = {
      pending: { label: 'En attente', variant: 'secondary', icon: Clock },
      confirmed: { label: 'Confirmée', variant: 'default', icon: CheckCircle },
      completed: { label: 'Terminée', variant: 'outline', icon: CheckCircle },
      cancelled: { label: 'Annulée', variant: 'destructive', icon: AlertCircle },
    };
    const { label, variant, icon: Icon } = statusMap[status] || statusMap.pending;
    return (
      <Badge variant={variant} className="flex items-center gap-1">
        {Icon && <Icon className="h-3 w-3" />}
        {label}
      </Badge>
    );
  };

  const getServiceLabel = (serviceType: string) => {
    const services: Record<string, string> = {
      promenade: "Promenade",
      visite_domicile: "Visite à domicile",
      hebergement_nuit: "Hébergement nuit",
      hebergement_jour: "Hébergement jour",
      garde_domicile: "Garde à domicile",
      visite_sanitaire: "Visite sanitaire",
      accompagnement_veterinaire: "Accompagnement vétérinaire"
    };
    return services[serviceType] || serviceType;
  };

  const markNotificationRead = async (notificationId: string) => {
    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-24">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const upcomingBookings = bookings.filter(
    b => new Date(b.booking_date) >= new Date() && b.status !== 'cancelled'
  ).slice(0, 5);

  const recentBookings = bookings.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback className="bg-primary/10 text-primary text-xl">
                {profile?.first_name?.charAt(0)}{profile?.last_name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Bonjour {profile?.first_name} 👋</h1>
              <p className="text-muted-foreground">Bienvenue sur votre espace propriétaire</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate('/referral')}>
              <Gift className="h-4 w-4 mr-2" />
              Parrainage
            </Button>
            <Button onClick={() => navigate('/walkers')}>
              <Search className="h-4 w-4 mr-2" />
              Trouver un promeneur
            </Button>
          </div>
        </div>

        {/* Profile Completion Alert */}
        {(!profile?.phone || !profile?.city) && (
          <Card className="mb-6 border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900">
            <CardContent className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="font-medium">Complétez votre profil</p>
                  <p className="text-sm text-muted-foreground">Ajoutez votre téléphone et ville pour faciliter les réservations</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate('/profile')}>
                Compléter
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Réservations</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-primary font-medium">{stats.upcomingBookings}</span> à venir
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Mes chiens</CardTitle>
              <DogIcon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDogs}</div>
              <p className="text-xs text-muted-foreground">enregistrés</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Dépensé</CardTitle>
              <Euro className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSpent.toFixed(0)}€</div>
              <p className="text-xs text-muted-foreground">
                {stats.completedBookings} promenades
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Favoris</CardTitle>
              <Heart className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalFavorites}</div>
              <p className="text-xs text-muted-foreground">promeneurs</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          <Button onClick={() => navigate('/dogs/add')} variant="outline" className="h-auto py-4 flex flex-col gap-2 hover:border-primary hover:bg-primary/5">
            <Plus className="h-5 w-5 text-primary" />
            <span className="text-sm">Ajouter un chien</span>
          </Button>
          <Button onClick={() => navigate('/walkers')} variant="outline" className="h-auto py-4 flex flex-col gap-2 hover:border-primary hover:bg-primary/5">
            <Search className="h-5 w-5 text-primary" />
            <span className="text-sm">Trouver promeneur</span>
          </Button>
          <Button onClick={() => navigate('/bookings')} variant="outline" className="h-auto py-4 flex flex-col gap-2 hover:border-primary hover:bg-primary/5">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="text-sm">Mes réservations</span>
          </Button>
          <Button onClick={() => navigate('/messages')} variant="outline" className="h-auto py-4 flex flex-col gap-2 hover:border-primary hover:bg-primary/5 relative">
            <MessageCircle className="h-5 w-5 text-primary" />
            <span className="text-sm">Messages</span>
          </Button>
          <Button onClick={() => navigate('/referral')} variant="outline" className="h-auto py-4 flex flex-col gap-2 hover:border-primary hover:bg-primary/5">
            <Gift className="h-5 w-5 text-primary" />
            <span className="text-sm">Parrainage</span>
          </Button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Bookings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Bookings */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Prochaines réservations</CardTitle>
                  <CardDescription>{stats.upcomingBookings} réservation(s) à venir</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('/bookings')}>
                  Voir tout <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                {upcomingBookings.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-30" />
                    <h3 className="font-semibold mb-2">Aucune réservation à venir</h3>
                    <p className="text-muted-foreground mb-4">Trouvez un promeneur de confiance pour votre compagnon</p>
                    <Button onClick={() => navigate('/walkers')}>
                      <Search className="h-4 w-4 mr-2" />
                      Réserver une promenade
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingBookings.map(booking => (
                      <div 
                        key={booking.id} 
                        className="flex items-center gap-4 p-4 border rounded-xl hover:bg-muted/50 cursor-pointer transition-colors" 
                        onClick={() => navigate(`/bookings/${booking.id}`)}
                      >
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={booking.walker?.avatar_url} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {booking.walker?.first_name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold truncate">{booking.dogs?.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {getServiceLabel(booking.service_type)}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(booking.booking_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {booking.start_time}
                            </span>
                            <span>avec {booking.walker?.first_name}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(booking.status)}
                          <p className="font-bold mt-1">{Number(booking.total_price).toFixed(2)}€</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* My Dogs */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Mes chiens</CardTitle>
                  <CardDescription>{dogs.length} chien(s) enregistré(s)</CardDescription>
                </div>
                <Button onClick={() => navigate('/dogs/add')} size="sm">
                  <Plus className="h-4 w-4 mr-2" /> Ajouter
                </Button>
              </CardHeader>
              <CardContent>
                {dogs.length === 0 ? (
                  <div className="text-center py-12">
                    <DogIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-30" />
                    <h3 className="font-semibold mb-2">Aucun chien enregistré</h3>
                    <p className="text-muted-foreground mb-4">Ajoutez votre premier compagnon pour réserver des promenades</p>
                    <Button onClick={() => navigate('/dogs/add')}>
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter mon chien
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dogs.map(dog => (
                      <div key={dog.id} className="flex items-center gap-4 p-4 border rounded-xl hover:bg-muted/50 transition-colors">
                        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          {dog.photo_url ? (
                            <img src={dog.photo_url} alt={dog.name} className="h-14 w-14 rounded-full object-cover" />
                          ) : (
                            <DogIcon className="h-7 w-7 text-primary" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{dog.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {dog.breed} {dog.age && `• ${dog.age} ans`} {dog.weight && `• ${dog.weight}kg`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Notifications */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notifications
                  {stats.unreadNotifications > 0 && (
                    <Badge variant="destructive" className="text-xs px-1.5">
                      {stats.unreadNotifications}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {notifications.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">Aucune notification</p>
                ) : (
                  <div className="space-y-3">
                    {notifications.slice(0, 4).map(notif => (
                      <div 
                        key={notif.id} 
                        className={`p-3 rounded-lg border ${!notif.is_read ? 'bg-primary/5 border-primary/20' : ''}`}
                        onClick={() => markNotificationRead(notif.id)}
                      >
                        <p className="text-sm font-medium">{notif.title}</p>
                        <p className="text-xs text-muted-foreground">{notif.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(notif.created_at).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Security Info */}
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Paiement sécurisé</p>
                    <p className="text-xs text-muted-foreground">Système escrow</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Votre paiement est bloqué jusqu'à la validation de la preuve photo/vidéo. 
                  100% sécurisé.
                </p>
                <Button variant="link" className="p-0 h-auto text-primary" onClick={() => navigate('/securite')}>
                  En savoir plus →
                </Button>
              </CardContent>
            </Card>

            {/* Referral CTA */}
            <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
              <CardContent className="pt-6 text-center">
                <Gift className="h-10 w-10 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Parrainez vos amis !</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Gagnez 15€ pour chaque ami parrainé
                </p>
                <Button onClick={() => navigate('/referral')} className="w-full">
                  Inviter des amis
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
