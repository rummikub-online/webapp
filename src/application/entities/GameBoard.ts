import { CardDto } from "../../domain/dtos/card";
import { GameBoardDto } from "../../domain/dtos/gameBoard";
import { cardCombinationsPoints } from "../../domain/gamerules/cardCombination/points";
import { Combination, ICombination } from "./Combination";

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
    destination: CardPositionOnBoard
  ): void;
  deleteEmptyCombinations(): void;
  cancelTurnModications(): void;
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
  private previousTurn: GameBoardDto | null = null;

  constructor(props: GameBoardProps) {
    this.combinations = props.combinations ?? [];
  }

  beginTurn(): void {
    this.previousTurn = this.toDto();
  }

  placeCardAlone(card: CardDto): CombinationPositionOnBoard {
    this.combinations.push(new Combination({ cards: [card] }));

    return this.combinations.length - 1;
  }

  placeCardInCombination(
    card: CardDto,
    destination: CardPositionOnBoard
  ): void {
    this.combinations[destination.combinationIndex].addCardAt(
      card,
      destination.cardIndex
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
    destination: CardPositionOnBoard
  ): void {
    const sourceCombi = this.combinations[source.combinationIndex];
    const destinationCombi = this.combinations[destination.combinationIndex];

    destinationCombi.addCardAt(
      sourceCombi.pickCardFrom(source.cardIndex),
      destination.cardIndex
    );

    this.deleteEmptyCombinations();
  }

  cancelTurnModications(): void {
    this.throwIfTurnHasNotStarted();

    this.combinations = this.previousTurn!.combinations.map(
      (combinationDto) =>
        new Combination({
          cards: combinationDto.cards,
        })
    );
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
      this.previousTurn!.combinations
    );

    return this.points() - previousTurnPoints;
  }

  endTurn(): void {
    this.throwIfTurnHasNotStarted();
    this.throwIfNotValid();
  }

  private throwIfTurnHasNotStarted() {
    if (!this.previousTurn) {
      throw new Error("Turn has not started");
    }
  }

  private throwIfNotValid() {
    if (!this.isValid()) {
      throw new Error("Game board is not valid");
    }
  }

  points(): number {
    return cardCombinationsPoints(this.toDto().combinations);
  }

  toDto(): GameBoardDto {
    return {
      isValid: this.isValid(),
      combinations: [
        ...this.combinations.map((combination) => combination.toDto()),
      ],
    };
  }
}
