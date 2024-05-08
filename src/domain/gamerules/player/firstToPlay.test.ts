import { CARD_JOKER_NUMBER } from "../../constants/card";
import { indexOfFirstPlayerByDrawedCard } from "./firstToPlay";

describe("indexOfFirstPlayerByDrawedCard", () => {
  test("should return index of best card", () => {
    expect(
      indexOfFirstPlayerByDrawedCard([
        { color: "blue", number: 1 },
        { color: "blue", number: 13 },
        { color: "blue", number: 12 },
      ])
    ).toBe(1);
  });

  test("should return index of joker if present", () => {
    expect(
      indexOfFirstPlayerByDrawedCard([
        { color: "blue", number: 1 },
        { color: "blue", number: 13 },
        { color: "blue", number: CARD_JOKER_NUMBER },
      ])
    ).toBe(2);
  });

  test("should return first index of two same highest cards ", () => {
    expect(
      indexOfFirstPlayerByDrawedCard([
        { color: "blue", number: 1 },
        { color: "blue", number: 13 },
        { color: "yellow", number: 13 },
      ])
    ).toBe(1);
  });
});
