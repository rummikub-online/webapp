import { CardDto } from "../../domain/dtos/card";
import { CardListDto } from "../../domain/dtos/cardList";
import { PlayerDto } from "../../domain/dtos/player";
import { canStartWithPoints } from "../../domain/gamerules/cardCombination/canStartWith";
import { IDrawStack } from "./DrawStack";
import { IGameBoard } from "./GameBoard";

export interface IPlayer {
  id: string;
  drawStartupCards(): void;
  beginTurn(): void;
  cancelTurnModifactions(): void;
  drawCard(): void;
  placeCard(cardIndex: number): void;
  createCombinationWithItsCards(...cardIndexes: Array<number>): void;
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

  private hasDrawThisTurn: boolean = false;

  constructor(props: PlayerProps) {
    this.gameBoard = props.gameBoard;
    this.drawStack = props.drawStack;
    this.id = props.id;
    this.cards = props.cards ?? [];
    this.hasDrewStartupCards = props.hasDrewStartupCards ?? false;
    this.hasStarted = props.hasStarted ?? false;
  }

  beginTurn(): void {
    this.gameBoard.beginTurn();
    this.hasDrawThisTurn = false;
  }

  createCombinationWithItsCards(...cardIndexes: Array<number>): void {
    this.gameBoard.createCombination(
      cardIndexes.map((index) => this.cards[index])
    );

    cardIndexes.map((index) => this.placeCard(index));
  }

  cancelTurnModifactions(): void {
    this.gameBoard.cancelTurnModications();
  }

  private canStart(): boolean {
    return canStartWithPoints(this.gameBoard.turnPoints());
  }

  endTurn(): void {
    if (this.hasDrawThisTurn) {
      this.gameBoard.endTurn();

      return;
    }

    if (!this.hasStarted) {
      this.throwIfNotEnoughtPointsToStart();
    }

    this.throwIfNoPointsPlayed();
    this.gameBoard.endTurn();
  }

  private throwIfNoPointsPlayed() {
    if (this.gameBoard.turnPoints() === 0) {
      throw new Error("No points played");
    }
  }

  private throwIfNotEnoughtPointsToStart() {
    if (!this.canStart()) {
      throw new Error("Not enough points to start");
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
    this.hasDrawThisTurn = true;

    this.endTurn();
  }

  placeCard(cardIndex: number): CardDto {
    const cards = [...this.cards];

    const [placedCard] = cards.splice(cardIndex, 1);

    this.cards = Object.freeze(cards);

    return placedCard;
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
