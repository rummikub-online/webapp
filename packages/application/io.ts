import { IPlayer } from "@rumi/application/entities/Player";
import { GameBoardDto } from "@rumi/domain/dtos/gameBoard";
import { PlayerDto } from "@rumi/domain/dtos/player";
import { Server } from "node:http";
import { Socket, Server as SocketServer } from "socket.io";
import { GameInfosDto, IGame } from "./entities/Game";
import { CardPositionOnBoard } from "./entities/GameBoard";
import { IGameRepository } from "./entities/GameRepository";

export interface ServerToClientEvents {
  "player.update": (player: PlayerDto) => void;
  "gameBoard.update": (gameBoard: GameBoardDto) => void;
  "game.infos.update": (game: GameInfosDto) => void;
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

type GameSocketServer = SocketServer<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

const gameRoom = (game: IGame) => `${game.id}`;
const playerRoom = (game: IGame, player: IPlayer | PlayerDto) =>
  `${game.id}-${player.id}`;

export const registerSocketEvents = (
  server: Server,
  gameRepository: IGameRepository,
) => {
  const io: GameSocketServer = new SocketServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  const emitGameUpdate = (game: IGame) => {
    const gameDto = game.toDto();

    io.to(gameRoom(game)).emit("gameBoard.update", gameDto.gameBoard);

    gameDto.players.forEach((player) => {
      io.to(playerRoom(game, player)).emit("player.update", player);
    });
  };

  const bindEventsToSocket = ({
    socket,
    game,
    player,
  }: {
    socket: GameSocket;
    game: IGame;
    player: IPlayer;
  }) => {
    console.log(`game ${game.id}`);

    socket.join(gameRoom(game));
    socket.join(playerRoom(game, player));

    socket.data.player = player;

    console.log(`${game.toDto().players.length} players`);

    emitGameUpdate(game);
    socket.emit("game.infos.update", game.toInfosDto());

    socket.on("disconnect", () => {
      game.removePlayer(player.id);
      console.log("A player disconnected");
      console.log(`${game.toDto().players.length} players`);

      emitGameUpdate(game);
    });

    socket.on("game.start", () => {
      if (!game.canStart() || !player.admin) {
        return;
      }

      console.log("Start game");

      game.start();
      emitGameUpdate(game);
    });

    socket.on("player.cancelTurnModifications", () => {
      if (!player.canCancelTurnModifications()) {
        return;
      }

      player.cancelTurnModifications();
      emitGameUpdate(game);
    });

    socket.on("player.drawCard", () => {
      if (!player.canDrawCard()) {
        return;
      }

      player.drawCard();
      emitGameUpdate(game);
    });

    socket.on("player.endTurn", () => {
      if (!player.canEndTurn()) {
        return;
      }

      player.endTurn();
      emitGameUpdate(game);
    });

    socket.on("player.moveCardAlone", (source) => {
      if (!player.canMoveCardAlone()) {
        return;
      }

      player.moveCardAlone(source);
      emitGameUpdate(game);
    });

    socket.on("player.moveCardToCombination", (source, destination) => {
      if (!player.canMoveCardToCombination()) {
        return;
      }

      player.moveCardToCombination(source, destination);
      emitGameUpdate(game);
    });

    socket.on("player.placeCardAlone", (cardIndex) => {
      if (!player.canPlaceCardAlone()) {
        return;
      }

      player.placeCardAlone(cardIndex);
      emitGameUpdate(game);
    });

    socket.on("player.placeCardInCombination", (cardIndex, destination) => {
      if (!player.canPlaceCardInCombination()) {
        return;
      }

      player.placeCardInCombination(cardIndex, destination);
      emitGameUpdate(game);
    });
  };

  io.on("connection", (socket): void => {
    const gameId = socket.handshake.query.gameId;

    if (typeof gameId !== "string" || !gameRepository.exists(gameId)) {
      socket.disconnect();
      return;
    }

    const { game, player } = gameRepository.join(gameId);

    bindEventsToSocket({ socket, game, player });
  });
};
