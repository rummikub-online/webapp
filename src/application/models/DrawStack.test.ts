import { DrawStack } from "./DrawStack";

describe("DrawStack", () => {
  describe("drawCard", () => {
    test("draw return the first card", () => {
      const drawStack = new DrawStack({
        cards: [
          { color: "blue", num: 7 },
          { color: "blue", num: 6 },
        ],
      });

      const drawedCard = drawStack.drawCard();

      expect(drawedCard).toStrictEqual({ color: "blue", num: 7 });
    });

    test("return the first card", () => {
      const drawStack = new DrawStack({
        cards: [
          { color: "blue", num: 7 },
          { color: "blue", num: 6 },
        ],
      });

      const drawedCard = drawStack.drawCard();

      expect(drawedCard).toStrictEqual({ color: "blue", num: 7 });
    });

    test("throw error if not more cards", () => {
      const drawStack = new DrawStack({
        cards: [],
      });

      expect(() => drawStack.drawCard()).toThrow(Error);
    });

    test("draw card remove it from stack", () => {
      const drawStack = new DrawStack({
        cards: [{ color: "blue", num: 7 }],
      });

      drawStack.drawCard();

      expect(drawStack.isEmpty()).toBeTruthy();
    });
  });

  describe("drawStartupCards", () => {
    test("draw return the first 14th cards", () => {
      const drawStack = new DrawStack({
        cards: [
          { color: "blue", num: 0 },
          { color: "blue", num: 1 },
          { color: "blue", num: 2 },
          { color: "blue", num: 3 },
          { color: "blue", num: 4 },
          { color: "blue", num: 5 },
          { color: "blue", num: 6 },
          { color: "blue", num: 7 },
          { color: "blue", num: 8 },
          { color: "blue", num: 9 },
          { color: "blue", num: 10 },
          { color: "blue", num: 11 },
          { color: "blue", num: 12 },
          { color: "blue", num: 13 },
        ],
      });

      const drawedCards = drawStack.drawStartupCards();

      expect(drawedCards).toHaveLength(14);
      expect(drawStack.isEmpty()).toBeTruthy();
    });
  });

  describe("isEmpty", () => {
    test("return true when empty", () => {
      const drawStack = new DrawStack({
        cards: [],
      });

      expect(drawStack.isEmpty()).toBeTruthy();
    });

    test("return false when not empty", () => {
      const drawStack = new DrawStack({
        cards: [{ color: "blue", num: 7 }],
      });

      expect(drawStack.isEmpty()).toBeFalsy();
    });
  });

  describe("toDto", () => {
    test("return corresponding dto", () => {
      const drawStack = new DrawStack({
        cards: [{ color: "blue", num: 7 }],
      });

      expect(drawStack.toDto()).toStrictEqual({
        isEmpty: false,
      });
    });
  });
});
