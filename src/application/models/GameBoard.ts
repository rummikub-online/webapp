import { CardListDto } from "../../domain/dtos/cardList";
import { GameBoardDto } from "../../domain/dtos/gameBoard";
import { CardCombination, ICardCombination } from "./CardCombination";

export interface IGameBoard {
  createCombination(cards: CardListDto): void;
  isValid(): boolean;
  backup(): void;
  restoreBackup(): void;
  toDto(): GameBoardDto;
}

type GameBoardProps = {
  combinations?: Array<ICardCombination>;
};

export class GameBoard implements IGameBoard {
  private combinations: Array<ICardCombination>;
  private backupedData: GameBoardDto | null = null;

  constructor(props: GameBoardProps) {
    this.combinations = props.combinations ?? [];
  }

  createCombination(cards: CardListDto): void {
    this.combinations.push(new CardCombination({ cards }));
  }

  isValid(): boolean {
    return this.combinations.every((combination) => combination.isValid());
  }

  backup(): void {
    this.backupedData = this.toDto();
  }

  restoreBackup(): void {
    if (!this.backupedData) {
      throw new Error("No backup to restore");
    }

    this.combinations = this.backupedData?.combinations.map(
      (combinationDto) =>
        new CardCombination({
          cards: combinationDto.cards,
        })
    );
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
