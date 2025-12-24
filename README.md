# 🐕 DogWalking - Plateforme de Promenade de Chiens

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Connected-green.svg)](https://supabase.com/)

## 📋 Description

DogWalking est une plateforme de mise en relation entre propriétaires de chiens et promeneurs professionnels vérifiés en France. Le site propose un système de paiement sécurisé (escrow), une vérification complète des promeneurs, et une assurance jusqu'à 2M€.

## 🚀 Fonctionnalités

### Pour les propriétaires
- ✅ Recherche de promeneurs par localisation
- ✅ Réservation en ligne sécurisée
- ✅ Messagerie temps réel
- ✅ Gestion des chiens et réservations
- ✅ Système de parrainage

### Pour les promeneurs
- ✅ Inscription et vérification
- ✅ Dashboard de gestion des missions
- ✅ Suivi des revenus
- ✅ Profil public personnalisable

### Sécurité
- ✅ Vérification CNI + casier judiciaire
- ✅ Paiement escrow sécurisé
- ✅ Preuves photo/vidéo obligatoires
- ✅ Assurance RC 2M€

## 🛠️ Stack Technique

| Technologie | Usage |
|-------------|-------|
| React 18 | Framework frontend |
| TypeScript | Typage statique |
| Vite | Build tool |
| Tailwind CSS | Styling |
| Shadcn/ui | Composants UI |
| Framer Motion | Animations |
| Supabase | Backend (Auth, DB, Storage) |
| React Router | Navigation |
| React Query | Data fetching |

## 📦 Installation

```bash
# Cloner le repository
git clone https://github.com/votre-username/dogwalking.git

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build production
npm run build
```

## 🔧 Configuration

### Variables d'environnement

Créer un fichier `.env` à la racine :

```env
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_PUBLISHABLE_KEY=votre_clé_publique
```

### Supabase

Le projet est connecté à Supabase pour :
- **Auth** : Authentification email
- **Database** : PostgreSQL avec RLS
- **Storage** : Photos chiens, avatars, documents

## 📁 Structure du Projet

```
src/
├── assets/           # Images et assets statiques
│   ├── pages/        # Images des pages principales
│   ├── services/     # Images des services
│   └── homepage/     # Images de la homepage
├── components/       # Composants React
│   ├── ui/           # Composants UI (Shadcn)
│   └── seo/          # Composants SEO
├── pages/            # Pages de l'application
│   └── services/     # Pages services piliers
├── hooks/            # Hooks personnalisés
├── integrations/     # Intégrations (Supabase)
├── data/             # Données statiques
└── lib/              # Utilitaires
```

## 🌐 Routes Principales

| Route | Description |
|-------|-------------|
| `/` | Page d'accueil |
| `/tarifs` | Tarifs et services |
| `/securite` | Sécurité et garanties |
| `/blog` | Articles et conseils |
| `/walkers` | Recherche promeneurs |
| `/services/promenade` | Service promenade |
| `/services/garde` | Service garde |
| `/services/visite` | Service visite |
| `/dashboard` | Espace propriétaire |
| `/walker-dashboard` | Espace promeneur |

## 🔒 Sécurité

- Row Level Security (RLS) sur toutes les tables
- Authentification Supabase
- Tokens HSL pour le design system
- Validation TypeScript stricte

## 📈 SEO

- Meta tags dynamiques (SEOHead)
- Schema.org JSON-LD (FAQ, Service, LocalBusiness)
- Sitemap XML automatique
- Images optimisées avec alt descriptifs
- Contenu 1300-1600 mots sur pages piliers

## 🎨 Design System

Le projet utilise des tokens CSS HSL définis dans `index.css` :
- Couleurs primaires et secondaires
- Typographie cohérente
- Animations Framer Motion
- Mode sombre supporté
- Responsive mobile-first

## 📄 Licence

MIT License - Voir [LICENSE](LICENSE) pour plus de détails.

---

*Développé avec ❤️ pour les amoureux des chiens*
