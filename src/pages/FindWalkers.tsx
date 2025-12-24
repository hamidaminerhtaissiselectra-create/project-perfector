import { useEffect, useState } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, Euro, Search, Filter, Shield, Clock, Heart, CheckCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface WalkerWithProfile {
  id: string;
  user_id: string;
  hourly_rate: number | null;
  rating: number | null;
  total_reviews: number | null;
  verified: boolean | null;
  services: string[] | null;
  experience_years: number | null;
  bio?: string;
  first_name?: string;
  avatar_url?: string;
  city?: string;
}

const FindWalkers = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [walkers, setWalkers] = useState<WalkerWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchCity, setSearchCity] = useState(searchParams.get('location') || '');
  const [selectedService, setSelectedService] = useState(searchParams.get('service') || 'all');
  const [sortBy, setSortBy] = useState('rating');

  const services = [
    { value: 'all', label: 'Tous les services' },
    { value: 'promenade', label: 'Promenade' },
    { value: 'visite', label: 'Visite à domicile' },
    { value: 'garde', label: 'Garde' },
    { value: 'veterinaire', label: 'Accompagnement vétérinaire' },
  ];

  useEffect(() => {
    fetchWalkers();
  }, [selectedService, sortBy]);

  const fetchWalkers = async () => {
    try {
      // Fetch walker profiles
      let query = supabase
        .from('walker_profiles')
        .select('*');

      if (sortBy === 'rating') {
        query = query.order('rating', { ascending: false, nullsFirst: false });
      } else if (sortBy === 'price') {
        query = query.order('hourly_rate', { ascending: true, nullsFirst: false });
      } else if (sortBy === 'reviews') {
        query = query.order('total_reviews', { ascending: false, nullsFirst: false });
      }

      const { data: walkerProfiles, error } = await query;

      if (error) throw error;

      if (!walkerProfiles || walkerProfiles.length === 0) {
        setWalkers([]);
        return;
      }

      // Get user ids to fetch profile info
      const userIds = walkerProfiles.map(w => w.user_id);
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, first_name, avatar_url, city, bio')
        .in('id', userIds);

      const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);

      // Merge walker profiles with user profiles
      let merged: WalkerWithProfile[] = walkerProfiles.map(wp => ({
        ...wp,
        ...profileMap.get(wp.user_id)
      }));
      
      // Filter by service if needed
      if (selectedService !== 'all') {
        merged = merged.filter(w => w.services?.includes(selectedService));
      }

      // Filter by city
      if (searchCity) {
        merged = merged.filter(w => 
          w.city?.toLowerCase().includes(searchCity.toLowerCase())
        );
      }

      setWalkers(merged);
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

  const handleSearch = () => {
    fetchWalkers();
  };

  const getServiceLabel = (serviceId: string) => {
    const service = services.find(s => s.value === serviceId);
    return service?.label || serviceId;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Trouver un promeneur</h1>
          <p className="text-muted-foreground">Des promeneurs vérifiés et qualifiés près de chez vous</p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label className="mb-2 block text-sm">Ville ou code postal</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Paris, Lyon..."
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <div>
                <Label className="mb-2 block text-sm">Type de service</Label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les services" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.value} value={service.value}>
                        {service.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-2 block text-sm">Trier par</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Meilleures notes</SelectItem>
                    <SelectItem value="price">Prix croissant</SelectItem>
                    <SelectItem value="reviews">Plus d'avis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button onClick={handleSearch} className="w-full">
                  <Search className="h-4 w-4 mr-2" />
                  Rechercher
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            {walkers.length} promeneur{walkers.length > 1 ? 's' : ''} trouvé{walkers.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4" />
                  <div className="h-4 bg-muted rounded mb-2" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : walkers.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">Aucun promeneur trouvé</h3>
              <p className="text-muted-foreground mb-4">
                Essayez d'élargir vos critères de recherche
              </p>
              <Button variant="outline" onClick={() => {
                setSearchCity('');
                setSelectedService('all');
              }}>
                Réinitialiser les filtres
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {walkers.map((walker) => (
              <Card 
                key={walker.id} 
                className="hover:shadow-lg transition-all duration-300 group overflow-hidden cursor-pointer"
                onClick={() => navigate(`/walker/${walker.user_id}`)}
              >
                <CardContent className="p-0">
                  {/* Avatar section */}
                  <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 p-6 text-center">
                    <div className="relative inline-block">
                      {walker.avatar_url ? (
                        <img 
                          src={walker.avatar_url} 
                          alt={walker.first_name} 
                          className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-background shadow-lg" 
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full mx-auto bg-primary/20 flex items-center justify-center text-4xl border-4 border-background shadow-lg">
                          👤
                        </div>
                      )}
                      {walker.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-1">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mt-4">{walker.first_name || 'Promeneur'}</h3>
                    {walker.city && (
                      <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3" />
                        <span>{walker.city}</span>
                      </div>
                    )}
                  </div>

                  {/* Info section */}
                  <div className="p-6">
                    {/* Rating */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/30 px-2 py-1 rounded-md">
                          <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                          <span className="font-bold text-amber-700 dark:text-amber-400">{walker.rating || '0.0'}</span>
                        </div>
                        {(walker.total_reviews || 0) > 0 && (
                          <span className="text-sm text-muted-foreground">({walker.total_reviews} avis)</span>
                        )}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-muted-foreground hover:text-rose-500"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Heart className="h-5 w-5" />
                      </Button>
                    </div>

                    {/* Experience */}
                    {walker.experience_years && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Clock className="h-4 w-4" />
                        <span>{walker.experience_years} {walker.experience_years > 1 ? 'ans' : 'an'} d'expérience</span>
                      </div>
                    )}

                    {/* Bio */}
                    {walker.bio && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{walker.bio}</p>
                    )}

                    {/* Services badges */}
                    {walker.services && walker.services.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {walker.services.slice(0, 3).map((service: string, idx: number) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {getServiceLabel(service)}
                          </Badge>
                        ))}
                        {walker.services.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{walker.services.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-1">
                        <span className="text-2xl font-bold text-primary">{walker.hourly_rate || 15}€</span>
                        <span className="text-sm text-muted-foreground">/30min</span>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/walker/${walker.user_id}`);
                          }}
                        >
                          Voir profil
                        </Button>
                        <Button 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/book/${walker.user_id}`);
                          }}
                        >
                          Réserver
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default FindWalkers;