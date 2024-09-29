import { GameManager } from "@/app/Game/application/GameManager";
import {
  type IGameRepository,
  GameRepository,
} from "@/app/Game/application/GameRepository";
import { registerSocketEvents } from "@/app/WebSocket/infrastructure/events";
import type { WebSocketServer } from "@/app/WebSocket/infrastructure/types";

export class App {
  private gameRepository: IGameRepository;
  private gameManager: GameManager;

  constructor(socketServer: WebSocketServer) {
    this.gameRepository = new GameRepository();

    this.gameManager = new GameManager({
      gameRepository: this.gameRepository,
    });

    registerSocketEvents({
      socketServer: socketServer,
      gameManager: this.gameManager,
    });
  }
}
