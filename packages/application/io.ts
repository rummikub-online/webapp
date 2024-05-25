import { IGame } from "@rumi/application/entities/Game";
import { IPlayer } from "@rumi/application/entities/Player";
import { GameBoardDto } from "@rumi/domain/dtos/gameBoard";
import { PlayerDto } from "@rumi/domain/dtos/player";
import { Server } from "node:http";
import { Socket, Server as SocketServer } from "socket.io";
import { CardPositionOnBoard } from "./entities/GameBoard";

export interface ServerToClientEvents {
  "player.update": (player: PlayerDto) => void;
  "gameBoard.update": (gameBoard: GameBoardDto) => void;
  // withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
  "game.start": () => void;
  "player.drawCard": () => void;
  "player.placeCardAlone": (cardIndex: number) => void;
  "player.placeCardInCombination": (
    cardIndex: number,
    destination: CardPositionOnBoard,
  ) => void;
  "player.moveCardAlone": (source: CardPositionOnBoard) => void;
  "player.moveCardToCombination": (
    source: CardPositionOnBoard,
    destination: CardPositionOnBoard,
  ) => void;
  "player.cancelTurnModifications": () => void;
  "player.endTurn": () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  player: IPlayer;
}

type GameSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export const createIo = (server: Server, game: IGame) => {
  const io = new SocketServer<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  const playerSockets: { [key: string]: GameSocket } = {};
  const playerSocket = (player: IPlayer) => playerSockets[player.id];

  const emitGameUpdate = () =>
    Object.values(playerSockets).forEach((socket) => {
      socket.emit("player.update", socket.data.player.toDto());
      socket.emit("gameBoard.update", game.toDto().gameBoard);
    });

  io.on("connection", (socket): void => {
    console.log("A player connected");
    if (!game.canAddPlayer()) {
      console.log("but game don't accept new players");
      return;
    }

    const player = game.addPlayer();
    socket.data.player = player;
    playerSockets[player.id] = socket;

    console.log(`${game.toDto().players.length} players`);

    emitGameUpdate();

    socket.on("disconnect", () => {
      game.removePlayer(player.id);
      delete playerSockets[player.id];
      console.log("A player disconnected");
      console.log(`${game.toDto().players.length} players`);

      emitGameUpdate();
    });

    socket.on("game.start", () => {
      if (!game.canStart() || !player.admin) {
        return;
      }

      console.log("Start game");

      game.start();
      emitGameUpdate();
    });

    socket.on("player.cancelTurnModifications", () => {
      if (!player.canCancelTurnModifications()) {
        return;
      }

      player.cancelTurnModifications();
      emitGameUpdate();
    });

    socket.on("player.drawCard", () => {
      if (!player.canDrawCard()) {
        return;
      }

      player.drawCard();
      emitGameUpdate();
    });

    socket.on("player.endTurn", () => {
      if (!player.canEndTurn()) {
        return;
      }

      player.endTurn();
      emitGameUpdate();
    });

    socket.on("player.moveCardAlone", (source) => {
      if (!player.canMoveCardAlone()) {
        return;
      }

      player.moveCardAlone(source);
      emitGameUpdate();
    });

    socket.on("player.moveCardToCombination", (source, destination) => {
      if (!player.canMoveCardToCombination()) {
        return;
      }

      player.moveCardToCombination(source, destination);
      emitGameUpdate();
    });

    socket.on("player.placeCardAlone", (cardIndex) => {
      if (!player.canPlaceCardAlone()) {
        return;
      }

      player.placeCardAlone(cardIndex);
      emitGameUpdate();
    });

    socket.on("player.placeCardInCombination", (cardIndex, destination) => {
      if (!player.canPlaceCardInCombination()) {
        return;
      }

      player.placeCardInCombination(cardIndex, destination);
      emitGameUpdate();
    });
  });
};
