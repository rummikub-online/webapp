import { Card, CardColor, CardNum } from "../entities/card";

export const CARD_COLORS: Readonly<Array<CardColor>> = Object.freeze([
  "red",
  "blue",
  "black",
  "yellow",
] as const);

export const CARD_NUMBERS: Readonly<Array<CardNum>> = Object.freeze([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
] as const);

export const CARD_JOKER_NUMBER = 0;

const makeCard = (color: CardColor, num: CardNum): Card =>
  Object.freeze({
    color,
    num,
  });
const makeJokerCard = (color: CardColor) => makeCard(color, CARD_JOKER_NUMBER);

export const CARDS = Object.freeze([
  ...CARD_COLORS.flatMap((color) =>
    CARD_NUMBERS.flatMap((num) => [makeCard(color, num), makeCard(color, num)])
  ),
  makeJokerCard("red"),
  makeJokerCard("black"),
]);

export const PLAYER_STARTUP_CARD_COUNT = 14;
