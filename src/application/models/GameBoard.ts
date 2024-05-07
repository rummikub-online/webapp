import { CardCombinationDto } from "../../domain/dtos/cardCombination";
import { GameBoardDto } from "../../domain/dtos/gameBoard";
import { CardCombination, ICardCombination } from "./CardCombination";

export interface IGameBoard {
  createCombination(cards: CardCombinationDto): void;
  isValid(): boolean;
  toDto(): GameBoardDto;
}

type GameBoardProps = {
  combinations?: Array<ICardCombination>;
};

export class GameBoard implements IGameBoard {
  private combinations: Array<ICardCombination>;

  constructor(props: GameBoardProps) {
    this.combinations = props.combinations ?? [];
  }
  createCombination(cards: CardCombinationDto): void {
    this.combinations.push(new CardCombination({ cards }));
  }

  isValid(): boolean {
    return this.combinations.every((combination) => combination.isValid());
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
