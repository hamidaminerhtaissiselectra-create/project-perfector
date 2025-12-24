import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, User, ArrowRight, Search, Clock } from 'lucide-react';
import { SEOHead } from "@/components/ui/seo-head";
import blogHero from "@/assets/pages/blog-hero.jpg";

const Blog = () => {
  const featuredArticle = {
    title: "Guide complet : Bien préparer son chien pour sa première promenade avec un professionnel",
    excerpt: "Découvrez toutes nos astuces et conseils pour que la première expérience de votre chien avec un promeneur professionnel soit une réussite totale. De la préparation à la communication avec le promeneur...",
    date: "28 Nov 2024",
    author: "Dr. Sophie Martin",
    category: "Guides",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=400&fit=crop"
  };

  const articles = [
    {
      title: "Comment choisir le bon promeneur pour votre chien",
      excerpt: "Découvrez nos conseils pour trouver le promeneur idéal qui correspondra parfaitement aux besoins de votre compagnon...",
      date: "25 Nov 2024",
      author: "Marie L.",
      category: "Conseils",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=250&fit=crop"
    },
    {
      title: "Les bienfaits des promenades quotidiennes",
      excerpt: "Pourquoi les promenades régulières sont essentielles pour la santé physique et mentale de votre chien...",
      date: "20 Nov 2024",
      author: "Thomas B.",
      category: "Santé",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=250&fit=crop"
    },
    {
      title: "Socialisation canine : les clés du succès",
      excerpt: "La socialisation est essentielle pour le développement de votre chien. Voici comment la réussir...",
      date: "15 Nov 2024",
      author: "Dr. Julie R.",
      category: "Éducation",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=400&h=250&fit=crop"
    },
    {
      title: "Les signaux d'alerte à surveiller chez votre chien",
      excerpt: "Apprenez à reconnaître les signes qui indiquent que votre chien pourrait avoir un problème de santé...",
      date: "10 Nov 2024",
      author: "Dr. Pierre M.",
      category: "Santé",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=250&fit=crop"
    },
    {
      title: "Activités ludiques pour chiens énergiques",
      excerpt: "Des idées d'activités stimulantes pour les chiens qui ont besoin de dépenser beaucoup d'énergie...",
      date: "5 Nov 2024",
      author: "Emma D.",
      category: "Activités",
      readTime: "4 min",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=250&fit=crop"
    },
    {
      title: "Nutrition canine : les bases à connaître",
      excerpt: "Tout ce que vous devez savoir sur l'alimentation de votre chien pour le garder en bonne santé...",
      date: "1 Nov 2024",
      author: "Dr. Marc V.",
      category: "Nutrition",
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&h=250&fit=crop"
    }
  ];

  const categories = ["Tous", "Conseils", "Santé", "Éducation", "Activités", "Nutrition", "Guides"];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Blog DogWalking | Conseils Chien, Santé Canine, Éducation et Bien-être"
        description="Découvrez nos articles d'experts sur la santé canine, l'éducation, la nutrition et le bien-être de votre chien. Astuces pratiques et conseils de professionnels."
        canonicalUrl="https://dogwalking.fr/blog"
      />
      <Header />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          {/* Header with image */}
          <div className="relative rounded-2xl overflow-hidden mb-12">
            <img 
              src={blogHero} 
              alt="Blog DogWalking - Conseils et articles sur les chiens" 
              className="w-full h-48 md:h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog DogWalking</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Conseils d'experts, astuces pratiques et actualités pour le bien-être de votre chien
              </p>
            </div>
          </div>

          {/* Search and filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher un article..." className="pl-10" />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button 
                  key={category}
                  variant={category === "Tous" ? "default" : "outline"}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Featured article */}
          <Card className="mb-12 overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="h-64 md:h-auto">
                <img 
                  src={featuredArticle.image} 
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <Badge className="w-fit mb-4">{featuredArticle.category}</Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 hover:text-primary transition-colors cursor-pointer">
                  {featuredArticle.title}
                </h2>
                <p className="text-muted-foreground mb-6">{featuredArticle.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {featuredArticle.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {featuredArticle.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {featuredArticle.readTime}
                  </span>
                </div>
                <Button className="w-fit">
                  Lire l'article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Articles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4">{article.category}</Badge>
                </div>
                <CardContent className="p-5">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load more */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Charger plus d'articles
            </Button>
          </div>

          {/* Newsletter */}
          <Card className="mt-16 bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Restez informé</h3>
              <p className="text-muted-foreground mb-6">
                Recevez nos meilleurs conseils et actualités directement dans votre boîte mail
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input placeholder="Votre email" type="email" className="flex-1" />
                <Button>S'abonner</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
