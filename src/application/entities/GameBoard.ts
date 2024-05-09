import { CardListDto } from "../../domain/dtos/cardList";
import { GameBoardDto } from "../../domain/dtos/gameBoard";
import { cardCombinationsPoints } from "../../domain/gamerules/cardCombination/points";
import { Combination, ICombination } from "./Combination";

export interface IGameBoard {
  createCombination(cards: CardListDto): void;
  isValid(): boolean;
  beginTurn(): void;
  cancelTurnModications(): void;
  turnPoints(): number;
  endTurn(): void;
  toDto(): GameBoardDto;
  points(): number;
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

  points(): number {
    return cardCombinationsPoints(this.toDto().combinations);
  }

  createCombination(cards: CardListDto): void {
    this.combinations.push(new Combination({ cards }));
  }

  isValid(): boolean {
    return this.combinations.every((combination) => combination.isValid());
  }

  beginTurn(): void {
    this.previousTurn = this.toDto();
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

  toDto(): GameBoardDto {
    return {
      isValid: this.isValid(),
      combinations: [
        ...this.combinations.map((combination) => combination.toDto()),
      ],
    };
  }
}
