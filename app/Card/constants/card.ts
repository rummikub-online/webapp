import type {
  CardColor,
  CardDto,
  CardDuplicata,
  CardNumber,
} from "@/app/Card/dtos/card";

export const CARD_COLORS: Readonly<Array<CardColor>> = Object.freeze([
  "red",
  "blue",
  "black",
  "yellow",
] as const);

export const CARD_NUMBERS: Readonly<Array<CardNumber>> = Object.freeze([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
] as const);

export const CARD_JOKER_NUMBER = 0;

const makeCard = (
  color: CardColor,
  number: CardNumber,
  duplicata: CardDuplicata
): CardDto =>
  Object.freeze({
    color,
    number,
    duplicata,
  });
const makeJokerCard = (color: CardColor, duplicata: CardDuplicata) =>
  makeCard(color, CARD_JOKER_NUMBER, duplicata);

export const CARDS = Object.freeze([
  ...CARD_COLORS.flatMap((color) =>
    CARD_NUMBERS.flatMap((number) => [
      makeCard(color, number, 1),
      makeCard(color, number, 2),
    ])
  ),
  makeJokerCard("red", 1),
  makeJokerCard("black", 2),
]);

export const PLAYER_STARTUP_CARD_COUNT = 14;
