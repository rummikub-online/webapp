import { CARD_JOKER_NUMBER } from "@/app/Card/domain/constants/card";
import {
  cardCombinationPoints,
  cardCombinationsPoints,
} from "@/app/Combination/domain/gamerules/points";
import { describe, expect, test } from "vitest";

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
          { color: "black", number: 1, duplicata: 1 },
          { color: "black", number: 2, duplicata: 1 },
          { color: "black", number: 3, duplicata: 1 },
        ],
      })
    ).toBe(6);
  });

  test("should not count joker in sum", () => {
    expect(
      cardCombinationPoints({
        type: "serie",
        cards: [
          { color: "black", number: 1, duplicata: 1 },
          { color: "black", number: CARD_JOKER_NUMBER, duplicata: 1 },
          { color: "black", number: 3, duplicata: 1 },
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
            { color: "black", number: 1, duplicata: 1 },
            { color: "black", number: 2, duplicata: 1 },
            { color: "black", number: 3, duplicata: 1 },
          ],
        },
        {
          type: "serie",
          cards: [
            { color: "black", number: 1, duplicata: 1 },
            { color: "black", number: 2, duplicata: 1 },
            { color: "black", number: 3, duplicata: 1 },
          ],
        },
      ])
    ).toBe(12);
  });
});
