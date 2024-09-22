import { randomUUID } from "crypto";
import { DrawStack } from "./DrawStack";
import { Game, GameId, IGame } from "./Game";
import { IPlayer } from "./Player";

type GameList = Map<GameId, IGame>;

type GameManagerProps = {
  games?: Array<IGame>;
};

type GameAndPlayer = {
  game: IGame;
  player: IPlayer;
};

export interface IGameRepository {
  exists: (id: GameId) => boolean;
  findById: (id: GameId) => IGame;
  create: () => IGame;
  createWithPlayer: () => GameAndPlayer;
  join: (id: GameId) => GameAndPlayer;
  destroy: (id: GameId) => void;
}

export class GameRepository implements IGameRepository {
  private games: GameList;

  constructor(props?: GameManagerProps) {
    this.games = new Map(props?.games?.map((game) => [game.id, game]));
  }

  exists(id: string): boolean {
    return this.games.has(id);
  }

  findById(id: GameId): IGame {
    const game = this.games.get(id);

    if (!game) {
      throw new Error(`Game not found with id ${id}`);
    }

    return game;
  }

  create(): IGame {
    const fakeDrawStack = new DrawStack({});
    fakeDrawStack.shuffle = () => {};

    const game = new Game({
      id: randomUUID(),
      drawStack: fakeDrawStack,
    });

    this.games.set(game.id, game);

    return game;
  }

  createWithPlayer(): GameAndPlayer {
    const game = this.create();
    const player = game.addPlayer();

    return {
      game,
      player,
    };
  }

  join(id: GameId): GameAndPlayer {
    const game = this.findById(id);

    const player = game.addPlayer();

    return {
      game,
      player,
    };
  }

  destroy(id: GameId): void {
    const game = this.findById(id);

    this.games.delete(game.id);
  }
}
