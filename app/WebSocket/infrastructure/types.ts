import type { GameInfosDto } from "@/app/Game/application/Game";
import type { CardPositionOnBoard } from "@/app/GameBoard/application/GameBoard";
import type { GameBoardDto } from "@/app/GameBoard/domain/dtos/gameBoard";
import type { IPlayer } from "@/app/Player/application/Player";
import type { PlayerDto } from "@/app/Player/domain/dtos/player";
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