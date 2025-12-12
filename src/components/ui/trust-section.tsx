import { Users, Star, MapPin, Heart, Shield, Camera } from "lucide-react";

export const TrustSection = () => {
  const stats = [
    { icon: Users, value: "10,000+", label: "Propriétaires satisfaits", color: "text-primary" },
    { icon: Heart, value: "5,000+", label: "Promeneurs vérifiés", color: "text-destructive" },
    { icon: Star, value: "4.9/5", label: "Note moyenne", color: "text-yellow-500" },
    { icon: MapPin, value: "50+", label: "Villes en France", color: "text-accent" },
    { icon: Shield, value: "100%", label: "Missions assurées", color: "text-primary" },
    { icon: Camera, value: "25,000+", label: "Preuves envoyées", color: "text-sage" }
  ];

  return (
    <section className="py-12 md:py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-3">
            La confiance en chiffres
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Ils nous font confiance</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Rejoignez la communauté DogWalking et offrez le meilleur à votre compagnon
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-card rounded-xl p-4 md:p-5 text-center shadow-soft border border-border"
            >
              <stat.icon className={`h-6 w-6 ${stat.color} mx-auto mb-2`} />
              <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};