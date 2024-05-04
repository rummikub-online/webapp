import { CardList, cards } from "./card/cards";

export const PLAYER_STARTUP_CARD_COUNT = 14;

export type Draw = Readonly<{
  cards: CardList;
  drawStack: CardList;
}>;

const toShuffled = <T>(arr: readonly T[]) => {
  const arrCopy = [...arr];

  for (let i = arrCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
  }

  return arrCopy;
};

export const makeDrawStack = () => toShuffled(toShuffled(toShuffled(cards)));

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
