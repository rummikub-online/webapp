import { CardDto } from "../../domain/dtos/card";
import { CardCombinationDto } from "../../domain/dtos/cardCombination";
import { CardListDto } from "../../domain/dtos/cardList";
import { CardCombinationType } from "../../domain/enums/CardCombinationType";
import { isValidCardSuite } from "../../domain/gamerules/cardSuite/isValid";

export interface ICardCombination {
  toDto(): CardCombinationDto;
  isValid(): boolean;
  type(): CardCombinationType;
  addCardAt(card: CardDto, index: number): void;
  pickCardFrom(index: number): CardDto;
  explode(): Array<CardDto>;
  splitAfter(index: number): [ICardCombination, ICardCombination];
}

type CardCombinationProps = {
  cards?: CardListDto;
};

export class CardCombination implements ICardCombination {
  private cards: CardListDto;

  constructor(props: CardCombinationProps) {
    this.cards = props.cards ?? [];
  }

  type(): CardCombinationType {
    if (isValidCardSuite(this.cards)) {
      return CardCombinationType.Suite;
    }

    // todo @matthieu: ajouter cette condition quand la fonction est dispo
    // if (isValidCardSerie(this.cards)) {
    //   return CardCombinationType.Serie;
    // }

    return CardCombinationType.Invalid;
  }

  explode(): Array<CardDto> {
    return [...this.cards];
  }

  isValid(): boolean {
    return this.type() !== CardCombinationType.Invalid;
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

  splitAfter(index: number): [ICardCombination, ICardCombination] {
    if (index < 0 || this.cards.length - 1 < index) {
      throw new Error("Index is out of range");
    }

    const sliceIndex = index + 1;

    return [
      new CardCombination({ cards: this.cards.slice(0, sliceIndex) }),
      new CardCombination({ cards: this.cards.slice(sliceIndex) }),
    ];
  }

  toDto(): CardCombinationDto {
    return {
      type: this.type(),
      cards: [...this.cards],
    };
  }
}
