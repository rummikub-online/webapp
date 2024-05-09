import { Combination } from "./Combination";

describe("Combination", () => {
  describe("type", () => {
    test("guess Suite", () => {
      const combi = new Combination({
        cards: [
          { color: "black", number: 2 },
          { color: "black", number: 3 },
          { color: "black", number: 4 },
        ],
      });

      expect(combi.type()).toBe("suite");
    });

    test.skip("guess Serie", () => {
      const combi = new Combination({
        cards: [
          { color: "black", number: 2 },
          { color: "red", number: 2 },
          { color: "blue", number: 2 },
        ],
      });

      expect(combi.type()).toBe("serie");
    });

    test("fallback to Invalid type if not a Suite nor a Serie", () => {
      const combi = new Combination({
        cards: [
          { color: "black", number: 2 },
          { color: "black", number: 3 },
          { color: "red", number: 4 },
        ],
      });

      expect(combi.type()).toBe("invalid");
    });
  });

  describe("explode", () => {
    test("should return all cards", () => {
      const combi = new Combination({
        cards: [
          { color: "black", number: 2 },
          { color: "black", number: 3 },
          { color: "black", number: 4 },
        ],
      });

      expect(combi.explode()).toStrictEqual([
        { color: "black", number: 2 },
        { color: "black", number: 3 },
        { color: "black", number: 4 },
      ]);
    });
  });

  describe("isValid", () => {
    test("should return true when type is Suite", () => {
      const combi = new Combination({
        cards: [
          { color: "black", number: 2 },
          { color: "black", number: 3 },
          { color: "black", number: 4 },
        ],
      });

      expect(combi.isValid()).toBeTruthy();
    });

    test.skip("should return true when type is Serie", () => {
      const combi = new Combination({
        cards: [
          { color: "black", number: 2 },
          { color: "blue", number: 2 },
          { color: "yellow", number: 2 },
        ],
      });

      expect(combi.isValid()).toBeTruthy();
    });

    test("should return false when type is invalid", () => {
      const combi = new Combination({
        cards: [
          { color: "black", number: 2 },
          { color: "black", number: 3 },
          { color: "red", number: 4 },
        ],
      });

      expect(combi.isValid()).toBeFalsy();
    });
  });

  describe("splitAfter", () => {
    test("return two combinations", () => {
      const combi = new Combination({
        cards: [
          { color: "black", number: 2 },
          { color: "black", number: 3 },
          { color: "black", number: 4 },
          { color: "black", number: 5 },
        ],
      });

      const splitted = combi.splitAfter(1);

      expect(splitted).toHaveLength(2);
      expect(splitted[0].explode()).toStrictEqual([
        { color: "black", number: 2 },
        { color: "black", number: 3 },
      ]);
      expect(splitted[1].explode()).toStrictEqual([
        { color: "black", number: 4 },
        { color: "black", number: 5 },
      ]);
    });

    test("return empty combi if index is at end", () => {
      const combi = new Combination({
        cards: [
          { color: "black", number: 2 },
          { color: "black", number: 3 },
          { color: "black", number: 4 },
          { color: "black", number: 5 },
        ],
      });

      const splitted = combi.splitAfter(3);

      expect(splitted).toHaveLength(2);
      expect(splitted[0].explode()).toStrictEqual([
        { color: "black", number: 2 },
        { color: "black", number: 3 },
        { color: "black", number: 4 },
        { color: "black", number: 5 },
      ]);
      expect(splitted[1].explode()).toStrictEqual([]);
    });

    test("throw error if index is out of range", () => {
      const combi = new Combination({
        cards: [
          { color: "black", number: 2 },
          { color: "black", number: 3 },
          { color: "black", number: 4 },
          { color: "black", number: 5 },
        ],
      });

      expect(() => combi.splitAfter(-1)).toThrow(Error);
      expect(() => combi.splitAfter(4)).toThrow(Error);
    });
  });

  describe("addCardAt", () => {
    test("add card", () => {
      const combi1 = new Combination({
        cards: [
          { color: "black", number: 2 },
          { color: "black", number: 3 },
          { color: "black", number: 4 },
          { color: "black", number: 5 },
        ],
      });
      const combi2 = new Combination({
        cards: [],
      });

      combi1.addCardAt({ color: "black", number: 6 }, 4);
      combi2.addCardAt({ color: "black", number: 6 }, 0);

      expect(combi1.explode()).toStrictEqual([
        { color: "black", number: 2 },
        { color: "black", number: 3 },
        { color: "black", number: 4 },
        { color: "black", number: 5 },
        { color: "black", number: 6 },
      ]);
      expect(combi2.explode()).toStrictEqual([{ color: "black", number: 6 }]);
    });

    test("throw error if index is out of range", () => {
      const combi = new Combination({
        cards: [
          { color: "black", number: 2 },
          { color: "black", number: 3 },
          { color: "black", number: 4 },
          { color: "black", number: 5 },
        ],
      });

      expect(() => combi.addCardAt({ color: "black", number: 5 }, -1)).toThrow(
        Error
      );
      expect(() => combi.addCardAt({ color: "black", number: 5 }, 5)).toThrow(
        Error
      );
    });
  });

  describe("pickCardFrom", () => {
    test("return the card", () => {
      const combi = new Combination({
        cards: [
          { color: "black", number: 2 },
          { color: "black", number: 3 },
          { color: "black", number: 4 },
          { color: "black", number: 5 },
        ],
      });

      const pickedCard = combi.pickCardFrom(1);

      expect(pickedCard).toStrictEqual({ color: "black", number: 3 });
    });

    test("remove the card from combination", () => {
      const combi = new Combination({
        cards: [
          { color: "black", number: 2 },
          { color: "black", number: 3 },
          { color: "black", number: 4 },
          { color: "black", number: 5 },
        ],
      });

      combi.pickCardFrom(1);

      expect(combi.explode()).toStrictEqual([
        { color: "black", number: 2 },
        { color: "black", number: 4 },
        { color: "black", number: 5 },
      ]);
    });

    test("throw error if index is out of range", () => {
      const combi = new Combination({
        cards: [
          { color: "black", number: 2 },
          { color: "black", number: 3 },
          { color: "black", number: 4 },
          { color: "black", number: 5 },
        ],
      });

      expect(() => combi.pickCardFrom(-1)).toThrow(Error);
      expect(() => combi.pickCardFrom(4)).toThrow(Error);
    });
  });

  describe("toDto", () => {
    test("return corresponding dto", () => {
      const combi = new Combination({
        cards: [
          { color: "blue", number: 7 },
          { color: "blue", number: 8 },
        ],
      });

      expect(combi.toDto()).toStrictEqual({
        type: "invalid",
        cards: [
          { color: "blue", number: 7 },
          { color: "blue", number: 8 },
        ],
      });
    });
  });
});
