import {
  DrawStack,
  UnshuffledDrawStack,
} from "@/app/DrawStack/application/DrawStack";
import { type GameId, type IGame, Game } from "@/app/Game/application/Game";
import { randomBytes } from "crypto";
import { v4 as uuidv4 } from "uuid";

type GameList = Map<GameId, IGame>;

type GameRepositoryProps = {
  games?: Array<IGame>;
};

export interface IGameRepository {
  exists: (id: GameId) => boolean;
  findById: (id: GameId) => IGame;
  create: (id?: GameId) => IGame;
  findOrCreate: (id: GameId) => IGame;
  destroy: (id: GameId) => void;
  freeGameId: () => GameId;
}

export class GameRepository implements IGameRepository {
  private games: GameList;

  constructor(props?: GameRepositoryProps) {
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
    const game = new Game({
      id: id ?? uuidv4(),
      drawStack: id === "test" ? new UnshuffledDrawStack() : new DrawStack(),
    });

    this.games.set(game.id, game);

    return game;
  }

  findOrCreate(id: GameId): IGame {
    return this.exists(id) ? this.findById(id) : this.create(id);
  }

  destroy(id: GameId): void {
    const game = this.findById(id);

    this.games.delete(game.id);
  }

  freeGameId(): GameId {
    // Easy way, but inefficient
    // It's enough for the moment (because we have approximately none players)

    const RANDOM_GAME_ID_LENGTH = 4;
    const randomGameId = () =>
      randomBytes(RANDOM_GAME_ID_LENGTH / 2).toString("hex");

    let gameId: GameId;
    do {
      gameId = randomGameId();
    } while (this.games.has(gameId));

    return gameId;
  }
}
