import {
  DrawStack,
  UnshuffledDrawStack,
} from "@/app/DrawStack/application/DrawStack";
import {
  type GameId,
  type GameProps,
  type IGame,
  Game,
} from "@/app/Game/application/Game";
import type { IGameRepository } from "@/app/Game/application/GameRepository/IGameRepository";
import { randomInt } from "crypto";
import { v4 as uuidv4 } from "uuid";

type GameList = Map<GameId, IGame>;

type GameRepositoryProps = {
  games?: Array<IGame>;
};

export class InMemoryGameRepository implements IGameRepository {
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

  create(props?: GameProps): IGame {
    const game = new Game({
      id: uuidv4(),
      drawStack:
        props?.id === "test" ? new UnshuffledDrawStack() : new DrawStack(),
      ...props,
    });

    this.games.set(game.id, game);

    return game;
  }

  findOrCreate(id: GameId): IGame {
    return this.exists(id) ? this.findById(id) : this.create({ id });
  }

  destroy(id: GameId): void {
    const game = this.findById(id);

    this.games.delete(game.id);
  }

  freeGameId(): GameId {
    // Easy way, but inefficient
    // It's enough for the moment (because we have approximately none players)

    const randomGameId = () => randomInt(0, 999).toString().padStart(3, "0");

    let gameId: GameId;
    do {
      gameId = randomGameId();
    } while (this.games.has(gameId));

    return gameId;
  }
}
