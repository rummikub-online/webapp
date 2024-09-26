import { DrawStack } from "@/app/DrawStack/entities/DrawStack";
import { type GameId, type IGame, Game } from "@/app/Game/entities/Game";
import type { IPlayer } from "@/app/Player/entities/Player";
import { v4 as uuidv4 } from "uuid";

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
  create: (id?: GameId) => IGame;
  findOrCreate: (id: GameId) => IGame;
  createWithPlayer: (id?: GameId) => GameAndPlayer;
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

  create(id?: GameId): IGame {
    const fakeDrawStack = new DrawStack({});
    fakeDrawStack.shuffle = () => {};

    const game = new Game({
      id: id ?? uuidv4(),
      drawStack: fakeDrawStack,
    });

    this.games.set(game.id, game);

    return game;
  }

  findOrCreate(id: GameId): IGame {
    return this.exists(id) ? this.findById(id) : this.create(id);
  }

  createWithPlayer(id?: GameId): GameAndPlayer {
    const game = this.create(id);
    const player = game.addPlayer();

    return {
      game,
      player,
    };
  }

  join(id: GameId): GameAndPlayer {
    const game = this.findOrCreate(id);

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
