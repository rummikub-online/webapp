import type { GameId } from "@/app/Game/application/Game";

export type UserConnection = {
  gameId: GameId;
  username: string;
};

export class ConnectedPlayerGateway {
  private connections: Set<string> = new Set();

  constructor() {}

  private connectionToString(connection: UserConnection) {
    return `${connection.gameId}-${connection.username}`;
  }

  isConnected(connection: UserConnection) {
    return this.connections.has(this.connectionToString(connection));
  }

  connect(connection: UserConnection) {
    if (this.isConnected(connection)) {
      throw new Error("User already connected");
    }

    this.connections.add(this.connectionToString(connection));
  }

  disconnect(connection: UserConnection) {
    this.connections.delete(this.connectionToString(connection));
  }
}
