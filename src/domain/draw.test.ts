import { drawCard, drawStartupCards } from "./draw";
import { CardCombination } from "./entities/cardCombination";

const fakeDrawStackOf30Cards: CardCombination = Object.freeze(
  [...Array(30)].map((_) => Object.freeze({ color: "blue", num: 1 }))
);

describe("drawCard", () => {
  test("returns the first card of drawStack", () => {
    const drawStack: CardCombination = [
      {
        color: "black",
        num: 2,
      },
    ];

    expect(drawCard(drawStack).cards).toStrictEqual([
      {
        color: "black",
        num: 2,
      },
    ]);
  });

  test("returns empty cards if drawStack is empty", () => {
    const drawStack: CardCombination = [];

    expect(drawCard(drawStack).cards).toStrictEqual([]);
  });

  test("returns the new drawStack without drawed card", () => {
    const drawStack: CardCombination = [
      {
        color: "black",
        num: 2,
      },
    ];

    expect(drawCard(drawStack).drawStack).toStrictEqual([]);
  });

  test("returns new empty drawStack if drawStack is empty", () => {
    const drawStack: CardCombination = [];

    expect(drawCard(drawStack).drawStack).toStrictEqual([]);
  });
});

describe("drawStartupCards", () => {
  test("returns 14 first cards from the drawStack", () => {
    const draw = drawStartupCards(fakeDrawStackOf30Cards);

    expect(draw.cards).toHaveLength(14);
  });

  test("returns new drawStack without 14 drawed cards", () => {
    const draw = drawStartupCards(fakeDrawStackOf30Cards);

    expect(draw.drawStack).toHaveLength(16);
  });
});
