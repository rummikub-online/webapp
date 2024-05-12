import {
  CARDS,
  PLAYER_STARTUP_CARD_COUNT,
} from "@rummikub-ma/domain/constants/card";
import { CardDto } from "@rummikub-ma/domain/dtos/card";
import { CardListDto } from "@rummikub-ma/domain/dtos/cardList";
import { DrawStackDto } from "@rummikub-ma/domain/dtos/drawStack";
import { toShuffled } from "../utils/array";

export interface IDrawStack {
  isEmpty(): boolean;
  shuffle(): void;
  drawCard(): CardDto;
  drawStartupCards(): CardListDto;
  putBack(card: CardDto): void;
  toDto(): DrawStackDto;
}

type DrawStackProps = {
  cards?: CardListDto;
};

export class DrawStack implements IDrawStack {
  private cards: CardListDto;

  constructor(props: DrawStackProps) {
    this.cards = props.cards ?? [...CARDS];
  }
  putBack(card: CardDto): void {
    this.cards = [card, ...this.cards];
  }

  shuffle(): void {
    this.cards = toShuffled(this.cards, 3);
  }

  isEmpty(): boolean {
    return this.cards.length === 0;
  }

  drawCard(): CardDto {
    if (this.isEmpty()) {
      throw new Error("Draw stack is empty");
    }

    const [drawedCard, ...remainingCards] = this.cards;

    this.cards = remainingCards;

    return drawedCard;
  }

  drawStartupCards(): CardListDto {
    const drawedCards = [];

    for (let i = 0; i < PLAYER_STARTUP_CARD_COUNT; i++) {
      drawedCards.push(this.drawCard());
    }

    return drawedCards;
  }

  toDto(): DrawStackDto {
    return {
      isEmpty: this.isEmpty(),
    };
  }
}
