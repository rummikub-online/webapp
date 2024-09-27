# Rummikub en TS

## Architecture

Nous avons d'abord suivi une architecture séparant le domain, l'application et le presenter (front web)

Ensuite, nous avons opté pour une architecture par Domain (User, Card, CardSuite, etc), englobant le domain (constants, dtos) et l'application

- [**src/**](packages)
  - [**front/**](packages/front)
    > L'interface du jeu
  - [**application/**](packages/application)
    > Code qui permet de faire tourner une partie, on y gère le déroulement des tours etc tout en applicant les règles du jeu.
    > Le code est ici en "Programmation Orienté Object"
    - [**entities/**](packages/application/entities)
      > Les entités qui existent dans le jeu : Joueur, Combinaison de Carte. Ces entités ont des comportements qui sont régis par les règles du jeu (dans /domain/)
    - [**utils/**](packages/application/utils)
      > Des fonctions globales et utilitaires. Elles ne doivent avoir aucun lien avec le jeu. Par exemple toShuffled() permet de mélanger un tableau.
  - [**domain/**](packages/domain)
    > Code relatif au règles Rummikub, c'est le centre/noyau de notre application.
    > De ce code dépend le reste (affichage, entrées, IAs, etc.), ce noyau ne dépend de rien d'autre.
    > Le code est ici écrit en "Programmation fonctionnelle" : tout est immuable, les fonctions sont pures et sans effet de bord.
    - [**constants/**](packages/domain/constants)
      > Nombre de joueur max, cartes, etc. Pas de fonctions exportées.
    - [**dtos/**](packages/domain/dots)
      > Les DataTransferObjects, ce sont les types des entités manipulées.
    - [**gamerules/**](packages/domain/gamerules)
      > Fonctions qui régissent le jeu : est-ce qu'un joueur a gagné, est-ce que la suite est valide, etc.
    - [**utils/**](packages/domain/utils)
      > Fonctions globales et utilitaires pour le jeu, ex : isJoker(card)
