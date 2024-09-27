import type { CardDto } from "@/app/Card/domain/dtos/card";
import type { CardListDto } from "@/app/Card/domain/dtos/cardList";

export type OrderedCardDto = CardDto & {
  initialIndex: number;
};

const markInitialIndex = (cards: CardListDto): Array<OrderedCardDto> =>
  cards.map((card, index) =>
    Object.freeze({
      ...card,
      initialIndex: index,
    })
  );

const groupByColor = <T extends CardDto>(cards: Array<T>) => {
  const groupedCards: { [key: string]: Array<T> } = {};

  cards.forEach((card) => {
    if (!groupedCards[card.color]) {
      groupedCards[card.color] = [];
    }

    groupedCards[card.color].push(card);
  });

  return Object.values(groupedCards);
};

const groupByNumber = <T extends CardDto>(cards: Array<T>) => {
  const groupedCards: { [key: string]: Array<T> } = {};

  cards.forEach((card) => {
    if (!groupedCards[card.number]) {
      groupedCards[card.number] = [];
    }

    groupedCards[card.number].push(card);
  });

  return Object.values(groupedCards);
};

const sortByColor = <T extends CardDto>(a: T, b: T) => {
  const nameA = a.color.toUpperCase();
  const nameB = b.color.toUpperCase();

  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
};
const sortByNumber = <T extends CardDto>(a: T, b: T) => a.number - b.number;

export const byColor = (cards: CardListDto): Array<OrderedCardDto> =>
  groupByColor(markInitialIndex(cards))
    .map((group) => group.sort(sortByNumber))
    .flat();

export const byNumber = (cards: CardListDto): Array<OrderedCardDto> =>
  groupByNumber(markInitialIndex(cards))
    .map((group) => group.sort(sortByColor))
    .flat();
