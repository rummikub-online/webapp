# Rummikub en TS

## Lancer le projet

1. Installer les dépendances

```bash
yarn
```

2. Lancer le serveur (Back+ Front + Storybook)

```bash
yarn dev
```

## Architecture

### Couches

On a noté 4 couches

- domain
- application
- presenter
- infrastructure

### Historique et explications

#### "Clean architecure"

Nous avons d'abord suivi une architecture séparant les couches

```diff
+ Fonctionnement simple
+ Couches bien séparées
- L'architecture ne laisse pas deviner le fonctionnement de l'application
- Besoin de naviguer dans tous les dossiers (domain, app, etc) pour ajouter une feature
```

Ensuite, nous avons opté pour une Architecture Hurlante laissant apparaître les modules (User, Card, CardSuite, etc), chaque module englobant les couches

```diff
+ Toujours des couches bien séparées
+ L'architecture laisse deviner le fonctionnement de l'application
+ Une feature peut se dev dans un seul module
- Le front n'est pas encapsulé, c'est lui qui encapsule "app"
- Une conception plus floue de ce qui est "front" et "back"
```

### Explications

- [**app/**](app)
  - **[module]/**
    > Ex : Une partie du logiciel : Player, Card, WebSockets
    - **application/**
      > Code qui permet de faire tourner une partie, on y gère le déroulement des tours etc tout en applicant les règles du jeu (d'où application).
      > Le code est ici en "Programmation Orienté Object"
      - **entities/**
        > Les entités qui existent dans le jeu : Joueur, Combinaison de Carte. Ces entités ont des comportements qui sont régis par les règles du jeu (dans /domain/)
      - **utils/**
        > Des fonctions globales et utilitaires. Elles ne doivent avoir aucun lien avec le jeu. Par exemple toShuffled() permet de mélanger un tableau.
    - **domain/**
      > Code relatif au règles Rummikub, c'est le centre/noyau de notre application.
      > De ce code dépend le reste (affichage, entrées, IAs, etc.), ce noyau ne dépend de rien d'autre.
      > Le code est ici écrit en "Programmation fonctionnelle" : tout est immuable, les fonctions sont pures et sans effet de bord.
      - **constants/**
        > Nombre de joueur max, cartes, etc. Pas de fonctions exportées.
      - **dtos/**
        > Les DataTransferObjects, ils décrivent le modèle le plus simplement
      - **gamerules/**
        > Fonctions qui régissent le jeu : est-ce qu'un joueur a gagné, est-ce que la suite est valide, etc.
      - **utils/**
        > Fonctions globales et utilitaires pour le jeu, ex : isJoker(card)
