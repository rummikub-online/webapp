import { CardDto } from "@rummikub-ma/domain/dtos/card";
import { CardListDto } from "@rummikub-ma/domain/dtos/cardList";
import {
  CombinationDto,
  CombinationType,
} from "@rummikub-ma/domain/dtos/combination";
import { isValidCardSuite } from "@rummikub-ma/domain/gamerules/cardSuite/isValid";

export interface ICombination {
  isValid(): boolean;
  type(): CombinationType;
  addCardAt(card: CardDto, index: number): void;
  pickCardFrom(index: number): CardDto;
  explode(): Array<CardDto>;
  splitAfter(index: number): [ICombination, ICombination];
  isNotEmpty(): boolean;
  toDto(): CombinationDto;
}

type CombinationProps = {
  cards?: CardListDto;
};

export class Combination implements ICombination {
  private cards: CardListDto;

  constructor(props: CombinationProps) {
    this.cards = props.cards ?? [];
  }

  type(): CombinationType {
    if (isValidCardSuite(this.cards)) {
      return "suite";
    }

    // todo @matthieu: ajouter cette condition quand la fonction est dispo
    // if (isValidCardSerie(this.cards)) {
    //   return "serie";
    // }

    return "invalid";
  }

  explode(): Array<CardDto> {
    return [...this.cards];
  }

  isValid(): boolean {
    return this.type() !== "invalid";
  }

  addCardAt(card: CardDto, index: number = 0): void {
    if (index < 0 || this.cards.length < index) {
      throw new Error("Index is out of range");
    }

    const newCards = [...this.cards];

    newCards.splice(index, 0, card);

    this.cards = Object.freeze(newCards);
  }

  pickCardFrom(index: number): CardDto {
    if (index < 0 || this.cards.length - 1 < index) {
      throw new Error("Index is out of range");
    }

    const newCards = [...this.cards];

    const [pickedCard] = newCards.splice(index, 1);

    this.cards = Object.freeze(newCards);

    return pickedCard;
  }

  splitAfter(index: number): [ICombination, ICombination] {
    if (index < 0 || this.cards.length - 1 < index) {
      throw new Error("Index is out of range");
    }

    const sliceIndex = index + 1;

    return [
      new Combination({ cards: this.cards.slice(0, sliceIndex) }),
      new Combination({ cards: this.cards.slice(sliceIndex) }),
    ];
  }

  isNotEmpty(): boolean {
    return this.cards.length > 0;
  }

  toDto(): CombinationDto {
    return {
      type: this.type(),
      cards: [...this.cards],
    };
  }
}
