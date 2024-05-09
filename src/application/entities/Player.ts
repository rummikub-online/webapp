import { CardListDto } from "../../domain/dtos/cardList";
import { PlayerDto } from "../../domain/dtos/player";
import { ICardCombination } from "./CardCombination";
import { IDrawStack } from "./DrawStack";
import { IGameBoard } from "./GameBoard";

export interface IPlayer {
  id: string;
  drawStartupCards(): void;
  startWithCombinations(...combinations: Array<ICardCombination>): void;
  startTurn(): void;
  cancelTurnModifactions(): void;
  drawCard(): void;
  createCombinationWithItsCards(...cardIndexes: Array<Number>): void;
  endTurn(): void;
  toDto(): PlayerDto;
}

export type PlayerProps = {
  gameBoard: IGameBoard;
  drawStack: IDrawStack;
  id: string;
  cards?: CardListDto;
  hasDrewStartupCards?: boolean;
  hasStarted?: boolean;
};

export class Player implements IPlayer {
  private readonly gameBoard: IGameBoard;
  private readonly drawStack: IDrawStack;

  public readonly id: string;
  private cards: CardListDto;
  private hasDrewStartupCards: boolean;
  private hasStarted: boolean;

  constructor(props: PlayerProps) {
    this.gameBoard = props.gameBoard;
    this.drawStack = props.drawStack;
    this.id = props.id;
    this.cards = props.cards ?? [];
    this.hasDrewStartupCards = props.hasDrewStartupCards ?? false;
    this.hasStarted = props.hasStarted ?? false;
  }
  startWithCombinations(...combinations: ICardCombination[]): void {
    throw new Error("Method not implemented.");
  }

  startTurn(): void {
    this.gameBoard.backup();
  }

  createCombinationWithItsCards(): void {
    throw new Error("Method not implemented.");
  }

  cancelTurnModifactions(): void {
    this.gameBoard.restoreBackup();
  }

  endTurn(): void {
    if (!this.gameBoard.isValid()) {
      throw new Error("GameBoard is not valid");
    }
  }

  drawStartupCards(): void {
    if (this.hasDrewStartupCards) {
      throw new Error("Player has already draw startup cards");
    }

    this.hasDrewStartupCards = true;
    this.cards = [...this.cards, ...this.drawStack.drawStartupCards()];
  }

  drawCard(): void {
    this.cards = [...this.cards, this.drawStack.drawCard()];
    this.endTurn();
  }

  toDto(): PlayerDto {
    return {
      id: this.id,
      cards: this.cards,
      hasDrewStartupCards: this.hasDrewStartupCards,
      hasStarted: this.hasStarted,
    };
  }
}
