import {
  type IGameRepository,
  GameRepository,
} from "@/app/GameRepository/entities/GameRepository";
import { registerSocketEvents } from "@/app/WebSocket/events";
import type { WebSocketServer } from "@/app/WebSocket/types";

export class App {
  private gameRepository: IGameRepository;

  constructor(socketServer: WebSocketServer) {
    this.gameRepository = new GameRepository();

    registerSocketEvents(this.gameRepository, socketServer);
  }
}
