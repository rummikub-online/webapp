import { CARDS, PLAYER_STARTUP_CARD_COUNT } from "../../domain/constants/card";
import { CardDto } from "../../domain/dtos/card";
import { DrawStackDto } from "../../domain/dtos/drawStack";
import { toShuffled } from "../utils/array";

export interface IDrawStack {
  isEmpty(): boolean;
  shuffle(): void;
  drawCard(): CardDto;
  drawStartupCards(): Array<CardDto>;
  toDto(): DrawStackDto;
}

type DrawStackProps = {
  cards?: Array<CardDto>;
};

export class DrawStack implements IDrawStack {
  private cards: Array<CardDto>;

  constructor(props: DrawStackProps) {
    this.cards = props.cards ?? [...CARDS];
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

    const card = this.cards.shift();

    if (card === undefined) {
      throw new Error("Draw stack is empty");
    }

    return card;
  }

  drawStartupCards(): Array<CardDto> {
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
