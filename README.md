# 🐕 DogWalking - Plateforme de Promenade de Chiens

[![Lovable](https://img.shields.io/badge/Built%20with-Lovable-ff69b4)](https://lovable.dev)
[![React](https://img.shields.io/badge/React-18.3-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Backend-Supabase-green)](https://supabase.com)

**La plateforme #1 en France pour la promenade de chiens sécurisée.**

Trouvez des promeneurs vérifiés près de chez vous avec paiement escrow sécurisé et preuves photo/vidéo obligatoires à chaque mission.

---

## 🎯 Objectif du Projet

DogWalking est une marketplace à double parcours utilisateur :

1. **Propriétaires de chiens** (clients) - Réservent des services pour leurs animaux
2. **Promeneurs / Dog walkers** (prestataires) - Proposent leurs services professionnels

---

## 🚀 Fonctionnalités Principales

### Pour les Propriétaires
- ✅ Recherche de promeneurs vérifiés par zone
- ✅ 7 types de services (promenade, garde, visite, etc.)
- ✅ Réservation en ligne avec paiement escrow sécurisé
- ✅ Preuves photo/vidéo obligatoires à chaque mission
- ✅ Chat temps réel avec les promeneurs
- ✅ Système d'avis et notes certifiés
- ✅ Gestion multi-chiens

### Pour les Promeneurs
- ✅ Inscription avec vérification complète (CNI, casier, assurance)
- ✅ Tableau de bord avec statistiques et revenus
- ✅ Gestion des disponibilités et zones d'intervention
- ✅ Système de badges et certifications
- ✅ Paiement sécurisé (87% du tarif, commission 13%)

### Sécurité & Confiance
- ✅ Vérification CNI obligatoire
- ✅ Attestation casier judiciaire vérifiée
- ✅ Assurance RC obligatoire (jusqu'à 2M€)
- ✅ Paiement escrow (bloqué 24-48h)
- ✅ Preuves photo/vidéo obligatoires
- ✅ Médiation en cas de litige

---

## 📁 Structure du Projet

```
src/
├── assets/           # Images et ressources statiques
├── components/
│   └── ui/           # Composants UI réutilisables (Shadcn/ui)
│       ├── hero-section.tsx
│       ├── services-section.tsx
│       ├── how-it-works-section.tsx
│       ├── local-presence-section.tsx
│       ├── testimonials-section.tsx
│       └── ...
├── data/
│   └── localSeoData.ts  # Données SEO local (zones, villes)
├── hooks/            # Hooks React personnalisés
├── integrations/
│   └── supabase/     # Client et types Supabase
├── lib/              # Utilitaires
└── pages/            # Pages de l'application
    ├── Index.tsx           # Page d'accueil
    ├── Dashboard.tsx       # Dashboard propriétaire
    ├── WalkerDashboard.tsx # Dashboard promeneur
    ├── FindWalkers.tsx     # Recherche de promeneurs
    ├── WalkerProfile.tsx   # Profil promeneur détaillé
    ├── Messages.tsx        # Chat temps réel
    ├── Tarifs.tsx          # Page tarifs
    ├── Securite.tsx        # Page sécurité
    └── ...
```

---

## 🛠️ Stack Technique

| Technologie | Usage |
|-------------|-------|
| **React 18** | Framework frontend |
| **TypeScript** | Typage statique |
| **Vite** | Build tool |
| **Tailwind CSS** | Styling |
| **Shadcn/ui** | Composants UI |
| **Framer Motion** | Animations |
| **Supabase** | Backend (Auth, DB, Storage, Realtime) |
| **React Router** | Routing |
| **React Query** | Data fetching |

---

## 🗄️ Base de Données Supabase

### Tables Principales

| Table | Description |
|-------|-------------|
| `profiles` | Profils utilisateurs (propriétaires/promeneurs) |
| `walker_profiles` | Profils détaillés des promeneurs |
| `dogs` | Chiens des propriétaires |
| `bookings` | Réservations de services |
| `reviews` | Avis et notes |
| `messages` | Messages du chat |
| `notifications` | Notifications utilisateurs |
| `favorites` | Promeneurs favoris |
| `walker_badges` | Badges et certifications |
| `walker_documents` | Documents de vérification |
| `walker_earnings` | Revenus des promeneurs |
| `referrals` | Programme de parrainage |

### Buckets Storage

| Bucket | Usage | Public |
|--------|-------|--------|
| `avatars` | Photos de profil | ✅ Oui |
| `dog-photos` | Photos des chiens | ✅ Oui |
| `walker-documents` | Documents vérification | ❌ Non |
| `walk-proofs` | Preuves photo/vidéo missions | ❌ Non |

---

## 💰 Modèle Économique

### Tarifs Minimum par Service

| Service | Prix minimum |
|---------|--------------|
| Promenade | 8€ |
| Visite à domicile | 8€ |
| Hébergement nuit | 10€ |
| Garderie jour | 10€ |
| Garde à domicile | 12€ |
| Visite sanitaire | 16€ |
| Accompagnement vétérinaire | 13€ |

### Commission
- **DogWalking** : 13% (assurance + support inclus)
- **Promeneur** : 87% du tarif
- **Abonnement PRO** (optionnel) : 6-12€/mois

---

## 📍 SEO Local - Stratégie

### Règles Appliquées
- ✅ Pas de pages par ville (évite le contenu dupliqué)
- ✅ Section "Près de chez vous" avec zones couvertes
- ✅ Mentions locales naturelles dans les pages
- ✅ +200 zones référencées dans `localSeoData.ts`

### Volume Cible (Google 2026)
- Pages services : 1 200 - 1 600 mots
- Pages promeneurs : 800 - 1 200 mots
- FAQ par page : 5-8 questions (80-120 mots/réponse)

---

## 🔒 Sécurité

### Vérification des Promeneurs
1. CNI obligatoire (vérification manuelle)
2. Attestation casier judiciaire OU extrait
3. Preuve d'assurance RC (habitation ou pro)
4. Photo de profil réelle
5. Validation manuelle sous 48h

### Protection des Paiements
- Paiement escrow (bloqué jusqu'à validation)
- Preuves obligatoires pour déblocage
- Remboursement si prestation non effectuée
- Médiation disponible

---

## 🚀 Déploiement

### Prérequis
- Node.js 18+
- Compte Supabase
- (Optionnel) Compte Stripe pour les paiements

### Installation

```bash
# Cloner le projet
git clone <repo-url>

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

### Variables d'Environnement

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 📋 Roadmap

### ✅ Fait
- [x] Structure pages et routing
- [x] Design system (tokens HSL, animations)
- [x] Authentification Supabase
- [x] Dashboard propriétaire/promeneur
- [x] Chat temps réel
- [x] Page profil promeneur détaillée
- [x] SEO local (zones sans pages dédiées)
- [x] Animations parallaxe

### 🔄 En cours
- [ ] Enrichir contenu SEO (1200+ mots/service)
- [ ] FAQ dépliables par page
- [ ] Intégration Stripe (paiement escrow)
- [ ] Emails transactionnels

### 📋 À faire
- [ ] Sitemap XML dynamique
- [ ] Google Search Console
- [ ] App mobile (PWA)
- [ ] Notifications push

---

## 📄 Licence

MIT License - Voir [LICENSE](LICENSE)

---

## 🤝 Contribution

Ce projet est développé avec [Lovable](https://lovable.dev).

Pour contribuer :
1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

---

**🐕 DogWalking - La confiance pour votre chien, la tranquillité pour vous.**
