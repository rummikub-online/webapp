import { CardDto } from "../../domain/dtos/card";
import { CardCombinationDto } from "../../domain/dtos/cardCombination";
import { IPlayer } from "./Player";

export interface IGame {
  addPlayer(): IPlayer;
  start(): void;
}

export class Game implements IGame {
  addPlayer(): IPlayer {
    throw new Error("Method not implemented.");
  }
  start() {
    throw new Error("Method not implemented.");
  }
  drawStack: Array<CardDto> = [];
  gameBoard: Array<CardCombinationDto> = [];
  players: Array<IPlayer> = [];
  currentPlayerIndex: number = 0;
}
