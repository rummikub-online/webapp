import { CardColor, CardDto, CardNum } from "../../domain/dtos/card";
import { CardCombinationDto } from "../../domain/dtos/cardCombination";
import { isValidCardSuite } from "../../domain/gamerules/cardSuite/isValid";
import { CardCombinationType } from "../enums/CardCombinationType";

export interface ICardCombination {
  toDto(): CardCombinationDto;
  isValid(): boolean;
  type(): CardCombinationType;
  addCardAt(card: CardDto, index: number): void;
  pickCardFrom(index: number): CardDto;
  explode(): Array<CardDto>;
  splitAt(index: number): [ICardCombination, ICardCombination];
}

type CardCombinationProps = {
  cards?: CardCombinationDto;
};

export class CardCombination implements ICardCombination {
  private cards: CardCombinationDto;

  constructor(props: CardCombinationProps) {
    this.cards = props.cards ?? [];
  }

  type(): CardCombinationType {
    if (isValidCardSuite(this.cards)) {
      return CardCombinationType.Suite;
    }

    // todo @matthieu
    // if (isValidCardSerie(this.cards)) {
    //   return CardCombinationType.Serie;
    // }

    return CardCombinationType.Invalid;
  }

  explode(): Readonly<{ color: CardColor; num: CardNum }>[] {
    throw new Error("Method not implemented.");
  }

  isValid(): boolean {
    return this.type() !== CardCombinationType.Invalid;
  }

  addCardAt(card: CardDto, index: number = 0): void {
    throw new Error("Method not implemented.");
  }

  pickCardFrom(index: number): CardDto {
    throw new Error("Method not implemented.");
  }

  splitAt(index: number): [ICardCombination, ICardCombination] {
    throw new Error("Method not implemented.");
  }

  toDto(): CardCombinationDto {
    return [...this.cards];
  }
}
