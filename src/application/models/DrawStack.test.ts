import { DrawStack } from "./DrawStack";

describe("DrawStack", () => {
  describe("drawCard", () => {
    test("return the first card", () => {
      const drawStack = new DrawStack({
        cards: [
          { color: "blue", number: 7 },
          { color: "blue", number: 6 },
        ],
      });

      const drawedCard = drawStack.drawCard();

      expect(drawedCard).toStrictEqual({ color: "blue", number: 7 });
    });

    test("remove the drawed card from the stack", () => {
      const drawStack = new DrawStack({
        cards: [{ color: "blue", number: 7 }],
      });

      drawStack.drawCard();

      expect(drawStack.isEmpty()).toBeTruthy();
    });

    test("throw error if no more cards", () => {
      const drawStack = new DrawStack({
        cards: [],
      });

      expect(() => drawStack.drawCard()).toThrow(Error);
    });
  });

  describe("putBack", () => {
    test("add the card to beginning of the stack", () => {
      const drawStack = new DrawStack({
        cards: [
          { color: "blue", number: 7 },
          { color: "blue", number: 6 },
        ],
      });

      drawStack.putBack({ color: "blue", number: 9 });

      expect(drawStack.drawCard()).toStrictEqual({ color: "blue", number: 9 });
    });
  });

  describe("drawStartupCards", () => {
    test("return the first 14th cards", () => {
      const drawStack = new DrawStack({
        cards: [
          { color: "blue", number: 0 },
          { color: "blue", number: 1 },
          { color: "blue", number: 2 },
          { color: "blue", number: 3 },
          { color: "blue", number: 4 },
          { color: "blue", number: 5 },
          { color: "blue", number: 6 },
          { color: "blue", number: 7 },
          { color: "blue", number: 8 },
          { color: "blue", number: 9 },
          { color: "blue", number: 10 },
          { color: "blue", number: 11 },
          { color: "blue", number: 12 },
          { color: "blue", number: 13 },
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
        cards: [{ color: "blue", number: 7 }],
      });

      expect(drawStack.isEmpty()).toBeFalsy();
    });
  });

  describe("toDto", () => {
    test("return corresponding dto", () => {
      const drawStack = new DrawStack({
        cards: [{ color: "blue", number: 7 }],
      });

      expect(drawStack.toDto()).toStrictEqual({
        isEmpty: false,
      });
    });
  });
});
