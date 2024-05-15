import { CardDto } from "@rumi/domain/dtos/card";
import { CardListDto } from "@rumi/domain/dtos/cardList";
import { PlayerDto } from "@rumi/domain/dtos/player";
import { canStartWithPoints } from "@rumi/domain/gamerules/cardCombination/canStartWith";
import { isWinnerPlayer as hasPlayerWon } from "@rumi/domain/gamerules/player/hasWon";
import { IDrawStack } from "./DrawStack";
import { IGame } from "./Game";
import {
  CardPositionOnBoard,
  CombinationPositionOnBoard,
  IGameBoard,
} from "./GameBoard";

export interface IPlayer {
  admin: boolean;
  id: string;
  username?: string;
  drawStartupCards(): void;
  beginTurn(): void;
  drawCard(): void;
  placeCardAlone(cardIndex: number): CombinationPositionOnBoard;
  placeCardInCombination(
    cardIndex: number,
    destination: CardPositionOnBoard,
  ): void;
  moveCardAlone(source: CardPositionOnBoard): CombinationPositionOnBoard;
  moveCardToCombination(
    source: CardPositionOnBoard,
    destination: CardPositionOnBoard,
  ): void;
  cancelTurnModifications(): void;
  endTurn(): void;
  canDrawCard(): boolean;
  canPlaceCardAlone(): boolean;
  canPlaceCardInCombination(): boolean;
  canMoveCardAlone(): boolean;
  canMoveCardToCombination(): boolean;
  canCancelTurnModifications(): boolean;
  canEndTurn(): boolean;
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
  username?: string;
  admin?: boolean;
};

export class Player implements IPlayer {
  private readonly game?: IGame;
  private readonly gameBoard: IGameBoard;
  private readonly drawStack: IDrawStack;

  public readonly id: string;
  public readonly username?: string;
  public admin: boolean;

  private cards: CardListDto;
  private previousTurnCards: CardListDto = [];

  private hasDrawnStartupCards: boolean;
  private hasStarted: boolean;

  private hasDrawnThisTurn: boolean = false;
  private _isPlaying: boolean = false;

  constructor(props: PlayerProps) {
    this.game = props.game;
    this.gameBoard = props.gameBoard;
    this.drawStack = props.drawStack;
    this.id = props.id;
    this.cards = props.cards ?? [];
    this.hasDrawnStartupCards = props.hasDrewStartupCards ?? false;
    this.hasStarted = props.hasStarted ?? false;
    this.username = props.username;
    this.admin = props.admin ?? false;

    this.saveTurnCards();
  }

  private saveTurnCards() {
    this.previousTurnCards = Object.freeze([...this.cards]);
  }

  drawStartupCards(): void {
    if (this.hasDrawnStartupCards) {
      throw new Error("Player has already draw startup cards");
    }

    this.hasDrawnStartupCards = true;
    this.cards = [...this.cards, ...this.drawStack.drawStartupCards()];
  }

  beginTurn(): void {
    this.saveTurnCards();
    this.gameBoard.beginTurn();
    this._isPlaying = true;
    this.hasDrawnThisTurn = false;
  }

  placeCardAlone(cardIndex: number): CombinationPositionOnBoard {
    return this.gameBoard.placeCardAlone(this.giveCard(cardIndex));
  }

  placeCardInCombination(
    cardIndex: number,
    destination: CardPositionOnBoard,
  ): void {
    this.gameBoard.placeCardInCombination(
      this.giveCard(cardIndex),
      destination,
    );
  }

  moveCardAlone(source: CardPositionOnBoard): CombinationPositionOnBoard {
    return this.gameBoard.moveCardAlone(source);
  }

  moveCardToCombination(
    source: CardPositionOnBoard,
    destination: CardPositionOnBoard,
  ): void {
    this.gameBoard.moveCardToCombination(source, destination);
  }

  cancelTurnModifications(): void {
    this.cards = Object.freeze([...this.previousTurnCards]);

    this.saveTurnCards();

    this.gameBoard.cancelTurnModications();
  }

  private canStart(): boolean {
    return canStartWithPoints(this.gameBoard.turnPoints());
  }

  drawCard(): void {
    this.cards = [...this.cards, this.drawStack.drawCard()];
    this.hasDrawnThisTurn = true;

    this.endTurn();
  }

  private giveCard(cardIndex: number): CardDto {
    const cards = [...this.cards];

    const [placedCard] = cards.splice(cardIndex, 1);

    this.cards = Object.freeze(cards);

    return placedCard;
  }

  endTurn(): void {
    if (!this.hasDrawnThisTurn) {
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

  canDrawCard(): boolean {
    return this._isPlaying && !this.gameBoard.hasModifications();
  }

  canPlaceCardAlone(): boolean {
    return this._isPlaying && !this.hasDrawnThisTurn;
  }

  canPlaceCardInCombination(): boolean {
    return (
      this._isPlaying && !this.hasDrawnThisTurn && !this.gameBoard.isEmpty()
    );
  }

  canMoveCardAlone(): boolean {
    return (
      this._isPlaying && !this.hasDrawnThisTurn && !this.gameBoard.isEmpty()
    );
  }

  canMoveCardToCombination(): boolean {
    return (
      this._isPlaying && !this.hasDrawnThisTurn && !this.gameBoard.isEmpty()
    );
  }

  canCancelTurnModifications(): boolean {
    return (
      this._isPlaying &&
      !this.hasDrawnThisTurn &&
      this.gameBoard.hasModifications()
    );
  }

  canEndTurn(): boolean {
    return (
      this.gameBoard.isValid() &&
      (this.hasStarted || this.canStart()) &&
      this.gameBoard.turnPoints() > 0
    );
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
    return hasPlayerWon({
      hasDrawnStartupCards: this.hasDrawnStartupCards,
      cards: this.cards,
    });
  }

  canStartGame(): boolean {
    if (!this.game) {
      return false;
    }

    return this.game.canStart() && this.admin;
  }

  toDto(): PlayerDto {
    return {
      id: this.id,
      username: this.username,
      admin: this.admin,
      cards: this.cards,
      isPlaying: this.isPlaying(),
      hasDrawnStartupCards: this.hasDrawnStartupCards,
      hasStarted: this.hasStarted,
      hasDrawnThisTurn: this.hasDrawnThisTurn,
      hasWon: this.hasWon(),
      canStartGame: this.canStartGame(),
      canDrawCard: this.canDrawCard(),
      canPlaceCardAlone: this.canPlaceCardAlone(),
      canPlaceCardInCombination: this.canPlaceCardInCombination(),
      canMoveCardAlone: this.canMoveCardAlone(),
      canMoveCardToCombination: this.canMoveCardToCombination(),
      canCancelTurnModifications: this.canCancelTurnModifications(),
      canEndTurn: this.canEndTurn(),
    };
  }
}
