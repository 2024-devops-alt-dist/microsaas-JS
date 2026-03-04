---
marp: true
theme: uncover
paginate: true
---

![bg right:45%](assets/cover.jpg)

# 🎁 Surprise & # 🗺️ OpenStinger

### Complémentarité technique et montée en compétences

**Juliette SUC**

Soutenance du Titre Professionnel CDA
Alternante chez CGI

---

# Sommaire

1. Mon alternance chez **CGI**
2. Le projet professionnel :
   **OpenStinger**
3. Analyse de couverture des compétences
4. Le projet de certification :
   **Surprise**
5. Plongée dans le Code et Sécurité 6. Tests, Veille et Bilan

---

# 1. L'Entreprise et le Service

---

## CGI ![bg right:40% 60%](assets/logo_cgi.svg)

- Leader mondial du conseil en TI.
- Mon équipe : **Stinger**.
- Client : **Secteur de l'Énergie**.

---

# 2. Projet OpenStinger

---

## Le Produit

Une plateforme SIG basée sur **Mapstore** (par Geosolutions).

Visualisation et gestion de données cartographiques complexes.

---

## Ma Mission

Développement d'**extensions sur-mesure** (widgets) pour répondre aux besoins spécifiques du client.

---

## Réalisation n°1 : Localisation **Sélection en cascade.**

Admin : création de requêtes via formulaire.
Utilisateur : menus déroulants liés (Région > Dép > Commune).

---

## Localisation : L'expérience utilisateur

À chaque sélection, l'application effectue un **zoom automatique** sur l'entité géographie concernée.

---

## Réalisation n°2 : Filtrage Complexe

Optimisation de la fonction `epic.js`.
Déclenchement sur mise à jour de filtres.

---

## Filtrage : Autocomplétion Génération dynamique de listes.

Tri alphabétique et **autocomplétion en temps réel**.

---

## Réalisation n°3 : Sélection

Sélection d'entités via des outils de dessin.
Gestion de **buffers** (zones tampons) autour des objets.

---

## Complexité technique : Redux

Gestion globale du **State**.
Évite le "prop drilling". Composants connectés pour une synchronisation parfaite.

---

## Complexité technique : RxJS

Gestion des flux asynchrones (**Epics**).
Séquençage des requêtes vers **GeoServer**. Réaction aux actions utilisateur sans blocage.

---

## Qualité logicielle

- Utilisation de **SonarQube** pour l'analyse statique du code. - Respect des normes internes **CGI**.
- Application rigoureuse des normes de développement du **Client**.

---

# 3. Transition : Auto-analyse

---

## Les compétences manquantes (1/2)

_Identifier les zones d'apprentissage_

- **BDD :** Schéma déjà existant et stable chez CGI.
- **Backend :** Utilisation de GeoServer (pas de logique métier serveur à développer).

---

## Les compétences manquantes (2/2)

_Identifier les zones d'apprentissage_

- **Sécurité :** Gérée en amont par des briques d'infrastructure dédiées.
- **Infrastructure :** Absence de conteneurisation Docker sur mon périmètre actuel.

---

## Objectif _Surprise_

Valider les compétences de **conception intégrale** : Base de données, API métier Node.js et conteneurisation Docker.

---

# 4. Le projet _Surprise_

---

## Genèse du projet

Difficulté d'organiser les cadeaux en famille. Besoin d'une solution **"anti-fuite"**.

---

## Expression des besoins

- Création d'événements.
- Listes collaboratives.
- **Secret absolu pour le bénéficiaire.**

---

## Les Personas ![bg left:30%](assets/personas.png)

- **Alice :** Organisatrice.
- **Bastien :** Cadeau commun.
- **Corentin :** Administrateur.
- **Danaé :** Bénéficiaire surprise.

---

## Environnement Technique

- **Front :** Next.js / Tailwind v4.
- **Back :** Node.js / Express / **Drizzle ORM**.
- **Infra :** Docker / PostgreSQL.

---

## Gestion de Projet

Méthodologie **Agile** (Sprints d'une semaine).
Outil : **GitHub Projects** (Kanban).

---

# 5. Conception et Code

---

## Conception : Schéma de BDD

_(Compétence non-couverte chez CGI)_
Modélisation du MCD/MLD.
Gestion des relations **Many-to-Many** (Users <> Events).

---

## Code : Drizzle ORM (Backend)

```typescript
// api/src/db/schema/gifts.ts // TODO : Insérer ton code gifts.ts
```

---

## Code : Logique Métier (Backend)

_(Compétence non-couverte chez CGI)_

```typescript
// api/src/services/giftService.ts // TODO: Insérer le code de la fonction de réservation (Service) // Ex: const reserveGift = async (giftId, userId) => { ... }
```

---

## Code : Contrôleur (API)

```typescript
// api/src/controllers/giftController.ts // TODO: Insérer le code du contrôleur qui intercepte la requête // et gère les erreurs HTTP (403, 200).
```

---

## Code : Interface Utilisateur (Frontend)

_Composant React 19 avec Tailwind v4_

```tsx
// client/src/features/event/EventCard.tsx // TODO: Insérer le code React de l'affichage d'un cadeau
```

---

# 6. Sécurité de l'application

---

## La Protection des Données

- Mots de passe hachés avant insertion en BDD.
- Aucun stockage de données sensibles en clair.
- Variables d'environnement (`.env`) exclues du versioning.

---

## Authentification Robuste - Utilisation de **JSON Web Tokens (JWT)**. - Signature sécurisée des tokens côté serveur. - Middleware de vérification sur chaque route privée.

---

## Sécurité Applicative : La règle du "Secret" C'est le défi métier principal de mon application.

---

## Filtrage au niveau de l'API L'API vérifie **systématiquement** l'identité du demandeur via son JWT.

---

## Confidentialité absolue Si l'utilisateur est le bénéficiaire du cadeau : **L'API supprime le statut de réservation avant de répondre.** Le frontend ne reçoit jamais l'information secrète.

---

## Sécurité des Interfaces - **XSS :** React échappe automatiquement le contenu texte. - **CORS :** L'API n'accepte que les requêtes de mon domaine Vercel.

---

# 7. Tests et Jeux d'essai

---

## Ma Stratégie de Test

- **Unitaires :** Logique métier isolée (Jest).
- **E2E :** Parcours utilisateurs complets (Playwright).

---

## Fonctionnalité testée

**La réservation d'un cadeau par un invité.**

---

## Jeu d'essai : Données en entrée

- **Cadeau ciblé :** `Livre de cuisine`
- **Statut initial :** `isOffered = false`
- **Acteur :** `Alice (Invitée, avec JWT valide)`

---

## Jeu d'essai : Résultat attendu

- Code de retour API : **200 OK**.
- Statut BDD mis à jour : `isOffered = true`.
- L'interface d'Alice affiche : "Cadeau Réservé".

---

## Jeu d'essai : Résultat obtenu

- Code API : **200 OK**.
- BDD : `true`.
- **Écart : Aucun.** ✅

---

## Test de Sécurité (Test négatif)

_Que se passe-t-il si le bénéficiaire essaie de réserver son propre cadeau ?_

---

## Analyse de l'écart

- **Attendu :** Erreur d'autorisation.
- **Obtenu :** Code HTTP 403 (Forbidden).
- **Analyse :** La faille logique est correctement bloquée par le backend.

---

# 8. Veille Sécurité

---

## Ma Méthodologie de Veille - Suivi de l'**OWASP Top 10**.

- Veille spécialisée sur **Node.js** et **React**.
- Audit automatique des dépendances (`npm audit`).

---

## Vulnérabilité n°1 : Injections SQL

---

## Le Risque La concaténation de chaînes de caractères pour interroger la base de données.

---

## La Solution Utilisation de **Drizzle ORM**. Il utilise par défaut des requêtes paramétrées (_Prepared Statements_). **Le risque est neutralisé par conception.**

---

## Vulnérabilité n°2 : Vol de Token (XSS)

---

## Le Risque Le stockage d'un token JWT dans le `localStorage` le rend vulnérable au vol via des scripts JS malveillants.

---

## La Solution Implémentation de **Cookies HttpOnly**. Le JavaScript côté client n'y a plus accès.

---

# 9. Bilan et Conclusion

---

## Difficultés rencontrées

- **Le Temps :** Réaliser le projet en 7 semaines.
- **L'Inconnu :** Apprentissage intensif de Node.js, Docker et Drizzle en autonomie.

---

## Ma montée en compétence

- Maîtrise d'une architecture **Fullstack moderne** de A à Z.
- Mise en place d'une véritable **chaîne CI/CD**.

---

## Évolutions possibles (1/2)

**La Cagnotte intégrée.** Intégration de l'API Stripe pour financer les cadeaux collaboratifs.

---

## Évolutions possibles (2/2)

**Progressive Web App (PWA).** Rendre l'application installable sur smartphone pour un accès facile en magasin.

---

## Synthèse Professionnelle

**OpenStinger :** Front-end complexe, outils de pointe.
**Surprise :** Maîtrise Fullstack, DevOps et conception de données. Le titre CDA valide cette double compétence.

---

## Perspectives

Signature prochaine de mon **CDI** au sein de l'équipe **Stinger (CGI)**. 🎉

---

# Merci de votre attention

---

![bg fit](assets/merci.jpg)
