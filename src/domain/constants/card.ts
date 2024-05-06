import { Card, CardColor, CardNum } from "../entities/card";

export const COLORS: Readonly<Array<CardColor>> = Object.freeze([
  "red",
  "blue",
  "black",
  "yellow",
] as const);

export const NUMS: Readonly<Array<CardNum>> = Object.freeze([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
] as const);

export const JOKER_NUM = 0;

const makeCard = (color: CardColor, num: CardNum): Card =>
  Object.freeze({
    color,
    num,
  });

export const cards = Object.freeze([
  ...COLORS.flatMap((color) =>
    NUMS.flatMap((num) => {
      return [makeCard(color, num), makeCard(color, num)];
    })
  ),
  makeCard("red", JOKER_NUM),
  makeCard("black", JOKER_NUM),
]);

export const PLAYER_STARTUP_CARD_COUNT = 14;
