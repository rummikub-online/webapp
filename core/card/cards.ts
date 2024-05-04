const COLORS = Object.freeze(["red", "blue", "black", "yellow"] as const);
const NUMS = Object.freeze([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
] as const);
export const JOKER_NUM = 0;

export type CardColor = (typeof COLORS)[number];
export type CardNum = (typeof NUMS)[number] | typeof JOKER_NUM;
export type Card = Readonly<{
  color: CardColor;
  num: CardNum;
}>;
export type CardList = readonly Card[];

export const isJoker = (card: Card) => {
  return card.num === JOKER_NUM;
};

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
