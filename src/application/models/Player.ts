import { CardDto } from "../../domain/dtos/card";
import { PlayerDto } from "../../domain/dtos/player";
import { IDrawStack } from "./DrawStack";
import { IGame } from "./Game";
import { IGameBoard } from "./GameBoard";

export interface IPlayer {
  receiveCards(...cards: Array<CardDto>): void;
  drawCard(): void;
  play(): void;
  toDto(): PlayerDto;
}

export type PlayerProps = {
  gameBoard: IGameBoard;
  drawStack: IDrawStack;
  id: string;
  cards?: Array<CardDto>;
  hasDrewStartupCards?: boolean;
};

export class Player implements IPlayer {
  private readonly gameBoard: IGameBoard;
  private readonly drawStack: IDrawStack;

  public readonly id: string;
  private cards: Array<CardDto>;
  private hasDrewStartupCards: boolean;

  constructor(props: PlayerProps) {
    this.gameBoard = props.gameBoard;
    this.drawStack = props.drawStack;
    this.id = props.id;
    this.cards = props.cards ?? [];
    this.hasDrewStartupCards = props.hasDrewStartupCards ?? false;
  }

  receiveCards(...cards: Array<CardDto>): void {
    this.cards.push(...cards);
  }

  drawCard(): void {
    this.receiveCards(this.drawStack.drawCard());
  }

  play(): void {
    throw new Error("Method not implemented.");
  }

  toDto(): PlayerDto {
    return {
      id: this.id,
      cards: this.cards,
      hasDrewStartupCards: this.hasDrewStartupCards,
    };
  }
}
