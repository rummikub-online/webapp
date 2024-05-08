import { CARD_JOKER_NUMBER } from "../../constants/card";
import { indexOfFirstPlayerByDrawedCard } from "./firstToPlay";

describe("indexOfFirstPlayerByDrawedCard", () => {
  test("should return index of best card", () => {
    expect(
      indexOfFirstPlayerByDrawedCard([
        { color: "blue", num: 1 },
        { color: "blue", num: 13 },
        { color: "blue", num: 12 },
      ])
    ).toBe(1);
  });

  test("should return index of joker if present", () => {
    expect(
      indexOfFirstPlayerByDrawedCard([
        { color: "blue", num: 1 },
        { color: "blue", num: 13 },
        { color: "blue", num: CARD_JOKER_NUMBER },
      ])
    ).toBe(2);
  });

  test("should return first index of two same highest cards ", () => {
    expect(
      indexOfFirstPlayerByDrawedCard([
        { color: "blue", num: 1 },
        { color: "blue", num: 13 },
        { color: "yellow", num: 13 },
      ])
    ).toBe(1);
  });
});
