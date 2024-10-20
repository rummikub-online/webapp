import { GameManager } from "@/app/Game/application/GameManager";
import { InMemoryGameRepository } from "@/app/Game/application/GameRepository/InMemoryGameRepository";
import { loadMocks } from "@/app/mocks";
import { registerGameEvents } from "@/app/WebSocket/infrastructure/gameEvents";
import type { WebSocketServer } from "@/app/WebSocket/infrastructure/types";
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";

const engine = new Engine();
const socketServer: WebSocketServer = new Server();
socketServer.bind(engine);
const gamesNamespace = socketServer.of("/games");

socketServer.on("connection", (socket) => {
  const namespace = socket.nsp;
  console.log(`Connected on ${namespace.name}`);
});

const gameRepository = new InMemoryGameRepository();
const gameManager = new GameManager({
  gameRepository: gameRepository,
});

registerGameEvents({
  io: gamesNamespace,
  gameManager,
});

if (import.meta.dev) {
  loadMocks({
    gameRepository,
    gameManager,
  });
}

export const app = {
  engine,
  socketServer,
  gameRepository,
  gameManager,
};
