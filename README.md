# Rummikub en TS

## Architecture

- [**src**](src) : Code source
  - [**domain**](src/domain)
    > Code relatif au règles Rummikub, c'est le centre de notre application. De ce code dépend le reste (affichage, entrées, IAs, etc.)
    - [**constants**](src/domain/constants)
      > Nombre de joueur max, cartes, etc. Pas de fonctions exportées.
    - [**entities**](src/domain/entities)
      > Les entités sont des interfaces, les fichiers peuvent contenir et exporter des fonctions utilitaires aux entités mais rien de plus.
    - [**gamerules**](src/domain/gamerules)
      > Fonctions qui régissent le jeu : est-ce qu'un joueur a gagné, est-ce que la suite est valide, etc.
    - [**utils**](src/domain/utils)
      > Des fonctions globales et utilitaires. Elles ne doivent avoir aucun lien avec les règles du jeu
