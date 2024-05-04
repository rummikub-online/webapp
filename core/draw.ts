import { CardList, cards } from "./card/cards";

const toShuffled = <T>(arr: readonly T[]) => {
  const arrCopy = [...arr];

  for (let i = arrCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
  }

  return arrCopy;
};

export const makeDrawStack = () => toShuffled(toShuffled(toShuffled(cards)));

export const drawCard = ([card, ...newDrawStack]: CardList) =>
  Object.freeze({
    card,
    drawStack: Object.freeze(newDrawStack),
  });
