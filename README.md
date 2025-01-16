# Guess The Number

Guess The Number est une application mobile (React Native) dans laquelle le joueur doit trouver un nombre généré aléatoirement avant la fin d’un compteur de temps et en un nombre limité d’essais. L’application propose un clavier numérique personnalisé, où l’utilisateur peut saisir ses tentatives, effacer ses erreurs et valider son choix.

---

## Fonctionnalités Principales

### Clavier Numérique Intégré

- Disposé en **4 lignes × 3 colonnes**.
- Contient les chiffres **1–9**, **0**, un bouton **DEL** pour supprimer un chiffre et un bouton **GUESS** pour valider la tentative.

### Limite de Temps

- Un **compteur** décrémente toutes les secondes.
- Le joueur doit deviner le nombre avant que le temps n’atteigne zéro, sinon c’est un **Game Over**.

### Limite de Tentatives

- Le joueur dispose de **10 essais** maximum.
- Après 10 tentatives infructueuses, la partie est perdue.

### Écrans Différents Selon l’État du Jeu

- **Écran de Démarrage** : Permet de lancer une nouvelle partie.
- **Écran de Victoire** : S’affiche lorsque le joueur trouve le bon nombre.
- **Écran de Défaite** : S’affiche si le temps est écoulé ou si le joueur dépasse 10 tentatives.

---

## Structure Générale

- **`App.js`**  
  Composant principal gérant :

  - Le compteur de temps
  - Le nombre généré aléatoirement
  - Les états de jeu (gagné, perdu, démarré, etc.)

- **`Navbar.js`**, **`Counter.js`**, **`TryCounter.js`**  
  Composants séparés pour l’interface :

  - Barre de navigation
  - Affichage du temps restant
  - Affichage du nombre d’essais

- **`FlatList`**  
  Permet d’afficher un **clavier numérique** personnalisé (1–9, 0, DEL, GUESS).

---

## Comment Jouer ?

1. **Démarrer le Jeu**
   - Depuis l’écran d’accueil, cliquez sur **Commencer** pour lancer la partie.
2. **Saisir Votre Tentative**
   - Utilisez le clavier numérique intégré pour saisir un nombre entre **1** et **1000**.
   - Appuyez sur le bouton **GUESS** pour valider.
3. **Vérifier l’Indice**
   - L’application affiche _"C’est moins"_ si votre tentative est trop grande.
   - L’application affiche _"C’est plus"_ si elle est trop petite.
4. **Limiter Ses Tentatives**
   - Après **10** essais ratés ou si le temps arrive à zéro, la partie est perdue.
5. **Réessayer**
   - En cas de victoire ou de défaite, l’application propose de **rejouer** immédiatement.

---
