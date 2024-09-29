import type { GameId, IGame } from "@/app/Game/application/Game";
import type { IGameRepository } from "@/app/Game/application/GameRepository";
import type { IPlayer } from "@/app/Player/application/Player";

export type UserConnection = {
  gameId: GameId;
  username: string;
};

export type GameAndPlayer = {
  game: IGame;
  player: IPlayer;
};

type GameManagerProps = {
  gameRepository: IGameRepository;
};

export interface IGameManager {
  isConnected(connection: UserConnection): boolean;
  connect(connection: UserConnection): GameAndPlayer;
  disconnect(connection: UserConnection): void;
}

export class GameManager implements IGameManager {
  private playersInGames: Record<GameId, Set<string>> = {};
  private gameRepository: IGameRepository;

  constructor(props: GameManagerProps) {
    this.gameRepository = props.gameRepository;
  }

  private connectionToString(connection: UserConnection) {
    return `${connection.gameId}-${connection.username}`;
  }

  isConnected(connection: UserConnection) {
    return this.playersInGames[connection.gameId]?.has(
      this.connectionToString(connection),
    );
  }

  private addConnection(connection: UserConnection) {
    this.playersInGames[connection.gameId] ??= new Set();

    this.playersInGames[connection.gameId].add(
      this.connectionToString(connection),
    );
  }

  private deleteConnection(connection: UserConnection) {
    this.playersInGames[connection.gameId]?.delete(
      this.connectionToString(connection),
    );
  }

  private connectionsCount(gameId: GameId) {
    return this.playersInGames[gameId]?.size;
  }

  connect(connection: UserConnection): GameAndPlayer {
    if (this.isConnected(connection)) {
      throw new Error("User already connected");
    }

    const game = this.gameRepository.findOrCreate(connection.gameId);
    const player = game.findOrAddPlayer({ username: connection.username });

    this.addConnection(connection);

    return { game, player };
  }

  disconnect(connection: UserConnection) {
    const game = this.gameRepository.findById(connection.gameId);
    const player = game.findPlayerByUsername(connection.username);
    if (!game.isStarted()) {
      game.removePlayer(player.id);
    }

    this.deleteConnection(connection);

    if (this.connectionsCount(connection.gameId) === 0) {
      this.gameRepository.destroy(connection.gameId);
    }
  }
}
