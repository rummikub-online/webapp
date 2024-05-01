import { Card, cards } from "./cards";

const toShuffled = <T>(arr: readonly T[]) => {
  const arrCopy = [...arr];

  for (let i = arrCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
  }

  return arrCopy;
};

export const shuffledCards = () => toShuffled(toShuffled(toShuffled(cards)));

export const drawCard = (oldCards: Card[]) => {
  const [drawn, ...cards] = oldCards;

  return Object.freeze({
    drawn,
    cards: Object.freeze(cards),
  });
};
