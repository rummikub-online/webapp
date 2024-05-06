import { PLAYER_STARTUP_CARD_COUNT } from "./constants/card";
import { CardList } from "./entities/card";
import { Draw } from "./entities/drawStack";

const drawCards = (drawStack: CardList, count: number): Draw => {
  const draw = (stack: CardList, cards: CardList): Draw => {
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

export const drawCard = (drawStack: CardList): Draw => drawCards(drawStack, 1);

export const drawStartupCards = (drawStack: CardList): Draw =>
  drawCards(drawStack, PLAYER_STARTUP_CARD_COUNT);
