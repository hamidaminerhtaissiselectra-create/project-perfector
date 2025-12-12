import { useEffect, useState } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Euro, Calendar, Star, TrendingUp, Clock, Dog as DogIcon,
  Camera, Upload, CheckCircle, AlertCircle, XCircle, 
  MessageCircle, ChevronRight, MapPin, Shield, Award,
  FileText, Eye
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const WalkerDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [walkerProfile, setWalkerProfile] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [badges, setBadges] = useState<any[]>([]);
  const [stats, setStats] = useState({
    monthlyEarnings: 0,
    pendingEarnings: 0,
    totalWalks: 0,
    completedThisMonth: 0,
    averageRating: 0,
    totalReviews: 0,
    acceptanceRate: 100,
    responseTime: "< 1h"
  });
  const [upcomingBookings, setUpcomingBookings] = useState<any[]>([]);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
      return;
    }

    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (profileData?.user_type !== 'walker') {
      toast({
        title: "Accès refusé",
        description: "Cette page est réservée aux promeneurs",
        variant: "destructive"
      });
      navigate('/dashboard');
      return;
    }

    setProfile(profileData);
    fetchWalkerData(session.user.id);
  };

  const fetchWalkerData = async (walkerId: string) => {
    try {
      // Fetch walker profile
      const { data: walkerData } = await supabase
        .from('walker_profiles')
        .select('*')
        .eq('id', walkerId)
        .single();
      setWalkerProfile(walkerData);

      // Fetch documents
      const { data: docsData } = await supabase
        .from('walker_documents')
        .select('*')
        .eq('walker_id', walkerId);
      setDocuments(docsData || []);

      // Fetch badges
      const { data: badgesData } = await supabase
        .from('walker_badges')
        .select('*')
        .eq('walker_id', walkerId);
      setBadges(badgesData || []);

      // Fetch bookings
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select('*, dogs(name, breed, photo_url)')
        .eq('walker_id', walkerId)
        .order('booking_date', { ascending: true });

      if (bookingsData) {
        // Get owner info
        const ownerIds = [...new Set(bookingsData.map(b => b.owner_id))];
        const { data: ownersData } = await supabase
          .from('profiles')
          .select('id, first_name, avatar_url, city, phone')
          .in('id', ownerIds);

        const ownerMap = new Map(ownersData?.map(o => [o.id, o]) || []);
        const enrichedBookings = bookingsData.map(b => ({
          ...b,
          owner: ownerMap.get(b.owner_id)
        }));

        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const upcoming = enrichedBookings.filter(
          b => new Date(b.booking_date) >= now && b.status === 'confirmed'
        );
        const pending = enrichedBookings.filter(b => b.status === 'pending');
        const completedThisMonth = enrichedBookings.filter(
          b => b.status === 'completed' && new Date(b.created_at) >= startOfMonth
        );
        const allCompleted = enrichedBookings.filter(b => b.status === 'completed');

        const monthlyEarnings = completedThisMonth.reduce((sum, b) => 
          sum + Number(b.total_price) * 0.87, 0
        );
        const pendingEarnings = pending.reduce((sum, b) => 
          sum + Number(b.total_price) * 0.87, 0
        );

        setStats({
          monthlyEarnings,
          pendingEarnings,
          totalWalks: allCompleted.length,
          completedThisMonth: completedThisMonth.length,
          averageRating: walkerData?.rating || 0,
          totalReviews: walkerData?.total_reviews || 0,
          acceptanceRate: 95,
          responseTime: "< 1h"
        });

        setUpcomingBookings(upcoming.slice(0, 5));
        setPendingRequests(pending.slice(0, 5));
      }
    } catch (error: any) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleBookingAction = async (bookingId: string, action: 'confirmed' | 'cancelled') => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: action })
        .eq('id', bookingId);

      if (error) throw error;

      toast({
        title: action === 'confirmed' ? "Réservation acceptée" : "Réservation refusée",
        description: action === 'confirmed' 
          ? "Le propriétaire sera notifié" 
          : "La réservation a été annulée"
      });

      // Refresh data
      const { data: { session } } = await supabase.auth.getSession();
      if (session) fetchWalkerData(session.user.id);
    } catch (error: any) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
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

  const getDocumentStatus = (docType: string) => {
    const doc = documents.find(d => d.document_type === docType);
    if (!doc) return { status: 'missing', label: 'Non soumis', variant: 'outline' };
    if (doc.verification_status === 'approved') return { status: 'approved', label: 'Vérifié', variant: 'default' };
    if (doc.verification_status === 'rejected') return { status: 'rejected', label: 'Refusé', variant: 'destructive' };
    return { status: 'pending', label: 'En attente', variant: 'secondary' };
  };

  const getServiceLabel = (serviceType: string) => {
    const services: Record<string, string> = {
      promenade: "Promenade",
      visite_domicile: "Visite",
      hebergement_nuit: "Hébergement nuit",
      hebergement_jour: "Hébergement jour",
      garde_domicile: "Garde",
      visite_sanitaire: "Visite sanitaire",
      accompagnement_veterinaire: "Vétérinaire"
    };
    return services[serviceType] || serviceType;
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

  const verificationProgress = () => {
    const requiredDocs = ['id_card', 'criminal_record', 'insurance'];
    const approvedDocs = documents.filter(d => 
      requiredDocs.includes(d.document_type) && d.verification_status === 'approved'
    );
    return Math.round((approvedDocs.length / requiredDocs.length) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback className="bg-primary/10 text-primary text-xl">
                {profile?.first_name?.charAt(0)}{profile?.last_name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl md:text-4xl font-bold">{profile?.first_name}</h1>
                {walkerProfile?.is_verified && (
                  <Badge className="bg-primary text-primary-foreground">
                    <Shield className="h-3 w-3 mr-1" />
                    Vérifié
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">Tableau de bord promeneur</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate('/walker/earnings')}>
              <Euro className="h-4 w-4 mr-2" />
              Mes gains
            </Button>
            <Button variant="outline" onClick={() => navigate('/messages')}>
              <MessageCircle className="h-4 w-4 mr-2" />
              Messages
            </Button>
            <Button onClick={() => navigate('/profile')}>
              Modifier mon profil
            </Button>
          </div>
        </div>

        {/* Verification Alert */}
        {!walkerProfile?.is_verified && (
          <Card className="mb-6 border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900">
            <CardContent className="py-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="font-medium">Compte en cours de vérification</p>
                    <p className="text-sm text-muted-foreground">Soumettez vos documents pour être vérifié</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-amber-600">{verificationProgress()}%</span>
              </div>
              <Progress value={verificationProgress()} className="h-2" />
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Gains ce mois</CardTitle>
              <Euro className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.monthlyEarnings.toFixed(2)}€</div>
              <p className="text-xs text-muted-foreground">
                +{stats.pendingEarnings.toFixed(2)}€ en attente
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Promenades</CardTitle>
              <DogIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalWalks}</div>
              <p className="text-xs text-muted-foreground">{stats.completedThisMonth} ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Note moyenne</CardTitle>
              <Star className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center gap-1">
                {stats.averageRating > 0 ? stats.averageRating.toFixed(1) : '-'}
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              </div>
              <p className="text-xs text-muted-foreground">{stats.totalReviews} avis</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Taux d'acceptation</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.acceptanceRate}%</div>
              <p className="text-xs text-muted-foreground">Réponse {stats.responseTime}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pending Requests */}
            {pendingRequests.length > 0 && (
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-primary" />
                        Demandes en attente
                      </CardTitle>
                      <CardDescription>{pendingRequests.length} demande(s) à traiter</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingRequests.map(booking => (
                    <div key={booking.id} className="p-4 border-2 border-dashed border-primary/30 rounded-xl bg-primary/5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={booking.owner?.avatar_url} />
                            <AvatarFallback>{booking.owner?.first_name?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{booking.owner?.first_name}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {booking.owner?.city || 'Non spécifié'}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline">{getServiceLabel(booking.service_type)}</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-2">
                          <DogIcon className="h-4 w-4 text-muted-foreground" />
                          <span>{booking.dogs?.name} ({booking.dogs?.breed})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{new Date(booking.booking_date).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{booking.start_time} - {booking.duration_minutes}min</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Euro className="h-4 w-4 text-muted-foreground" />
                          <span className="font-semibold">{Number(booking.total_price).toFixed(2)}€</span>
                        </div>
                      </div>

                      {booking.special_notes && (
                        <p className="text-sm text-muted-foreground mb-4 p-2 bg-background rounded">
                          "{booking.special_notes}"
                        </p>
                      )}

                      <div className="flex gap-3">
                        <Button 
                          className="flex-1" 
                          onClick={() => handleBookingAction(booking.id, 'confirmed')}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Accepter
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleBookingAction(booking.id, 'cancelled')}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Refuser
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Upcoming Bookings */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Prochaines missions</CardTitle>
                  <CardDescription>{upcomingBookings.length} mission(s) confirmée(s)</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                {upcomingBookings.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-30" />
                    <h3 className="font-semibold mb-2">Aucune mission à venir</h3>
                    <p className="text-muted-foreground">Vos prochaines réservations apparaîtront ici</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingBookings.map(booking => (
                      <div key={booking.id} className="flex items-center gap-4 p-4 border rounded-xl">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <DogIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="font-semibold">{booking.dogs?.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {getServiceLabel(booking.service_type)}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(booking.booking_date).toLocaleDateString('fr-FR', { 
                                weekday: 'short', day: 'numeric', month: 'short' 
                              })}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {booking.start_time} - {booking.duration_minutes}min
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{Number(booking.total_price).toFixed(2)}€</p>
                          <Button variant="outline" size="sm" className="mt-2">
                            <Camera className="h-3 w-3 mr-1" />
                            Envoyer preuve
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Documents Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Documents
                </CardTitle>
                <CardDescription>Statut de vérification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { type: 'id_card', label: "Carte d'identité", required: true },
                  { type: 'criminal_record', label: 'Casier judiciaire', required: true },
                  { type: 'insurance', label: 'Assurance RC', required: true },
                  { type: 'photo', label: 'Photo de profil', required: false }
                ].map(doc => {
                  const status = getDocumentStatus(doc.type);
                  return (
                    <div key={doc.type} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        {status.status === 'approved' && <CheckCircle className="h-4 w-4 text-primary" />}
                        {status.status === 'pending' && <Clock className="h-4 w-4 text-amber-500" />}
                        {status.status === 'rejected' && <XCircle className="h-4 w-4 text-destructive" />}
                        {status.status === 'missing' && <AlertCircle className="h-4 w-4 text-muted-foreground" />}
                        <span className="text-sm">{doc.label}</span>
                        {doc.required && <span className="text-xs text-destructive">*</span>}
                      </div>
                      <Badge variant={status.variant as any}>{status.label}</Badge>
                    </div>
                  );
                })}
                <Button variant="outline" className="w-full mt-3">
                  <Upload className="h-4 w-4 mr-2" />
                  Soumettre un document
                </Button>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                {badges.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    <Award className="h-10 w-10 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">Aucun badge pour le moment</p>
                    <p className="text-xs">Complétez des missions pour en obtenir</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {badges.map(badge => (
                      <div key={badge.id} className="text-center p-2">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-1">
                          <Award className="h-6 w-6 text-primary" />
                        </div>
                        <p className="text-xs">{badge.badge_type}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* My Services */}
            <Card>
              <CardHeader>
                <CardTitle>Mes tarifs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {walkerProfile?.service_rates && Object.entries(walkerProfile.service_rates).map(([service, rate]) => (
                  <div key={service} className="flex justify-between items-center text-sm">
                    <span>{getServiceLabel(service)}</span>
                    <span className="font-semibold">{String(rate)}€</span>
                  </div>
                ))}
                <Button variant="link" className="w-full mt-2 p-0" onClick={() => navigate('/profile')}>
                  Modifier mes tarifs →
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

export default WalkerDashboard;
