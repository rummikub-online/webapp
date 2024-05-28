import { randomUUID } from "crypto";
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

export class GameRepository {
  private games: GameList;

  constructor(props?: GameManagerProps) {
    this.games = new Map(props?.games?.map((game) => [game.id, game]));
  }

  create(): GameAndPlayer {
    const game = new Game({
      id: randomUUID(),
    });

    const player = game.addPlayer();

    this.games.set(game.id, game);

    return {
      game,
      player,
    };
  }

  findById(id: GameId): IGame {
    const game = this.games.get(id);

    if (!game) {
      throw new Error(`Game not found with id ${id}`);
    }

    return game;
  }

  join(id: GameId): any {
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
