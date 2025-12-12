import { useEffect, useState } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, Dog, Calendar, Euro, TrendingUp, AlertCircle,
  CheckCircle, XCircle, Clock, FileText, Shield, Eye,
  BarChart3, Activity, UserCheck, UserX
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOwners: 0,
    totalWalkers: 0,
    activeWalkers: 0,
    pendingWalkers: 0,
    totalBookings: 0,
    completedBookings: 0,
    pendingBookings: 0,
    cancelledBookings: 0,
    revenue: 0,
    commission: 0,
    averageBookingValue: 0
  });
  const [pendingDocuments, setPendingDocuments] = useState<any[]>([]);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
      return;
    }

    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .eq('role', 'admin')
      .single();

    if (!roles) {
      toast({
        title: "Accès refusé",
        description: "Cette page est réservée aux administrateurs",
        variant: "destructive"
      });
      navigate('/dashboard');
      return;
    }

    fetchAdminStats();
  };

  const fetchAdminStats = async () => {
    try {
      // Count users by type
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('user_type');

      const owners = profilesData?.filter(p => p.user_type === 'owner').length || 0;
      const walkers = profilesData?.filter(p => p.user_type === 'walker').length || 0;

      // Count walker verification status
      const { data: walkerProfiles } = await supabase
        .from('walker_profiles')
        .select('is_verified');

      const activeWalkers = walkerProfiles?.filter(w => w.is_verified).length || 0;
      const pendingWalkers = walkerProfiles?.filter(w => !w.is_verified).length || 0;

      // Bookings stats
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select('status, total_price, created_at');

      const completed = bookingsData?.filter(b => b.status === 'completed') || [];
      const pending = bookingsData?.filter(b => b.status === 'pending') || [];
      const cancelled = bookingsData?.filter(b => b.status === 'cancelled') || [];
      
      const revenue = completed.reduce((sum, b) => sum + Number(b.total_price), 0);
      const commission = revenue * 0.13;

      // Pending documents
      const { data: docsData } = await supabase
        .from('walker_documents')
        .select('*, profiles:walker_id(first_name, last_name, email)')
        .eq('verification_status', 'pending')
        .order('created_at', { ascending: false })
        .limit(10);
      setPendingDocuments(docsData || []);

      // Recent bookings
      const { data: recentBookingsData } = await supabase
        .from('bookings')
        .select('*, dogs(name)')
        .order('created_at', { ascending: false })
        .limit(5);
      setRecentBookings(recentBookingsData || []);

      // Recent users
      const { data: recentUsersData } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      setRecentUsers(recentUsersData || []);

      setStats({
        totalUsers: profilesData?.length || 0,
        totalOwners: owners,
        totalWalkers: walkers,
        activeWalkers,
        pendingWalkers,
        totalBookings: bookingsData?.length || 0,
        completedBookings: completed.length,
        pendingBookings: pending.length,
        cancelledBookings: cancelled.length,
        revenue,
        commission,
        averageBookingValue: completed.length > 0 ? revenue / completed.length : 0
      });
    } catch (error: any) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentAction = async (docId: string, action: 'approved' | 'rejected', reason?: string) => {
    try {
      const updateData: any = {
        verification_status: action,
        verified_at: new Date().toISOString()
      };
      if (reason) updateData.rejection_reason = reason;

      const { error } = await supabase
        .from('walker_documents')
        .update(updateData)
        .eq('id', docId);

      if (error) throw error;

      toast({
        title: action === 'approved' ? "Document approuvé" : "Document refusé",
        description: "Le promeneur sera notifié"
      });

      fetchAdminStats();
    } catch (error: any) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    }
  };

  const getDocTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      id_card: "Carte d'identité",
      criminal_record: "Casier judiciaire",
      insurance: "Assurance RC",
      photo: "Photo de profil"
    };
    return types[type] || type;
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
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Administration</h1>
            <p className="text-muted-foreground">Tableau de bord administrateur DogWalking</p>
          </div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Shield className="h-4 w-4 mr-2" />
            Admin
          </Badge>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Revenus Total</CardTitle>
              <Euro className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.revenue.toFixed(2)}€</div>
              <p className="text-xs text-muted-foreground">
                Commission: {stats.commission.toFixed(2)}€ (13%)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalOwners} propriétaires • {stats.totalWalkers} promeneurs
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Réservations</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
              <p className="text-xs text-muted-foreground">
                {stats.completedBookings} terminées • {stats.pendingBookings} en attente
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Promeneurs</CardTitle>
              <Dog className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeWalkers}</div>
              <p className="text-xs text-muted-foreground">
                vérifiés • {stats.pendingWalkers} en attente
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="documents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="documents" className="relative">
              Documents
              {pendingDocuments.length > 0 && (
                <Badge variant="destructive" className="ml-2 px-1.5 text-xs">
                  {pendingDocuments.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="bookings">Réservations</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="stats">Statistiques</TabsTrigger>
          </TabsList>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Documents en attente de vérification
                </CardTitle>
                <CardDescription>
                  {pendingDocuments.length} document(s) à vérifier
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pendingDocuments.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-16 w-16 mx-auto mb-4 text-primary opacity-50" />
                    <h3 className="font-semibold mb-2">Tous les documents sont traités</h3>
                    <p className="text-muted-foreground">Aucun document en attente de vérification</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingDocuments.map(doc => (
                      <div key={doc.id} className="flex items-center justify-between p-4 border rounded-xl">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarFallback>
                              {doc.profiles?.first_name?.charAt(0)}{doc.profiles?.last_name?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">
                              {doc.profiles?.first_name} {doc.profiles?.last_name}
                            </p>
                            <p className="text-sm text-muted-foreground">{doc.profiles?.email}</p>
                            <Badge variant="outline" className="mt-1">
                              {getDocTypeLabel(doc.document_type)}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                              <Eye className="h-4 w-4 mr-1" />
                              Voir
                            </a>
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => handleDocumentAction(doc.id, 'approved')}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approuver
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDocumentAction(doc.id, 'rejected', 'Document non conforme')}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Refuser
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Dernières réservations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map(booking => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">{booking.dogs?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(booking.booking_date).toLocaleDateString('fr-FR')} à {booking.start_time}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        {getStatusBadge(booking.status)}
                        <span className="font-bold">{Number(booking.total_price).toFixed(2)}€</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Derniers utilisateurs inscrits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map(user => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar_url} />
                          <AvatarFallback>
                            {user.first_name?.charAt(0)}{user.last_name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{user.first_name} {user.last_name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={user.user_type === 'walker' ? 'default' : 'secondary'}>
                          {user.user_type === 'walker' ? 'Promeneur' : 'Propriétaire'}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(user.created_at).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Statistiques financières
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <span>Revenus totaux</span>
                    <span className="text-xl font-bold">{stats.revenue.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <span>Commission DogWalking (13%)</span>
                    <span className="text-xl font-bold text-primary">{stats.commission.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <span>Panier moyen</span>
                    <span className="text-xl font-bold">{stats.averageBookingValue.toFixed(2)}€</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Statistiques utilisateurs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-primary" />
                      <span>Promeneurs vérifiés</span>
                    </div>
                    <span className="text-xl font-bold">{stats.activeWalkers}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-500" />
                      <span>En attente de vérification</span>
                    </div>
                    <span className="text-xl font-bold">{stats.pendingWalkers}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span>Taux de complétion</span>
                    </div>
                    <span className="text-xl font-bold">
                      {stats.totalBookings > 0 
                        ? ((stats.completedBookings / stats.totalBookings) * 100).toFixed(0) 
                        : 0}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
