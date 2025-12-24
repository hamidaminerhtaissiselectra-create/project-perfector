# 📋 CAHIER DES CHARGES COMPLET - DOGWALKING

## 📌 Informations Générales

| Élément | Valeur |
|---------|--------|
| **Nom du projet** | DogWalking |
| **Type** | Plateforme de mise en relation |
| **Cibles** | Propriétaires de chiens + Promeneurs professionnels |
| **Stack technique** | React 18 + TypeScript + Vite + Tailwind CSS + Supabase |
| **Date mise à jour** | 24 Décembre 2024 |
| **Progression** | ~95% |

---

## 🎯 OBJECTIFS DU SITE

### Double parcours utilisateur
1. **Propriétaires de chiens** → Trouver et réserver un promeneur de confiance
2. **Promeneurs professionnels** → S'inscrire, être vérifié, recevoir des missions

### Propositions de valeur
- Promeneurs vérifiés (CNI, casier, assurance)
- Paiement sécurisé par escrow
- Assurance jusqu'à 2M€
- Suivi en temps réel
- Messagerie intégrée

---

## ✅ FONCTIONNALITÉS RÉALISÉES

### 🏠 Pages Publiques (100%)

| Page | Route | SEO | FAQ | Mots | Images |
|------|-------|-----|-----|------|--------|
| Accueil | `/` | ✅ SEOHead + Schema LocalBusiness | ✅ 5 questions | ~2500 | ✅ Hero + sections |
| Tarifs | `/tarifs` | ✅ SEOHead + Schema | ✅ 6 questions | ~1600 | ✅ Hero unique |
| Sécurité | `/securite` | ✅ SEOHead + Schema | ✅ 6 questions | ~1800 | ✅ Hero unique |
| Blog | `/blog` | ✅ SEOHead + Schema Blog | - | ~1200 | ✅ Hero + articles |
| Qui sommes-nous | `/qui-sommes-nous` | ✅ SEOHead | ✅ 5 questions | ~900 | ✅ Hero équipe |
| Près de chez vous | `/proche-de-vous` | ✅ SEOHead | - | ~1000 | ✅ Carte France |
| Devenir Promeneur | `/devenir-promeneur` | ✅ SEOHead | ✅ 7 questions | ~1100 | ✅ Hero unique |
| Trouver Promeneurs | `/walkers` | ✅ SEOHead | - | ~400 | ✅ Hero recherche |
| Profil Promeneur | `/walker/:id` | ✅ SEOHead dynamique | - | Dynamique | ✅ Avatar |
| CGU | `/cgu` | ⚪ | - | - | - |
| Confidentialité | `/confidentialite` | ⚪ | - | - | - |
| Mentions Légales | `/mentions-legales` | ⚪ | - | - | - |
| Zones | `/zones` | ⚪ | - | - | - |
| Authentification | `/auth` | ⚪ | - | - | - |

### 🐕 Pages Services Piliers SEO (100%)

| Page | Route | Mots | FAQ | Images |
|------|-------|------|-----|--------|
| Service Promenade | `/services/promenade` | ~1500 | ✅ 6 questions | ✅ 4 uniques |
| Service Garde | `/services/garde` | ~1500 | ✅ 6 questions | ✅ 4 uniques |
| Service Visite | `/services/visite` | ~1500 | ✅ 6 questions | ✅ 4 uniques |

### 👤 Espace Propriétaire (100%)

| Fonctionnalité | Route | SEO | Status |
|---------------|-------|-----|--------|
| Dashboard | `/dashboard` | ✅ SEOHead | ✅ Complet |
| Mon Profil | `/profile` | ✅ SEOHead | ✅ Complet |
| Mes Réservations | `/bookings` | ✅ SEOHead | ✅ Complet |
| Messages | `/messages` | ✅ SEOHead | ✅ Temps réel Supabase |
| Ajouter un chien | `/dogs/add` | ⚪ | ✅ Complet |
| Réserver | `/book/:walkerId` | ⚪ | ✅ Complet |
| Parrainage | `/referral` | ⚪ | ✅ Complet |

### 🚶 Espace Promeneur (100%)

| Fonctionnalité | Route | Status |
|---------------|-------|--------|
| Dashboard Promeneur | `/walker-dashboard` | ✅ Complet |
| Mes Revenus | `/walker-earnings` | ✅ Complet |
| Profil Public | `/walker/:id` | ✅ Complet + SEO dynamique |

### 🔐 Authentification (100%)

| Fonctionnalité | Status |
|---------------|--------|
| Inscription email | ✅ |
| Connexion email | ✅ |
| Récupération mot de passe | ✅ |
| Protection routes | ✅ |
| Gestion sessions | ✅ |

### 💾 Base de données Supabase (100%)

| Table | RLS | Description |
|-------|-----|-------------|
| `profiles` | ✅ | Profils utilisateurs |
| `dogs` | ✅ | Chiens enregistrés |
| `walker_profiles` | ✅ | Profils promeneurs |
| `walker_documents` | ✅ | Documents vérification |
| `walker_badges` | ✅ | Badges et distinctions |
| `walker_earnings` | ✅ | Revenus promeneurs |
| `bookings` | ✅ | Réservations |
| `messages` | ✅ | Messages temps réel |
| `notifications` | ✅ | Notifications |
| `reviews` | ✅ | Avis et notes |
| `favorites` | ✅ | Promeneurs favoris |
| `referrals` | ✅ | Parrainages |
| `user_roles` | ✅ | Rôles (admin, user) |

### 📦 Storage Supabase (100%)

| Bucket | Public | Description |
|--------|--------|-------------|
| `dog-photos` | ✅ Oui | Photos des chiens |
| `avatars` | ✅ Oui | Photos de profil |
| `walker-documents` | ❌ Non | Documents confidentiels |
| `walk-proofs` | ❌ Non | Preuves de promenade |

### 🎨 Design System (100%)

| Élément | Status | Détails |
|---------|--------|---------|
| Tokens HSL | ✅ | Variables CSS sémantiques |
| Composants Shadcn | ✅ | Personnalisés |
| Animations Framer Motion | ✅ | Parallaxe, fade, stagger |
| Mode sombre | ✅ | Support complet |
| Responsive | ✅ | Mobile-first |
| Accessibilité | ✅ | ARIA, focus visible |
| Bulle flottante contact | ✅ | Composant réutilisable |

### 🔍 SEO Technique (100%)

| Élément | Status |
|---------|--------|
| Sitemap XML | ✅ `/sitemap.xml` |
| Robots.txt | ✅ Optimisé |
| Meta titles uniques | ✅ Toutes pages |
| Meta descriptions | ✅ Toutes pages |
| Open Graph | ✅ Via SEOHead |
| Twitter Cards | ✅ Via SEOHead |
| Schema.org JSON-LD | ✅ LocalBusiness, Blog, FAQ, Service |
| Canonical URLs | ✅ Toutes pages |
| Alt images | ✅ Descriptifs |

### 🖼️ Images (100%)

| Catégorie | Fichiers | Localisation |
|-----------|----------|--------------|
| Pages principales | 8 images | `src/assets/pages/` |
| Homepage | 5 images | `src/assets/homepage/` |
| Services | 28 images | `src/assets/services/` |
| Testimonials | 2 images | `src/assets/testimonials/` |
| Trust | 2 images | `src/assets/trust/` |
| Hero principal | 1 image | `src/assets/hero-dog-walking.jpg` |

---

## 🟠 À FAIRE - PRIORITÉ HAUTE

### 💳 Intégration Stripe (Paiement Escrow)

| Tâche | Priorité | Complexité |
|-------|----------|------------|
| Activer intégration Stripe | 🔴 Haute | Faible |
| Créer edge function `create-checkout` | 🔴 Haute | Moyenne |
| Créer edge function `stripe-webhook` | 🔴 Haute | Moyenne |
| Système escrow 24-48h | 🔴 Haute | Haute |
| Libération paiement sur preuve | 🔴 Haute | Haute |
| Dashboard revenus promeneur | ✅ Fait | - |

**Flux paiement attendu :**
```
1. Client réserve → Paiement Stripe → Argent bloqué (escrow)
2. Promeneur effectue prestation → Envoie preuve photo/vidéo
3. Délai 24-48h → Argent libéré au promeneur (moins 13% commission)
4. Si pas de preuve → Remboursement automatique client
```

### 📧 Emails Transactionnels

| Email | Déclencheur | Priorité |
|-------|-------------|----------|
| Confirmation inscription | Création compte | 🔴 Haute |
| Nouvelle réservation | Booking créé | 🔴 Haute |
| Rappel promenade J-1 | Cron 24h avant | 🟠 Moyenne |
| Preuve envoyée | Preuve uploadée | 🟠 Moyenne |
| Paiement reçu | Escrow libéré | 🔴 Haute |
| Nouveau message | Message reçu | 🟠 Moyenne |

**Configuration requise :** SMTP (Resend, SendGrid, ou Mailgun)

---

## 🟡 À FAIRE - PRIORITÉ MOYENNE

### 📊 Fonctionnalités Additionnelles

| Fonctionnalité | Status | Notes |
|---------------|--------|-------|
| Upload documents promeneur | ⚪ | Storage Supabase |
| Validation admin documents | ⚪ | Dashboard admin |
| Notifications push | ⚪ | Web Push API |
| Suivi GPS temps réel | ⚪ | Geolocation API |
| Export factures PDF | ⚪ | jsPDF ou serveur |
| Système de parrainage complet | ⚪ | Codes + rewards |

### 🔒 Sécurité Avancée

| Élément | Status |
|---------|--------|
| Rate limiting API | ⚪ |
| Validation côté serveur | ⚪ |
| Audit logs | ⚪ |
| 2FA | ⚪ |

---

## 📁 STRUCTURE DES FICHIERS

```
src/
├── assets/
│   ├── pages/                    # ✅ Images pages principales (8)
│   ├── homepage/                 # ✅ Images homepage (5)
│   ├── services/                 # ✅ Images services (28)
│   ├── testimonials/             # ✅ Images témoignages (2)
│   ├── trust/                    # ✅ Images confiance (2)
│   ├── hero-dog-walking.jpg      # ✅ Hero principal
│   ├── local-services.jpg
│   ├── service-garde.jpg
│   ├── service-promenade.jpg
│   └── service-visite.jpg
├── components/
│   ├── seo/
│   │   └── SEOHead.tsx           # ✅ Composant SEO principal
│   └── ui/
│       ├── header.tsx
│       ├── footer.tsx            # ✅ Footer 5 colonnes
│       ├── hero-section.tsx
│       ├── services-section.tsx
│       ├── features-section.tsx
│       ├── testimonials-section.tsx
│       ├── local-presence-section.tsx
│       ├── how-it-works-section.tsx
│       ├── trust-section.tsx
│       ├── dogwalking-protect.tsx
│       ├── user-types-section.tsx
│       ├── home-intro-section.tsx    # ✅ SEO accueil
│       ├── home-faq-section.tsx      # ✅ FAQ accueil
│       ├── floating-contact.tsx      # ✅ Bulle contact
│       ├── seo-head.tsx              # ✅ Composant SEO
│       ├── seo-faq.tsx               # ✅ Composant FAQ
│       ├── animated-section.tsx
│       └── [shadcn components]
├── pages/
│   ├── Index.tsx                 # ✅ SEO complet + FAQ
│   ├── Tarifs.tsx                # ✅ SEO + FAQ + image
│   ├── Securite.tsx              # ✅ SEO + FAQ + image
│   ├── Blog.tsx                  # ✅ SEO + image
│   ├── QuiSommesNous.tsx         # ✅ SEO + FAQ + image
│   ├── ProcheDeVous.tsx          # ✅ SEO + image
│   ├── WalkerRegister.tsx        # ✅ SEO + FAQ
│   ├── FindWalkers.tsx           # ✅ SEO
│   ├── WalkerProfile.tsx         # ✅ SEO dynamique
│   ├── Dashboard.tsx             # ✅ SEO
│   ├── Profile.tsx               # ✅ SEO
│   ├── MyBookings.tsx            # ✅ SEO
│   ├── Messages.tsx              # ✅ SEO
│   ├── WalkerDashboard.tsx
│   ├── WalkerEarnings.tsx
│   ├── services/
│   │   ├── ServicePromenade.tsx  # ✅ 1500 mots + FAQ + images
│   │   ├── ServiceGarde.tsx      # ✅ 1500 mots + FAQ + images
│   │   └── ServiceVisite.tsx     # ✅ 1500 mots + FAQ + images
│   ├── Auth.tsx
│   ├── AddDog.tsx
│   ├── BookWalk.tsx
│   ├── BookingDetails.tsx
│   ├── Referral.tsx
│   ├── CGU.tsx
│   ├── Confidentialite.tsx
│   ├── MentionsLegales.tsx
│   ├── AllZones.tsx
│   ├── LocalZone.tsx
│   └── NotFound.tsx
├── hooks/
│   ├── use-toast.ts
│   ├── use-mobile.tsx
│   ├── useParallax.tsx
│   └── useScrollToTop.tsx
├── integrations/
│   └── supabase/
│       ├── client.ts
│       └── types.ts              # Auto-généré
├── data/
│   ├── localSeoData.ts
│   └── servicesData.ts
├── lib/
│   └── utils.ts
├── index.css                     # ✅ Design tokens HSL
├── App.tsx                       # ✅ Toutes routes configurées
└── main.tsx

public/
├── sitemap.xml                   # ✅ Sitemap SEO
├── robots.txt                    # ✅ Robots optimisé
├── favicon.ico
└── placeholder.svg

supabase/
├── config.toml
├── functions/
│   └── geolocation/
│       └── index.ts
└── migrations/                   # Auto-géré
```

---

## 🔧 CONFIGURATION REQUISE

### Secrets configurés (Supabase)

| Secret | Usage | Status |
|--------|-------|--------|
| `SUPABASE_URL` | Connexion DB | ✅ Configuré |
| `SUPABASE_ANON_KEY` | Connexion DB | ✅ Configuré |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin | ✅ Configuré |
| `SUPABASE_DB_URL` | DB directe | ✅ Configuré |
| `STRIPE_SECRET_KEY` | Paiements | ⚪ À ajouter |
| `STRIPE_WEBHOOK_SECRET` | Webhooks | ⚪ À ajouter |
| `RESEND_API_KEY` | Emails | ⚪ À ajouter |

### Variables d'environnement

```env
VITE_SUPABASE_URL=https://aqitjhaotpautjywoeys.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📈 MÉTRIQUES SEO ATTEINTES

| Métrique | Cible | Status |
|----------|-------|--------|
| Pages avec meta unique | 100% | ✅ 100% |
| Pages avec H1 unique | 100% | ✅ 100% |
| Images avec alt | 100% | ✅ 100% |
| Sitemap à jour | Oui | ✅ |
| Schema.org | Pages clés | ✅ FAQ + Service |
| Core Web Vitals | Vert | 🟡 À vérifier |
| Mobile-friendly | Oui | ✅ |
| Contenu piliers SEO | 1300-1600 mots | ✅ |
| FAQ Schema.org | Pages services | ✅ |
| Images uniques par page | 100% | ✅ |

---

## 📅 PROCHAINES ÉTAPES RECOMMANDÉES

### Sprint 1 (Priorité immédiate)
1. ✅ ~~SEO toutes pages~~
2. ✅ ~~Sitemap XML~~
3. ✅ ~~Pages services piliers~~
4. ✅ ~~FAQ sur toutes pages clés~~
5. ✅ ~~Images uniques~~
6. 🔴 Activer Stripe
7. 🔴 Créer edge functions paiement
8. 🔴 Configurer emails transactionnels

### Sprint 2 (Après Sprint 1)
1. Upload et validation documents promeneurs
2. Système de preuves photos/vidéos
3. Notifications push
4. Tests E2E

### Sprint 3 (Optimisation)
1. Analytics et tracking
2. A/B testing
3. Performance optimization
4. Suivi GPS temps réel

---

## 📝 NOTES IMPORTANTES

### Règles SEO appliquées
- ✅ Aucune duplication d'images entre pages
- ✅ Parcours propriétaire et promeneur distincts
- ✅ Pas de pages locales par ville (stratégie zone)
- ✅ FAQ avec Schema.org sur pages services
- ✅ Contenu 1300-1600 mots sur pages piliers
- ✅ Images uniques générées pour chaque page
- ✅ Page "Près de chez vous" pour SEO régional

### Standards de code
- TypeScript strict
- Composants fonctionnels React
- Hooks personnalisés réutilisables
- Design tokens CSS HSL (pas de couleurs hardcodées)
- Imports absolus via `@/`

---

*Document généré le 24 Décembre 2024*
*Dernière mise à jour : Session courante*
