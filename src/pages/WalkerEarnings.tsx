import { useEffect, useState } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Euro, TrendingUp, TrendingDown, Calendar, Download, 
  CreditCard, Clock, CheckCircle, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const WalkerEarnings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [earnings, setEarnings] = useState({
    thisMonth: 0,
    lastMonth: 0,
    total: 0,
    pending: 0,
    available: 0
  });
  const [transactions, setTransactions] = useState<any[]>([]);
  const [monthlyStats, setMonthlyStats] = useState<any[]>([]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('user_type')
      .eq('id', session.user.id)
      .single();

    if (profile?.user_type !== 'walker') {
      navigate('/dashboard');
      return;
    }

    fetchEarningsData(session.user.id);
  };

  const fetchEarningsData = async (walkerId: string) => {
    try {
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select('*')
        .eq('walker_id', walkerId)
        .order('scheduled_date', { ascending: false });

      if (bookingsData) {
        const now = new Date();
        const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

        const completed = bookingsData.filter(b => b.status === 'completed');
        const thisMonthCompleted = completed.filter(
          b => new Date(b.scheduled_date) >= startOfThisMonth
        );
        const lastMonthCompleted = completed.filter(
          b => new Date(b.scheduled_date) >= startOfLastMonth && 
               new Date(b.scheduled_date) < startOfThisMonth
        );

        const commission = 0.13;
        const thisMonth = thisMonthCompleted.reduce((sum, b) => 
          sum + Number(b.price || 0) * (1 - commission), 0
        );
        const lastMonth = lastMonthCompleted.reduce((sum, b) => 
          sum + Number(b.price || 0) * (1 - commission), 0
        );
        const total = completed.reduce((sum, b) => 
          sum + Number(b.price || 0) * (1 - commission), 0
        );

        // Pending = confirmed but not completed yet
        const pendingPayments = bookingsData.filter(
          b => b.status === 'confirmed'
        ).reduce((sum, b) => sum + Number(b.price || 0) * (1 - commission), 0);

        // Available = completed (owner_confirmed acts as payment release)
        const availableBalance = completed.filter(b => b.owner_confirmed)
          .reduce((sum, b) => sum + Number(b.price || 0) * (1 - commission), 0);

        setEarnings({
          thisMonth,
          lastMonth,
          total,
          pending: pendingPayments,
          available: availableBalance
        });

        // Create transaction history
        const transactionList = completed.map(b => ({
          id: b.id,
          date: b.scheduled_date,
          amount: Number(b.price || 0) * (1 - commission),
          gross: Number(b.price || 0),
          commission: Number(b.price || 0) * commission,
          status: b.owner_confirmed ? 'released' : 'pending',
          type: 'earning'
        }));
        setTransactions(transactionList);

        // Calculate monthly stats for last 6 months
        const monthlyData = [];
        for (let i = 5; i >= 0; i--) {
          const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
          const monthName = monthStart.toLocaleDateString('fr-FR', { month: 'short' });
          
          const monthEarnings = completed.filter(b => {
            const date = new Date(b.scheduled_date);
            return date >= monthStart && date <= monthEnd;
          }).reduce((sum, b) => sum + Number(b.price || 0) * (1 - commission), 0);

          const monthMissions = completed.filter(b => {
            const date = new Date(b.scheduled_date);
            return date >= monthStart && date <= monthEnd;
          }).length;

          monthlyData.push({
            month: monthName,
            earnings: monthEarnings,
            missions: monthMissions
          });
        }
        setMonthlyStats(monthlyData);
      }
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

  const percentChange = earnings.lastMonth > 0 
    ? Math.round(((earnings.thisMonth - earnings.lastMonth) / earnings.lastMonth) * 100)
    : earnings.thisMonth > 0 ? 100 : 0;

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
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Mes Gains</h1>
            <p className="text-muted-foreground">
              Suivez vos revenus et gérez vos paiements
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
            <Button>
              <CreditCard className="h-4 w-4 mr-2" />
              Demander un retrait
            </Button>
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Solde disponible
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">
                {earnings.available.toFixed(2)}€
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Prêt à être retiré
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                En attente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600">
                {earnings.pending.toFixed(2)}€
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                En attente de validation
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total gagné
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {earnings.total.toFixed(2)}€
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Depuis le début
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Ce mois-ci</span>
                {percentChange !== 0 && (
                  <Badge 
                    variant={percentChange > 0 ? "default" : "destructive"}
                    className="flex items-center gap-1"
                  >
                    {percentChange > 0 ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {Math.abs(percentChange)}%
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Euro className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <div className="text-3xl font-bold">{earnings.thisMonth.toFixed(2)}€</div>
                  <p className="text-sm text-muted-foreground">
                    vs {earnings.lastMonth.toFixed(2)}€ le mois dernier
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Évolution mensuelle</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between h-32 gap-2">
                {monthlyStats.map((stat, index) => {
                  const maxEarnings = Math.max(...monthlyStats.map(s => s.earnings));
                  const height = maxEarnings > 0 ? (stat.earnings / maxEarnings) * 100 : 0;
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-1">
                      <div 
                        className="w-full bg-primary/20 rounded-t relative group cursor-pointer hover:bg-primary/30 transition-colors"
                        style={{ height: `${Math.max(height, 5)}%` }}
                      >
                        <div 
                          className="absolute bottom-0 left-0 right-0 bg-primary rounded-t transition-all"
                          style={{ height: `${height}%` }}
                        />
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {stat.earnings.toFixed(0)}€
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{stat.month}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle>Historique des transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">Tout</TabsTrigger>
                <TabsTrigger value="pending">En attente</TabsTrigger>
                <TabsTrigger value="released">Débloqué</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                {transactions.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Euro className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Aucune transaction pour le moment</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {transactions.map(tx => (
                      <div key={tx.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            tx.status === 'released' ? 'bg-green-100' : 'bg-amber-100'
                          }`}>
                            {tx.status === 'released' ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <Clock className="h-5 w-5 text-amber-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold">Mission complétée</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(tx.date).toLocaleDateString('fr-FR')}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">+{tx.amount.toFixed(2)}€</p>
                          <p className="text-xs text-muted-foreground">
                            {tx.gross.toFixed(2)}€ - {tx.commission.toFixed(2)}€ commission
                          </p>
                          <Badge 
                            variant={tx.status === 'released' ? 'outline' : 'secondary'}
                            className="mt-1"
                          >
                            {tx.status === 'released' ? 'Débloqué' : 'En attente'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="pending">
                {transactions.filter(tx => tx.status === 'pending').length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>Aucun paiement en attente</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {transactions.filter(tx => tx.status === 'pending').map(tx => (
                      <div key={tx.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                            <Clock className="h-5 w-5 text-amber-600" />
                          </div>
                          <div>
                            <p className="font-semibold">Mission complétée</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(tx.date).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">+{tx.amount.toFixed(2)}€</p>
                          <Badge variant="secondary">En attente</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="released">
                {transactions.filter(tx => tx.status === 'released').length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>Aucun paiement débloqué</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {transactions.filter(tx => tx.status === 'released').map(tx => (
                      <div key={tx.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-semibold">Mission complétée</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(tx.date).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">+{tx.amount.toFixed(2)}€</p>
                          <Badge variant="outline">Débloqué</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 bg-muted/50">
          <CardContent className="py-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Euro className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Comment fonctionnent les paiements ?</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>13% de commission</strong> est prélevée sur chaque mission</li>
                  <li>• Les paiements sont <strong>bloqués 24-48h</strong> (escrow) le temps de valider la preuve</li>
                  <li>• Une fois la preuve validée, le paiement est <strong>automatiquement débloqué</strong></li>
                  <li>• Vous pouvez demander un <strong>retrait à tout moment</strong> (minimum 20€)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default WalkerEarnings;