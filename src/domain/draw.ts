import { PLAYER_STARTUP_CARD_COUNT } from "./constants/card";
import { CardCombination } from "./entities/cardCombination";

export type Draw = Readonly<{
  cards: CardCombination;
  drawStack: CardCombination;
}>;

const drawCards = (drawStack: CardCombination, count: number): Draw => {
  const draw = (stack: CardCombination, cards: CardCombination): Draw => {
    if (stack[0] !== undefined && cards.length < count) {
      const [drawedCard, ...newDrawStack] = stack;
      return draw(newDrawStack, [...cards, drawedCard]);
    }

    return Object.freeze({
      cards,
      drawStack: Object.freeze(stack),
    });
  };

  return draw(drawStack, []);
};

export const drawCard = (drawStack: CardCombination): Draw =>
  drawCards(drawStack, 1);

export const drawStartupCards = (drawStack: CardCombination): Draw =>
  drawCards(drawStack, PLAYER_STARTUP_CARD_COUNT);
