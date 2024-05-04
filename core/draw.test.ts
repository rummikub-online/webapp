import { CardList } from "./card/cards";
import { drawCard, drawStartupCards } from "./draw";

const fakeDrawStackOf30Cards: CardList = Object.freeze(
  [...Array(30)].map((_) => Object.freeze({ color: "blue", num: 1 }))
);

describe("drawCard", () => {
  test("returns the first card of drawStack", () => {
    const drawStack: CardList = [
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
    const drawStack: CardList = [];

    expect(drawCard(drawStack).cards).toStrictEqual([]);
  });

  test("returns the new drawStack without drawed card", () => {
    const drawStack: CardList = [
      {
        color: "black",
        num: 2,
      },
    ];

    expect(drawCard(drawStack).drawStack).toStrictEqual([]);
  });

  test("returns new empty drawStack if drawStack is empty", () => {
    const drawStack: CardList = [];

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
