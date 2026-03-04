---
marp: true
theme: uncover
paginate: true
---

<style scoped>
h1 {
  font-size: 1.4em; /* Modifie cette valeur pour changer la taille du titre principal */
  margin-bottom: 0.2em;
}
h3 {
  font-size: 0.9em; /* Modifie cette valeur pour le sous-titre */
  color: #4b5563;
  font-weight: normal;
}
</style>

![bg right:45%](assets/cover.jpg)

# 🎁 Surprise &

# 🗺️ OpenStinger

### Complémentarité technique et montée en compétences

<br>

**Juliette SUC**

<div style="font-size: 0.5em; line-height: 1.4; margin-top: 30px; color: #6b7280;">
  <i>Soutenance du Titre Professionnel CDA</i><br>
  <i>Alternante chez CGI</i>
</div>

---

# Sommaire

1. Mon alternance chez **CGI**
2. Le projet professionnel : **OpenStinger**
3. Analyse de couverture des compétences
4. Le projet de certification : **Surprise**
5. Plongée dans le Code et Sécurité
6. Tests, Veille et Bilan

---

# 1. L'Entreprise et le Service

---

## CGI

![bg right:40% 60%](assets/logo_cgi.svg)

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

## Réalisation n°1 : Localisation

**Sélection en cascade.**
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

## Filtrage : Autocomplétion

Génération dynamique de listes.
Tri alphabétique et **autocomplétion en temps réel**.

---

## Réalisation n°3 : Sélection

Sélection d'entités via des outils de dessin.
Gestion de **buffers** (zones tampons) autour des objets.

---

## Complexité technique : Redux

Gestion globale du **State**.
Évite le "prop drilling".
Composants connectés pour une synchronisation parfaite.

---

## Complexité technique : RxJS

Gestion des flux asynchrones (**Epics**).
Séquençage des requêtes vers **GeoServer**.
Réaction aux actions utilisateur sans blocage.

---

## Qualité logicielle

- Utilisation de **SonarQube** pour l'analyse statique du code.
- Respect des normes internes **CGI**.
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

Valider les compétences de **conception intégrale** :
Base de données, API métier Node.js et conteneurisation Docker.

---

# 4. Le projet _Surprise_

---

## Genèse du projet

Difficulté d'organiser les cadeaux en famille.
Besoin d'une solution **"anti-fuite"**.

---

## Expression des besoins

- Création d'événements.
- Listes collaboratives.
- **Secret absolu pour le bénéficiaire.**

---

## Les Personas

![bg left:30%](assets/personas.png)

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
// api/src/db/schema/gifts.ts
// TODO : Insérer ton code gifts.ts
```
