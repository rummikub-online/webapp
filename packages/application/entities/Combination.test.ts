import { Combination } from "./Combination";

describe("Combination", () => {
  describe("type", () => {
    test("guess Suite", () => {
      const combi = new Combination({
        cards: [
          { color: "black", number: 2, duplicata: 1 },
          { color: "black", number: 3, duplicata: 1 },
          { color: "black", number: 4, duplicata: 1 },
        ],
      });

      expect(combi.type()).toBe("suite");
    });

    test.skip("guess Serie", () => {
      const combi = new Combination({
        cards: [
          { color: "black", number: 2, duplicata: 1 },
          { color: "red", number: 2, duplicata: 1 },
          { color: "blue", number: 2, duplicata: 1 },
        ],
      });

      expect(combi.type()).toBe("serie");
    });

    test("fallback to Invalid type if not a Suite nor a Serie", () => {
      const combi = new Combination({
        cards: [
          { color: "black", number: 2, duplicata: 1 },
          { color: "black", number: 3, duplicata: 1 },
          { color: "red", number: 4, duplicata: 1 },
        ],
      });

      expect(combi.type()).toBe("invalid");
    });
  });

  describe("explode", () => {
    test("should return all cards", () => {
      const combi = new Combination({
        cards: [
          { color: "black", number: 2, duplicata: 1 },
          { color: "black", number: 3, duplicata: 1 },
          { color: "black", number: 4, duplicata: 1 },
        ],
      });

      expect(combi.explode()).toStrictEqual([
        { color: "black", number: 2, duplicata: 1 },
        { color: "black", number: 3, duplicata: 1 },
        { color: "black", number: 4, duplicata: 1 },
      ]);
    });
  });

  describe("isValid", () => {
    test("should return true when type is Suite", () => {
      const combi = new Combination({
        cards: [
          { color: "black", number: 2, duplicata: 1 },
          { color: "black", number: 3, duplicata: 1 },
          { color: "black", number: 4, duplicata: 1 },
        ],
      });

      expect(combi.isValid()).toBeTruthy();
    });

    test.skip("should return true when type is Serie", () => {
      const combi = new Combination({
        cards: [
          { color: "black", number: 2, duplicata: 1 },
          { color: "blue", number: 2, duplicata: 1 },
          { color: "yellow", number: 2, duplicata: 1 },
        ],
      });

      expect(combi.isValid()).toBeTruthy();
    });

    test("should return false when type is invalid", () => {
      const combi = new Combination({
        cards: [
          { color: "black", number: 2, duplicata: 1 },
          { color: "black", number: 3, duplicata: 1 },
          { color: "red", number: 4, duplicata: 1 },
        ],
      });

      expect(combi.isValid()).toBeFalsy();
    });
  });

  describe("splitAfter", () => {
    test("return two combinations", () => {
      const combi = new Combination({
        cards: [
          { color: "black", number: 2, duplicata: 1 },
          { color: "black", number: 3, duplicata: 1 },
          { color: "black", number: 4, duplicata: 1 },
          { color: "black", number: 5, duplicata: 1 },
        ],
      });

      const splitted = combi.splitAfter(1);

      expect(splitted).toHaveLength(2);
      expect(splitted[0].explode()).toStrictEqual([
        { color: "black", number: 2, duplicata: 1 },
        { color: "black", number: 3, duplicata: 1 },
      ]);
      expect(splitted[1].explode()).toStrictEqual([
        { color: "black", number: 4, duplicata: 1 },
        { color: "black", number: 5, duplicata: 1 },
      ]);
    });

    test("return empty combi if index is at end", () => {
      const combi = new Combination({
        cards: [
          { color: "black", number: 2, duplicata: 1 },
          { color: "black", number: 3, duplicata: 1 },
          { color: "black", number: 4, duplicata: 1 },
          { color: "black", number: 5, duplicata: 1 },
        ],
      });

      const splitted = combi.splitAfter(3);

      expect(splitted).toHaveLength(2);
      expect(splitted[0].explode()).toStrictEqual([
        { color: "black", number: 2, duplicata: 1 },
        { color: "black", number: 3, duplicata: 1 },
        { color: "black", number: 4, duplicata: 1 },
        { color: "black", number: 5, duplicata: 1 },
      ]);
      expect(splitted[1].explode()).toStrictEqual([]);
    });

    test("throw error if index is out of range", () => {
      const combi = new Combination({
        cards: [
          { color: "black", number: 2, duplicata: 1 },
          { color: "black", number: 3, duplicata: 1 },
          { color: "black", number: 4, duplicata: 1 },
          { color: "black", number: 5, duplicata: 1 },
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
          { color: "black", number: 2, duplicata: 1 },
          { color: "black", number: 3, duplicata: 1 },
          { color: "black", number: 4, duplicata: 1 },
          { color: "black", number: 5, duplicata: 1 },
        ],
      });
      const combi2 = new Combination({
        cards: [],
      });

      combi1.addCardAt({ color: "black", number: 6, duplicata: 1 }, 4);
      combi2.addCardAt({ color: "black", number: 6, duplicata: 1 }, 0);

      expect(combi1.explode()).toStrictEqual([
        { color: "black", number: 2, duplicata: 1 },
        { color: "black", number: 3, duplicata: 1 },
        { color: "black", number: 4, duplicata: 1 },
        { color: "black", number: 5, duplicata: 1 },
        { color: "black", number: 6, duplicata: 1 },
      ]);
      expect(combi2.explode()).toStrictEqual([
        { color: "black", number: 6, duplicata: 1 },
      ]);
    });

    test("throw error if index is out of range", () => {
      const combi = new Combination({
        cards: [
          { color: "black", number: 2, duplicata: 1 },
          { color: "black", number: 3, duplicata: 1 },
          { color: "black", number: 4, duplicata: 1 },
          { color: "black", number: 5, duplicata: 1 },
        ],
      });

      expect(() =>
        combi.addCardAt({ color: "black", number: 5, duplicata: 1 }, -1),
      ).toThrow(Error);
      expect(() =>
        combi.addCardAt({ color: "black", number: 5, duplicata: 1 }, 5),
      ).toThrow(Error);
    });
  });

  describe("pickCardFrom", () => {
    test("return the card", () => {
      const combi = new Combination({
        cards: [
          { color: "black", number: 2, duplicata: 1 },
          { color: "black", number: 3, duplicata: 1 },
          { color: "black", number: 4, duplicata: 1 },
          { color: "black", number: 5, duplicata: 1 },
        ],
      });

      const pickedCard = combi.pickCardFrom(1);

      expect(pickedCard).toStrictEqual({
        color: "black",
        number: 3,
        duplicata: 1,
      });
    });

    test("remove the card from combination", () => {
      const combi = new Combination({
        cards: [
          { color: "black", number: 2, duplicata: 1 },
          { color: "black", number: 3, duplicata: 1 },
          { color: "black", number: 4, duplicata: 1 },
          { color: "black", number: 5, duplicata: 1 },
        ],
      });

      combi.pickCardFrom(1);

      expect(combi.explode()).toStrictEqual([
        { color: "black", number: 2, duplicata: 1 },
        { color: "black", number: 4, duplicata: 1 },
        { color: "black", number: 5, duplicata: 1 },
      ]);
    });

    test("throw error if index is out of range", () => {
      const combi = new Combination({
        cards: [
          { color: "black", number: 2, duplicata: 1 },
          { color: "black", number: 3, duplicata: 1 },
          { color: "black", number: 4, duplicata: 1 },
          { color: "black", number: 5, duplicata: 1 },
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
          { color: "blue", number: 7, duplicata: 1 },
          { color: "blue", number: 8, duplicata: 1 },
        ],
      });

      expect(combi.toDto()).toStrictEqual({
        type: "invalid",
        cards: [
          { color: "blue", number: 7, duplicata: 1 },
          { color: "blue", number: 8, duplicata: 1 },
        ],
      });
    });
  });
});
