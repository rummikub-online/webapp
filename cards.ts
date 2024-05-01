const colors = Object.freeze(["red", "blue", "black", "yellow"] as const);
const nums = Object.freeze([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
] as const);
const jokerNum = 0;

export type CardColor = (typeof colors)[number];
export type CardNum = (typeof nums)[number] | typeof jokerNum;
export type Card = {
  color: CardColor;
  num: CardNum;
};

function makeCard(color: CardColor, num: CardNum): Card {
  return Object.freeze({
    color,
    num,
  });
}

export const cards = Object.freeze([
  ...colors.flatMap((color) =>
    nums.flatMap((num) => {
      return [makeCard(color, num), makeCard(color, num)];
    })
  ),
  makeCard("red", jokerNum),
  makeCard("black", jokerNum),
]);
