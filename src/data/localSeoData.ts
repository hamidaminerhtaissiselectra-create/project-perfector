// Données SEO locales pour toutes les zones géographiques

export interface LocalZone {
  id: string;
  name: string;
  slug: string;
  type: 'city' | 'arrondissement' | 'quartier';
  parent?: string;
  priority: 1 | 2 | 3 | 4;
  image: string;
  altText: string;
  description: string;
  population?: string;
  highlights: string[];
}

export interface LocalService {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
}

export const services: LocalService[] = [
  {
    id: 'promenade',
    name: 'Promenade de chien',
    slug: 'promenade-chien',
    shortDescription: 'Promenades quotidiennes adaptées aux besoins de votre chien'
  },
  {
    id: 'garde',
    name: 'Garde de chien',
    slug: 'garde-chien',
    shortDescription: 'Garde à domicile ou chez le pet-sitter de confiance'
  },
  {
    id: 'visite',
    name: 'Visite à domicile',
    slug: 'visite-domicile',
    shortDescription: 'Visites régulières pour nourrir et câliner votre compagnon'
  },
  {
    id: 'veterinaire',
    name: 'Accompagnement vétérinaire',
    slug: 'accompagnement-veterinaire',
    shortDescription: 'Transport et accompagnement chez le vétérinaire'
  }
];

export const zones: LocalZone[] = [
  // PRIORITÉ 1 : Paris + 94
  {
    id: 'paris',
    name: 'Paris',
    slug: 'paris',
    type: 'city',
    priority: 1,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
    altText: 'Promeneur de chien professionnel à Paris devant la Tour Eiffel',
    description: 'Service de promenade et garde de chien dans tout Paris',
    population: '2,1 millions',
  highlights: ['Bois de Boulogne', 'Bois de Vincennes', 'Jardins du Luxembourg']
  },
  {
    id: 'paris-1',
    name: 'Paris 1er',
    slug: 'paris-1er',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    image: 'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&h=300&fit=crop',
    altText: 'Dog walker professionnel dans le 1er arrondissement de Paris près du Louvre',
    description: 'Promeneurs de chien disponibles dans le 1er arrondissement',
    highlights: ['Jardin des Tuileries', 'Palais Royal', 'Les Halles']
  },
  {
    id: 'paris-2',
    name: 'Paris 2ème',
    slug: 'paris-2eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
    altText: 'Promenade de chien dans le 2ème arrondissement de Paris Grands Boulevards',
    description: 'Services de promenade canine dans le 2ème arrondissement',
    highlights: ['Passage des Panoramas', 'Rue Montorgueil', 'Square Louvois']
  },
  {
    id: 'paris-3',
    name: 'Paris 3ème',
    slug: 'paris-3eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop',
    altText: 'Pet sitter dans le 3ème arrondissement de Paris Haut Marais',
    description: 'Dog walkers de confiance dans le Haut Marais',
    highlights: ['Square du Temple', 'Musée Picasso', 'Archives Nationales']
  },
  {
    id: 'paris-4',
    name: 'Paris 4ème',
    slug: 'paris-4eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop',
    altText: 'Promeneur de chien dans le Marais Paris 4ème',
    description: 'Promeneurs disponibles dans le 4ème arrondissement et le Marais',
    highlights: ['Place des Vosges', 'Île Saint-Louis', 'Hôtel de Ville']
  },
  {
    id: 'paris-5',
    name: 'Paris 5ème',
    slug: 'paris-5eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
    altText: 'Dog walker Quartier Latin Paris 5ème arrondissement',
    description: 'Services canins dans le Quartier Latin',
    highlights: ['Jardin des Plantes', 'Jardin du Luxembourg', 'Panthéon']
  },
  {
    id: 'paris-6',
    name: 'Paris 6ème',
    slug: 'paris-6eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    image: 'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Saint-Germain-des-Prés Paris 6ème',
    description: 'Promeneurs de chien à Saint-Germain-des-Prés',
    highlights: ['Jardin du Luxembourg', 'Saint-Germain-des-Prés', 'Odéon']
  },
  {
    id: 'paris-7',
    name: 'Paris 7ème',
    slug: 'paris-7eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
    altText: 'Pet sitter Tour Eiffel Paris 7ème arrondissement',
    description: 'Services de garde et promenade près de la Tour Eiffel',
    highlights: ['Champ de Mars', 'Esplanade des Invalides', 'Musée Rodin']
  },
  {
    id: 'paris-8',
    name: 'Paris 8ème',
    slug: 'paris-8eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=400&h=300&fit=crop',
    altText: 'Promeneur de chien Champs-Élysées Paris 8ème',
    description: 'Dog walkers premium sur les Champs-Élysées',
    highlights: ['Parc Monceau', 'Champs-Élysées', 'Grand Palais']
  },
  {
    id: 'paris-9',
    name: 'Paris 9ème',
    slug: 'paris-9eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    image: 'https://images.unsplash.com/photo-1508050919630-b135583b29ab?w=400&h=300&fit=crop',
    altText: 'Garde de chien Opéra Paris 9ème arrondissement',
    description: 'Promeneurs disponibles près de l\'Opéra',
    highlights: ['Square Montholon', 'Opéra Garnier', 'Grands Magasins']
  },
  {
    id: 'paris-10',
    name: 'Paris 10ème',
    slug: 'paris-10eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
    altText: 'Dog walker Canal Saint-Martin Paris 10ème',
    description: 'Services canins le long du Canal Saint-Martin',
    highlights: ['Canal Saint-Martin', 'Square Villemin', 'Gare du Nord']
  },
  {
    id: 'paris-11',
    name: 'Paris 11ème',
    slug: 'paris-11eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop',
    altText: 'Promenade de chien Bastille Paris 11ème',
    description: 'Promeneurs de chien disponibles à Bastille et Oberkampf',
    highlights: ['Square Maurice Gardette', 'Place de la République', 'Rue Oberkampf']
  },
  {
    id: 'paris-12',
    name: 'Paris 12ème',
    slug: 'paris-12eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Pet sitter Bois de Vincennes Paris 12ème',
    description: 'Promeneurs près du Bois de Vincennes',
    highlights: ['Bois de Vincennes', 'Promenade Plantée', 'Bercy Village']
  },
  {
    id: 'paris-13',
    name: 'Paris 13ème',
    slug: 'paris-13eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
    altText: 'Promeneur de chien Butte aux Cailles Paris 13ème',
    description: 'Services de promenade à la Butte aux Cailles',
    highlights: ['Parc de Choisy', 'Butte aux Cailles', 'Bibliothèque François Mitterrand']
  },
  {
    id: 'paris-14',
    name: 'Paris 14ème',
    slug: 'paris-14eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    image: 'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&h=300&fit=crop',
    altText: 'Dog walker Montparnasse Paris 14ème',
    description: 'Promeneurs disponibles à Montparnasse et Alésia',
    highlights: ['Parc Montsouris', 'Cité Universitaire', 'Rue Daguerre']
  },
  {
    id: 'paris-15',
    name: 'Paris 15ème',
    slug: 'paris-15eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=400&h=300&fit=crop',
    altText: 'Garde de chien Paris 15ème arrondissement Convention',
    description: 'Le plus grand arrondissement de Paris pour vos chiens',
    highlights: ['Parc Georges Brassens', 'Parc André Citroën', 'Beaugrenelle']
  },
  {
    id: 'paris-16',
    name: 'Paris 16ème',
    slug: 'paris-16eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=400&h=300&fit=crop',
    altText: 'Promenade de chien au Bois de Boulogne Paris 16ème',
    description: 'Services canins premium dans le 16ème arrondissement',
    highlights: ['Bois de Boulogne', 'Jardins du Trocadéro', 'Auteuil']
  },
  {
    id: 'paris-17',
    name: 'Paris 17ème',
    slug: 'paris-17eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    image: 'https://images.unsplash.com/photo-1508050919630-b135583b29ab?w=400&h=300&fit=crop',
    altText: 'Pet sitter dans le 17ème arrondissement de Paris Batignolles',
    description: 'Dog sitters de confiance dans les Batignolles',
    highlights: ['Parc Martin Luther King', 'Square des Batignolles', 'Parc Monceau']
  },
  {
    id: 'paris-18',
    name: 'Paris 18ème',
    slug: 'paris-18eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    image: 'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&h=300&fit=crop',
    altText: 'Promeneur de chien Montmartre Paris 18ème',
    description: 'Promeneurs sur la butte Montmartre',
    highlights: ['Square Louise Michel', 'Jardins du Sacré-Cœur', 'Square Léon']
  },
  {
    id: 'paris-19',
    name: 'Paris 19ème',
    slug: 'paris-19eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Dog walker Parc des Buttes-Chaumont Paris 19ème',
    description: 'Services canins aux Buttes-Chaumont',
    highlights: ['Parc des Buttes-Chaumont', 'Parc de la Villette', 'Canal de l\'Ourcq']
  },
  {
    id: 'paris-20',
    name: 'Paris 20ème',
    slug: 'paris-20eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
    altText: 'Promenade de chien Belleville Ménilmontant Paris 20ème',
    description: 'Promeneurs à Belleville et Ménilmontant',
    highlights: ['Parc de Belleville', 'Père Lachaise', 'Rue de Ménilmontant']
  },
  // Villes du 94
  {
    id: 'vincennes',
    name: 'Vincennes',
    slug: 'vincennes-94',
    type: 'city',
    priority: 1,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien dans le Bois de Vincennes 94',
    description: 'Services de promenade près du Bois de Vincennes',
    population: '49 000',
    highlights: ['Bois de Vincennes', 'Parc Floral', 'Lac Daumesnil']
  },
  {
    id: 'saint-mande',
    name: 'Saint-Mandé',
    slug: 'saint-mande-94',
    type: 'city',
    priority: 1,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
    altText: 'Dog walker à Saint-Mandé près du Bois de Vincennes',
    description: 'Promeneurs disponibles à Saint-Mandé et environs',
    population: '22 000',
    highlights: ['Proximité Bois de Vincennes', 'Parc de la Légion d\'Honneur']
  },
  {
    id: 'charenton',
    name: 'Charenton-le-Pont',
    slug: 'charenton-le-pont-94',
    type: 'city',
    priority: 1,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Service de garde de chien à Charenton-le-Pont Val-de-Marne',
    description: 'Garde et promenade de chien à Charenton',
    population: '31 000',
    highlights: ['Bords de Marne', 'Île de Bercy']
  },
  {
    id: 'nogent',
    name: 'Nogent-sur-Marne',
    slug: 'nogent-sur-marne-94',
    type: 'city',
    priority: 1,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promeneur de chien à Nogent-sur-Marne bords de Marne',
    description: 'Services canins à Nogent-sur-Marne',
    population: '33 000',
    highlights: ['Bords de Marne', 'Parc de Nogent', 'Bois de Vincennes']
  },
  {
    id: 'fontenay',
    name: 'Fontenay-sous-Bois',
    slug: 'fontenay-sous-bois-94',
    type: 'city',
    priority: 1,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Pet sitter Fontenay-sous-Bois Val-de-Marne',
    description: 'Promeneurs de chien à Fontenay-sous-Bois',
    population: '53 000',
    highlights: ['Bois de Vincennes', 'Parc de l\'Hôtel de Ville']
  },
  {
    id: 'maisons-alfort',
    name: 'Maisons-Alfort',
    slug: 'maisons-alfort-94',
    type: 'city',
    priority: 1,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
    altText: 'Garde de chien à Maisons-Alfort école vétérinaire',
    description: 'Services canins à Maisons-Alfort',
    population: '56 000',
    highlights: ['Bords de Marne', 'École Vétérinaire', 'Île de Charentonneau']
  },
  {
    id: 'creteil',
    name: 'Créteil',
    slug: 'creteil-94',
    type: 'city',
    priority: 1,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promeneur de chien à Créteil préfecture du Val-de-Marne',
    description: 'Dog walkers disponibles à Créteil',
    population: '92 000',
    highlights: ['Lac de Créteil', 'Île de loisirs', 'Parc Dupeyroux']
  },

  // PRIORITÉ 2 : Grandes villes françaises
  {
    id: 'lyon',
    name: 'Lyon',
    slug: 'lyon',
    type: 'city',
    priority: 2,
    image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Lyon Parc de la Tête d\'Or',
    description: 'Promeneurs et gardiens de chien dans la métropole lyonnaise',
    population: '522 000',
    highlights: ['Parc de la Tête d\'Or', 'Vieux Lyon', 'Presqu\'île']
  },
  {
    id: 'marseille',
    name: 'Marseille',
    slug: 'marseille',
    type: 'city',
    priority: 2,
    image: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=400&h=300&fit=crop',
    altText: 'Dog sitter à Marseille près du Vieux Port',
    description: 'Services de garde et promenade de chien à Marseille',
    population: '870 000',
    highlights: ['Parc Borély', 'Calanques', 'Plages du Prado']
  },
  {
    id: 'bordeaux',
    name: 'Bordeaux',
    slug: 'bordeaux',
    type: 'city',
    priority: 2,
    image: 'https://images.unsplash.com/photo-1565791380713-1756b9a05343?w=400&h=300&fit=crop',
    altText: 'Promeneur de chien professionnel à Bordeaux',
    description: 'Pet sitters et dog walkers à Bordeaux et alentours',
    population: '260 000',
    highlights: ['Jardin Public', 'Parc Bordelais', 'Quais de Garonne']
  },
  {
    id: 'toulouse',
    name: 'Toulouse',
    slug: 'toulouse',
    type: 'city',
    priority: 2,
    image: 'https://images.unsplash.com/photo-1575986767340-5d17ae767ab0?w=400&h=300&fit=crop',
    altText: 'Garde de chien à Toulouse ville rose',
    description: 'Services canins dans la ville rose',
    population: '493 000',
    highlights: ['Prairie des Filtres', 'Jardin des Plantes', 'Canal du Midi']
  },
  {
    id: 'nantes',
    name: 'Nantes',
    slug: 'nantes',
    type: 'city',
    priority: 2,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop',
    altText: 'Dog walker à Nantes île de Nantes',
    description: 'Promeneurs de chien disponibles à Nantes',
    population: '320 000',
    highlights: ['Jardin des Plantes', 'Île de Nantes', 'Erdre']
  },
  {
    id: 'nice',
    name: 'Nice',
    slug: 'nice',
    type: 'city',
    priority: 2,
    image: 'https://images.unsplash.com/photo-1491166617655-0723a0999cfc?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Nice Promenade des Anglais',
    description: 'Services de promenade sur la Côte d\'Azur',
    population: '342 000',
    highlights: ['Promenade des Anglais', 'Colline du Château', 'Parc Phoenix']
  },
  {
    id: 'lille',
    name: 'Lille',
    slug: 'lille',
    type: 'city',
    priority: 2,
    image: 'https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?w=400&h=300&fit=crop',
    altText: 'Pet sitter professionnel à Lille métropole',
    description: 'Garde et promenade de chien dans la métropole lilloise',
    population: '236 000',
    highlights: ['Citadelle de Lille', 'Parc de la Citadelle', 'Vieux Lille']
  },
  {
    id: 'strasbourg',
    name: 'Strasbourg',
    slug: 'strasbourg',
    type: 'city',
    priority: 2,
    image: 'https://images.unsplash.com/photo-1608029437238-69c8a4dd9c1b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Strasbourg Petite France',
    description: 'Promeneurs canins à Strasbourg et environs',
    population: '287 000',
    highlights: ['Parc de l\'Orangerie', 'Petite France', 'Forêt de la Robertsau']
  },

  // PRIORITÉ 3 : Quartiers clés
  {
    id: 'marais',
    name: 'Le Marais',
    slug: 'le-marais-paris',
    type: 'quartier',
    parent: 'paris',
    priority: 3,
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop',
    altText: 'Promenade de chien dans le quartier du Marais Paris',
    description: 'Dog walkers disponibles dans le Marais',
    highlights: ['Place des Vosges', 'Rue des Francs-Bourgeois']
  },
  {
    id: 'montmartre',
    name: 'Montmartre',
    slug: 'montmartre-paris',
    type: 'quartier',
    parent: 'paris',
    priority: 3,
    image: 'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&h=300&fit=crop',
    altText: 'Pet sitter à Montmartre près du Sacré-Coeur',
    description: 'Services canins sur la butte Montmartre',
    highlights: ['Square Louise Michel', 'Vignes de Montmartre']
  },
  {
    id: 'belleville',
    name: 'Belleville',
    slug: 'belleville-paris',
    type: 'quartier',
    parent: 'paris',
    priority: 3,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
    altText: 'Dog walker à Belleville Paris 20ème',
    description: 'Promeneurs de chien à Belleville et Ménilmontant',
    highlights: ['Parc de Belleville', 'Rue de Belleville']
  },

  // PRIORITÉ 4 : Zones secondaires
  {
    id: 'rennes',
    name: 'Rennes',
    slug: 'rennes',
    type: 'city',
    priority: 4,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    altText: 'Garde de chien à Rennes Bretagne',
    description: 'Services de garde et promenade à Rennes',
    population: '222 000',
    highlights: ['Parc du Thabor', 'Vilaine']
  },
  {
    id: 'montpellier',
    name: 'Montpellier',
    slug: 'montpellier',
    type: 'city',
    priority: 4,
    image: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=400&h=300&fit=crop',
    altText: 'Promeneur de chien à Montpellier Hérault',
    description: 'Dog sitters disponibles à Montpellier',
    population: '295 000',
    highlights: ['Esplanade Charles de Gaulle', 'Parc Montcalm']
  },
  {
    id: 'grenoble',
    name: 'Grenoble',
    slug: 'grenoble',
    type: 'city',
    priority: 4,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Grenoble Alpes',
    description: 'Services canins au pied des Alpes',
    population: '160 000',
    highlights: ['Parc Paul Mistral', 'Bastille', 'Berges de l\'Isère']
  }
];

// Générer les FAQs locales pour chaque zone
export function generateLocalFAQ(zone: LocalZone, service: LocalService): { question: string; answer: string }[] {
  return [
    {
      question: `Quel est le tarif d'une ${service.name.toLowerCase()} à ${zone.name} ?`,
      answer: `Nos tarifs pour la ${service.name.toLowerCase()} à ${zone.name} commencent à partir de 15€. Le prix exact dépend de la durée, du nombre de chiens et des besoins spécifiques. Demandez un devis gratuit !`
    },
    {
      question: `Comment trouver un promeneur de chien de confiance à ${zone.name} ?`,
      answer: `Tous nos promeneurs à ${zone.name} sont vérifiés (casier judiciaire, pièce d'identité, assurance). Consultez leurs avis clients et réservez en toute sécurité avec notre système de paiement sécurisé.`
    },
    {
      question: `Quels sont les meilleurs endroits pour promener son chien à ${zone.name} ?`,
      answer: `À ${zone.name}, les meilleurs spots pour promener votre chien sont : ${zone.highlights.join(', ')}. Nos promeneurs connaissent parfaitement ces lieux.`
    },
    {
      question: `Proposez-vous des promenades de groupe à ${zone.name} ?`,
      answer: `Oui, nous proposons des promenades individuelles et en petit groupe (max 3 chiens) à ${zone.name}. Les promenades en groupe sont plus économiques tout en restant sécurisées.`
    },
    {
      question: `Comment fonctionne la réservation à ${zone.name} ?`,
      answer: `Réservez en 3 clics : choisissez votre promeneur à ${zone.name}, sélectionnez la date et l'heure, puis payez en ligne. Recevez des photos pendant la promenade et un compte-rendu à la fin !`
    }
  ];
}

// Générer le contenu SEO pour une page locale
export function generateLocalContent(zone: LocalZone, service: LocalService): string {
  const cityName = zone.parent ? `${zone.name} (${zones.find(z => z.id === zone.parent)?.name})` : zone.name;
  
  return `
Vous recherchez un service de ${service.name.toLowerCase()} à ${cityName} ? DogWalking Connect vous met en relation avec des promeneurs et gardiens de chien vérifiés et passionnés dans votre quartier.

## Pourquoi choisir DogWalking Connect à ${zone.name} ?

### Des professionnels de confiance près de chez vous

Tous nos dog walkers à ${zone.name} passent par un processus de vérification rigoureux :
- **Vérification d'identité** complète
- **Casier judiciaire** vierge exigé
- **Assurance responsabilité civile** professionnelle
- **Entretien** avec notre équipe

### Les meilleurs spots de ${zone.name} pour votre chien

Nos promeneurs connaissent parfaitement ${zone.name} et ses environs. Ils emmèneront votre compagnon dans les plus beaux endroits : ${zone.highlights.join(', ')}.

${zone.population ? `Avec ${zone.population} habitants, ${zone.name} compte de nombreux propriétaires de chiens qui nous font confiance au quotidien.` : ''}

## Comment ça marche ?

1. **Trouvez** un promeneur disponible à ${zone.name}
2. **Réservez** en ligne en quelques clics
3. **Suivez** la promenade en temps réel avec photos
4. **Payez** en toute sécurité (paiement libéré après validation)

## Nos services à ${zone.name}

- Promenade quotidienne (30min à 2h)
- Garde à domicile
- Visite à domicile
- Hébergement jour/nuit
- Accompagnement vétérinaire

Réservez dès maintenant votre ${service.name.toLowerCase()} à ${zone.name} et offrez à votre chien l'attention qu'il mérite !
  `.trim();
}

// Générer le JSON-LD LocalBusiness
export function generateLocalBusinessSchema(zone: LocalZone) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `DogWalking Connect ${zone.name}`,
    "description": zone.description,
    "image": zone.image,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": zone.name,
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates"
    },
    "url": `https://dogwalking-connect.fr/${zone.slug}`,
    "telephone": "+33 1 XX XX XX XX",
    "priceRange": "€€",
    "openingHours": "Mo-Su 07:00-21:00",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    },
    "areaServed": {
      "@type": "City",
      "name": zone.name
    },
    "serviceType": ["Dog Walking", "Pet Sitting", "Dog Boarding"]
  };
}
