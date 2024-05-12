import { CARD_JOKER_NUMBER } from "../../constants/card";
import { cardCombinationPoints, cardCombinationsPoints } from "./points";

describe("cardCombinationPoints", () => {
  test("should return 0 points for empty combination", () => {
    expect(
      cardCombinationPoints({
        type: "invalid",
        cards: [],
      })
    ).toBe(0);
  });

  test("should return sum of number of each card", () => {
    expect(
      cardCombinationPoints({
        type: "serie",
        cards: [
          { color: "black", number: 1 },
          { color: "black", number: 2 },
          { color: "black", number: 3 },
        ],
      })
    ).toBe(6);
  });

  test("should not count joker in sum", () => {
    expect(
      cardCombinationPoints({
        type: "serie",
        cards: [
          { color: "black", number: 1 },
          { color: "black", number: CARD_JOKER_NUMBER },
          { color: "black", number: 3 },
        ],
      })
    ).toBe(4);
  });
});

describe("cardCombinationsPoints", () => {
  test("should return 0 points if no combinations", () => {
    expect(cardCombinationsPoints([])).toBe(0);
  });

  test("should return sum of number of each card", () => {
    expect(
      cardCombinationsPoints([
        {
          type: "serie",
          cards: [
            { color: "black", number: 1 },
            { color: "black", number: 2 },
            { color: "black", number: 3 },
          ],
        },
        {
          type: "serie",
          cards: [
            { color: "black", number: 1 },
            { color: "black", number: 2 },
            { color: "black", number: 3 },
          ],
        },
      ])
    ).toBe(12);
  });
});
