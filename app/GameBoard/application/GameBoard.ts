import type { CardDto } from "@/app/Card/domain/dtos/card";
import {
  Combination,
  type ICombination,
} from "@/app/Combination/application/Combination";
import type { CombinationDto } from "@/app/Combination/domain/dtos/combination";
import { areEqual } from "@/app/Combination/domain/gamerules/areEqual";
import { cardCombinationsPoints } from "@/app/Combination/domain/gamerules/points";
import type { GameBoardDto } from "@/app/GameBoard/domain/dtos/gameBoard";

export type CardPositionInCombination = number;
export type CombinationPositionOnBoard = number;
export type CardPositionOnBoard = {
  combinationIndex: CombinationPositionOnBoard;
  cardIndex: CardPositionInCombination;
};

export interface IGameBoard {
  beginTurn(): void;

  placeCardAlone(card: CardDto): CombinationPositionOnBoard;

  placeCardInCombination(card: CardDto, destination: CardPositionOnBoard): void;

  moveCardAlone(source: CardPositionOnBoard): CombinationPositionOnBoard;

  moveCardToCombination(
    source: CardPositionOnBoard,
    destination: CardPositionOnBoard,
  ): void;

  wasCombinationPlacedThisTurn(combinationIndex: number): boolean;

  deleteEmptyCombinations(): void;

  cancelTurnModifications(): void;

  hasModifications(): boolean;

  isEmpty(): boolean;

  isValid(): boolean;

  turnPoints(): number;

  endTurn(): void;

  points(): number;

  toDto(): GameBoardDto;
}

type GameBoardProps = {
  combinations?: Array<ICombination>;
};

export class GameBoard implements IGameBoard {
  private combinations: Array<ICombination>;
  private previousTurnCombinations: ReadonlyArray<CombinationDto> = [];

  constructor(props: GameBoardProps) {
    this.combinations = props.combinations ?? [];
    this.saveTurnCombinations();
  }

  beginTurn(): void {
    this.saveTurnCombinations();
  }

  private saveTurnCombinations() {
    this.previousTurnCombinations = Object.freeze([
      ...this.toDto().combinations,
    ]);
  }

  placeCardAlone(card: CardDto): CombinationPositionOnBoard {
    this.combinations.push(new Combination({ cards: [card] }));

    return this.combinations.length - 1;
  }

  placeCardInCombination(
    card: CardDto,
    destination: CardPositionOnBoard,
  ): void {
    this.combinations[destination.combinationIndex].addCardAt(
      card,
      destination.cardIndex,
    );
  }

  moveCardAlone(source: CardPositionOnBoard): CombinationPositionOnBoard {
    const sourceCombi = this.combinations[source.combinationIndex];

    const card = sourceCombi.pickCardFrom(source.cardIndex);

    this.combinations.push(new Combination({ cards: [card] }));

    this.deleteEmptyCombinations();

    return this.combinations.length - 1;
  }

  moveCardToCombination(
    source: CardPositionOnBoard,
    destination: CardPositionOnBoard,
  ): void {
    const sourceCombi = this.combinations[source.combinationIndex];
    const destinationCombi = this.combinations[destination.combinationIndex];

    destinationCombi.addCardAt(
      sourceCombi.pickCardFrom(source.cardIndex),
      destination.cardIndex,
    );

    this.deleteEmptyCombinations();
  }

  cancelTurnModifications(): void {
    this.throwIfTurnHasNotStarted();

    this.combinations = this.previousTurnCombinations!.map(
      (combinationDto) =>
        new Combination({
          cards: combinationDto.cards,
        }),
    );

    this.saveTurnCombinations();
  }

  hasModifications(): boolean {
    return (
      JSON.stringify(this.previousTurnCombinations) !==
      JSON.stringify(
        this.combinations.map((combination) => combination.toDto()),
      )
    );
  }

  wasCombinationPlacedThisTurn(combinationIndex: number): boolean {
    const combiDto = this.combinations[combinationIndex].toDto();

    const wasCombinationInPreviousTurn = this.previousTurnCombinations.some(
      (previousTurnCombiDto) => areEqual(combiDto, previousTurnCombiDto),
    );

    return !wasCombinationInPreviousTurn;
  }

  isEmpty(): boolean {
    return this.combinations.length === 0;
  }

  isValid(): boolean {
    return this.combinations.every((combination) => combination.isValid());
  }

  deleteEmptyCombinations(): void {
    this.combinations = this.combinations.filter((combi) => combi.isNotEmpty());
  }

  turnPoints(): number {
    this.throwIfTurnHasNotStarted();

    const previousTurnPoints = cardCombinationsPoints(
      [...this.previousTurnCombinations]!,
    );

    return this.points() - previousTurnPoints;
  }

  endTurn(): void {
    this.throwIfTurnHasNotStarted();
    this.throwIfNotValid();
  }

  private throwIfTurnHasNotStarted() {
    if (!this.previousTurnCombinations) {
      throw new Error("Turn has not started");
    }
  }

  private throwIfNotValid() {
    if (!this.isValid()) {
      throw new Error("Game board is not valid");
    }
  }

  points(): number {
    return cardCombinationsPoints(
      this.combinations.map((combination) => combination.toDto()),
    );
  }

  toDto(): GameBoardDto {
    return {
      isValid: this.isValid(),
      combinations: [
        ...this.combinations.map((combination) => combination.toDto()),
      ],
      hasModifications: this.hasModifications(),
      points: this.points(),
      turnPoints: this.turnPoints(),
    };
  }
}
