import {
  type IGameRepository,
  GameRepository,
} from "@/app/GameRepository/application/GameRepository";
import { registerSocketEvents } from "@/app/WebSocket/infrastructure/events";
import type { WebSocketServer } from "@/app/WebSocket/infrastructure/types";

export class App {
  private gameRepository: IGameRepository;

  constructor(socketServer: WebSocketServer) {
    this.gameRepository = new GameRepository();

    registerSocketEvents(this.gameRepository, socketServer);
  }
}
