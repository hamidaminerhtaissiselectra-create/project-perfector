import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, User, ArrowRight, Search, Clock, BookOpen, Rss } from 'lucide-react';
import { SEOHead } from "@/components/ui/seo-head";

const Blog = () => {
  const featuredArticle = {
    title: "Guide complet : Bien préparer son chien pour sa première promenade avec un professionnel",
    excerpt: "Découvrez toutes nos astuces et conseils pour que la première expérience de votre chien avec un promeneur professionnel soit une réussite totale. De la préparation émotionnelle à la communication avec le promeneur, nous couvrons tous les aspects essentiels pour une transition en douceur.",
    date: "28 Nov 2024",
    author: "Dr. Sophie Martin",
    category: "Guides",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=400&fit=crop"
  };

  const articles = [
    {
      title: "Comment choisir le bon promeneur pour votre chien",
      excerpt: "Découvrez nos conseils pour trouver le promeneur idéal qui correspondra parfaitement aux besoins spécifiques de votre compagnon à quatre pattes...",
      date: "25 Nov 2024",
      author: "Marie L.",
      category: "Conseils",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=250&fit=crop"
    },
    {
      title: "Les bienfaits des promenades quotidiennes pour votre chien",
      excerpt: "Pourquoi les promenades régulières sont essentielles pour la santé physique et mentale de votre chien. Découvrez les bénéfices prouvés scientifiquement...",
      date: "20 Nov 2024",
      author: "Thomas B.",
      category: "Santé",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=250&fit=crop"
    },
    {
      title: "Socialisation canine : les clés du succès pour un chien équilibré",
      excerpt: "La socialisation est essentielle pour le développement comportemental de votre chien. Voici comment la réussir à tout âge...",
      date: "15 Nov 2024",
      author: "Dr. Julie R.",
      category: "Éducation",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=400&h=250&fit=crop"
    },
    {
      title: "Les signaux d'alerte à surveiller chez votre chien pendant les promenades",
      excerpt: "Apprenez à reconnaître les signes qui indiquent que votre chien pourrait avoir un problème de santé ou de comportement...",
      date: "10 Nov 2024",
      author: "Dr. Pierre M.",
      category: "Santé",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=250&fit=crop"
    },
    {
      title: "Activités ludiques pour chiens énergiques : idées et conseils",
      excerpt: "Des idées d'activités stimulantes pour les chiens qui ont besoin de dépenser beaucoup d'énergie pendant leurs promenades...",
      date: "5 Nov 2024",
      author: "Emma D.",
      category: "Activités",
      readTime: "4 min",
      image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=250&fit=crop"
    },
    {
      title: "Nutrition canine : les bases à connaître pour un chien en bonne santé",
      excerpt: "Tout ce que vous devez savoir sur l'alimentation de votre chien pour le garder en bonne santé et plein d'énergie...",
      date: "1 Nov 2024",
      author: "Dr. Marc V.",
      category: "Nutrition",
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&h=250&fit=crop"
    }
  ];

  const categories = ["Tous", "Conseils", "Santé", "Éducation", "Activités", "Nutrition", "Guides"];

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog DogWalking - Conseils et actualités canines",
    "description": "Conseils d'experts, astuces pratiques et actualités pour le bien-être de votre chien",
    "url": "https://dogwalking.fr/blog",
    "publisher": {
      "@type": "Organization",
      "name": "DogWalking",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dogwalking.fr/logo.png"
      }
    },
    "blogPost": [
      {
        "@type": "BlogPosting",
        "headline": featuredArticle.title,
        "description": featuredArticle.excerpt,
        "author": {
          "@type": "Person",
          "name": featuredArticle.author
        },
        "datePublished": "2024-11-28",
        "image": featuredArticle.image
      },
      ...articles.map(article => ({
        "@type": "BlogPosting",
        "headline": article.title,
        "description": article.excerpt,
        "author": {
          "@type": "Person",
          "name": article.author
        },
        "image": article.image
      }))
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Blog DogWalking | Conseils et Actualités pour Chiens et Propriétaires"
        description="Découvrez nos articles d'experts sur la promenade, la santé, l'éducation et le bien-être canin. Conseils pratiques pour propriétaires et professionnels du dog walking."
        keywords="blog chien, conseils promenade chien, santé canine, éducation chien, bien-être animal, dog walking conseils"
        canonicalUrl="https://dogwalking.fr/blog"
        structuredData={blogJsonLd}
      />
      <Header />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          {/* Header avec intro SEO */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm font-medium">Blog & Actualités</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog DogWalking</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Conseils d'experts vétérinaires et comportementalistes, astuces pratiques de nos promeneurs professionnels, 
              et actualités du monde canin pour le bien-être de votre compagnon à quatre pattes.
            </p>
          </div>

          {/* Intro contenu SEO */}
          <div className="prose prose-lg max-w-none mb-12 text-muted-foreground">
            <p>
              Bienvenue sur le blog DogWalking, votre ressource complète pour tout ce qui concerne la vie avec votre chien. 
              Notre équipe de rédacteurs comprend des vétérinaires diplômés, des comportementalistes canins certifiés, 
              et des promeneurs professionnels expérimentés qui partagent leurs connaissances pour vous aider à offrir 
              la meilleure qualité de vie à votre compagnon.
            </p>
            <p>
              Que vous soyez un nouveau propriétaire cherchant des conseils de base, ou un maître expérimenté 
              souhaitant approfondir vos connaissances, vous trouverez ici des articles détaillés sur la santé canine, 
              l'éducation positive, la nutrition adaptée, et bien sûr, l'art de la promenade parfaite.
            </p>
          </div>

          {/* Search and filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Rechercher un article sur la santé, l'éducation, la nutrition..." 
                className="pl-10" 
                aria-label="Rechercher un article"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button 
                  key={category}
                  variant={category === "Tous" ? "default" : "outline"}
                  size="sm"
                  aria-label={`Filtrer par catégorie ${category}`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Featured article */}
          <article className="mb-12">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="grid md:grid-cols-2">
                <div className="h-64 md:h-auto relative">
                  <img 
                    src={featuredArticle.image} 
                    alt="Chien heureux lors de sa première promenade avec un promeneur professionnel"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-primary-foreground">À la une</Badge>
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <Badge variant="outline" className="w-fit mb-4">{featuredArticle.category}</Badge>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 hover:text-primary transition-colors cursor-pointer">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{featuredArticle.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <time dateTime="2024-11-28">{featuredArticle.date}</time>
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {featuredArticle.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {featuredArticle.readTime} de lecture
                    </span>
                  </div>
                  <Button className="w-fit group">
                    Lire l'article complet
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>
          </article>

          {/* Section thématique */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Nos derniers articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <article key={index}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={`Illustration article ${article.title}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <Badge className="absolute top-4 left-4">{article.category}</Badge>
                    </div>
                    <CardContent className="p-5 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <time>{article.date}</time>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {article.readTime}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </article>
              ))}
            </div>
          </section>

          {/* Load more */}
          <div className="text-center mb-16">
            <Button variant="outline" size="lg">
              Charger plus d'articles
            </Button>
          </div>

          {/* Section informative SEO */}
          <section className="mb-16 p-8 rounded-2xl bg-muted/30 border">
            <h2 className="text-2xl font-bold mb-6">Pourquoi lire notre blog ?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-bold mb-2">Expertise vérifiée</h3>
                <p className="text-muted-foreground text-sm">
                  Nos articles sont rédigés et relus par des professionnels du monde canin : 
                  vétérinaires, comportementalistes certifiés, et éducateurs canins diplômés.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Conseils pratiques</h3>
                <p className="text-muted-foreground text-sm">
                  Pas de théorie abstraite : chaque article contient des conseils concrets 
                  que vous pouvez appliquer immédiatement avec votre chien.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Actualités du secteur</h3>
                <p className="text-muted-foreground text-sm">
                  Restez informé des dernières découvertes en santé canine, des nouvelles 
                  réglementations, et des tendances du bien-être animal.
                </p>
              </div>
            </div>
          </section>

          {/* Newsletter */}
          <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Rss className="h-5 w-5 text-primary" />
                    <h3 className="text-2xl font-bold">Restez informé</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Recevez nos meilleurs conseils et actualités canines directement dans votre boîte mail. 
                    Un email par semaine, sans spam, désabonnement en un clic.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <Input 
                    placeholder="Votre adresse email" 
                    type="email" 
                    className="flex-1 md:w-64"
                    aria-label="Adresse email pour newsletter"
                  />
                  <Button>S'abonner gratuitement</Button>
                </div>
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
