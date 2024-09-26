import type { GameInfosDto } from "@/app/Rummikub/Game/entities/Game";
import type { GameBoardDto } from "@/app/Rummikub/GameBoard/dtos/gameBoard";
import type { CardPositionOnBoard } from "@/app/Rummikub/GameBoard/entities/GameBoard";
import type { PlayerDto } from "@/app/Rummikub/Player/dtos/player";
import type { IPlayer } from "@/app/Rummikub/Player/Player";
import { Server, Socket as ServerSocker } from "socket.io";
import { Socket } from "socket.io-client";

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
    destination: CardPositionOnBoard
  ) => void;
  "player.moveCardAlone": (source: CardPositionOnBoard) => void;
  "player.moveCardToCombination": (
    source: CardPositionOnBoard,
    destination: CardPositionOnBoard
  ) => void;
  "player.cancelTurnModifications": () => void;
  "player.endTurn": () => void;
}

export interface InterServerEvents {}

export interface SocketData {
  player: IPlayer;
}

export type WebSocketClient = Socket<
  ClientToServerEvents,
  ServerToClientEvents
>;

export type WebSocketServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export type WebSocketServerSocket = ServerSocker<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
