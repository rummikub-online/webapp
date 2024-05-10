import { CardDto } from "../../domain/dtos/card";
import { CardListDto } from "../../domain/dtos/cardList";
import { PlayerDto } from "../../domain/dtos/player";
import { canStartWithPoints } from "../../domain/gamerules/cardCombination/canStartWith";
import { isWinnerPlayer as hasPlayerWon } from "../../domain/gamerules/player/hasWon";
import { IDrawStack } from "./DrawStack";
import { IGame } from "./Game";
import {
  CardPositionOnBoard,
  CombinationPositionOnBoard,
  IGameBoard,
} from "./GameBoard";

export interface IPlayer {
  id: string;
  drawStartupCards(): void;
  beginTurn(): void;
  drawCard(): void;
  placeCardAlone(cardIndex: number): CombinationPositionOnBoard;
  placeCardInCombination(
    cardIndex: number,
    destination: CardPositionOnBoard
  ): void;
  moveCardAlone(source: CardPositionOnBoard): CombinationPositionOnBoard;
  moveCardToCombination(
    source: CardPositionOnBoard,
    destination: CardPositionOnBoard
  ): void;
  cancelTurnModifactions(): void;
  endTurn(): void;
  isPlaying(): boolean;
  hasWon(): boolean;
  toDto(): PlayerDto;
}

export type PlayerProps = {
  gameBoard: IGameBoard;
  drawStack: IDrawStack;
  id: string;
  game?: IGame;
  cards?: CardListDto;
  hasDrewStartupCards?: boolean;
  hasStarted?: boolean;
};

export class Player implements IPlayer {
  private readonly game?: IGame;
  private readonly gameBoard: IGameBoard;
  private readonly drawStack: IDrawStack;

  public readonly id: string;
  private cards: CardListDto;
  private hasDrewStartupCards: boolean;
  private hasStarted: boolean;

  private hasDrawThisTurn: boolean = false;
  private _isPlaying: boolean = false;

  constructor(props: PlayerProps) {
    this.game = props.game;
    this.gameBoard = props.gameBoard;
    this.drawStack = props.drawStack;
    this.id = props.id;
    this.cards = props.cards ?? [];
    this.hasDrewStartupCards = props.hasDrewStartupCards ?? false;
    this.hasStarted = props.hasStarted ?? false;
  }

  drawStartupCards(): void {
    if (this.hasDrewStartupCards) {
      throw new Error("Player has already draw startup cards");
    }

    this.hasDrewStartupCards = true;
    this.cards = [...this.cards, ...this.drawStack.drawStartupCards()];
  }

  beginTurn(): void {
    this.gameBoard.beginTurn();
    this._isPlaying = true;
    this.hasDrawThisTurn = false;
  }

  placeCardAlone(cardIndex: number): CombinationPositionOnBoard {
    return this.gameBoard.placeCardAlone(this.giveCard(cardIndex));
  }

  placeCardInCombination(
    cardIndex: number,
    destination: CardPositionOnBoard
  ): void {
    this.gameBoard.placeCardInCombination(
      this.giveCard(cardIndex),
      destination
    );
  }

  moveCardAlone(source: CardPositionOnBoard): CombinationPositionOnBoard {
    return this.gameBoard.moveCardAlone(source);
  }

  moveCardToCombination(
    source: CardPositionOnBoard,
    destination: CardPositionOnBoard
  ): void {
    this.gameBoard.moveCardToCombination(source, destination);
  }

  cancelTurnModifactions(): void {
    this.gameBoard.cancelTurnModications();
  }

  private canStart(): boolean {
    return canStartWithPoints(this.gameBoard.turnPoints());
  }

  drawCard(): void {
    this.cards = [...this.cards, this.drawStack.drawCard()];
    this.hasDrawThisTurn = true;

    this.endTurn();
  }

  giveCard(cardIndex: number): CardDto {
    const cards = [...this.cards];

    const [placedCard] = cards.splice(cardIndex, 1);

    this.cards = Object.freeze(cards);

    return placedCard;
  }

  endTurn(): void {
    if (!this.hasDrawThisTurn) {
      this.throwIfNotEnoughPointsToStart();
      this.throwIfNoPointsPlayed();
    }

    this.gameBoard.endTurn();

    this._isPlaying = false;

    if (!this.game) {
      return;
    }

    if (this.hasWon()) {
      this.game.end();
    } else {
      this.game.nextPlayerAfter(this).beginTurn();
    }
  }

  private throwIfNoPointsPlayed() {
    if (this.gameBoard.turnPoints() === 0) {
      throw new Error("No points played");
    }
  }

  private throwIfNotEnoughPointsToStart() {
    if (this.hasStarted || this.canStart()) {
      return;
    }

    throw new Error("Not enough points to start");
  }

  isPlaying(): boolean {
    return this._isPlaying;
  }

  hasWon(): boolean {
    return hasPlayerWon(this.toDto());
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
