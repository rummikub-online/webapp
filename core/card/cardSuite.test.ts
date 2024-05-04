import { CardList } from "./cards";
import { isValidCardSuite } from "./cardSuite";

describe("isValidCardSuite", () => {
  test("Returns true if suite is valid and contains 1 joker", () => {
    const cardSuite: CardList = [
      {
        color: "red",
        num: 1,
      },
      {
        color: "black",
        num: 0,
      },
      {
        color: "red",
        num: 3,
      },
    ];

    const result = isValidCardSuite(cardSuite);

    expect(result).toBe(true);
  });

  test("Returns true if suite is valid and contains 2 jokers", () => {
    const cardSuite: CardList = [
      {
        color: "red",
        num: 1,
      },
      {
        color: "black",
        num: 0,
      },
      {
        color: "red",
        num: 0,
      },
      {
        color: "red",
        num: 4,
      },
    ];

    const result = isValidCardSuite(cardSuite);

    expect(result).toBe(true);
  });

  test("Returns true if suite is valid and starts with 1 joker", () => {
    const cardSuite: CardList = [
      {
        color: "black",
        num: 0,
      },
      {
        color: "red",
        num: 8,
      },
      {
        color: "red",
        num: 9,
      },
      {
        color: "red",
        num: 10,
      },
    ];

    const result = isValidCardSuite(cardSuite);

    expect(result).toBe(true);
  });

  test("Returns true if suite is valid and starts with 2 jokers", () => {
    const cardSuite: CardList = [
      {
        color: "black",
        num: 0,
      },
      {
        color: "red",
        num: 0,
      },
      {
        color: "red",
        num: 9,
      },
      {
        color: "red",
        num: 10,
      },
    ];

    const result = isValidCardSuite(cardSuite);

    expect(result).toBe(true);
  });

  test("Returns true if suite is valid and ends with 1 joker", () => {
    const cardSuite: CardList = [
      {
        color: "red",
        num: 8,
      },
      {
        color: "red",
        num: 9,
      },
      {
        color: "red",
        num: 10,
      },
      {
        color: "black",
        num: 0,
      },
    ];

    const result = isValidCardSuite(cardSuite);

    expect(result).toBe(true);
  });

  test("Returns true if suite is valid and ends with 2 jokers", () => {
    const cardSuite: CardList = [
      {
        color: "red",
        num: 9,
      },
      {
        color: "red",
        num: 10,
      },
      {
        color: "black",
        num: 0,
      },
      {
        color: "red",
        num: 0,
      },
    ];

    const result = isValidCardSuite(cardSuite);

    expect(result).toBe(true);
  });

  test("Returns true if suite is minimum and valid", () => {
    const cardSuite: CardList = [
      {
        color: "red",
        num: 1,
      },
      {
        color: "red",
        num: 2,
      },
      {
        color: "red",
        num: 3,
      },
    ];

    const result = isValidCardSuite(cardSuite);

    expect(result).toBe(true);
  });

  test("Returns true if suite is maximum and valid", () => {
    const cardSuite: CardList = [
      {
        color: "red",
        num: 1,
      },
      {
        color: "red",
        num: 2,
      },
      {
        color: "red",
        num: 3,
      },
      {
        color: "red",
        num: 4,
      },
      {
        color: "red",
        num: 5,
      },
      {
        color: "red",
        num: 6,
      },
      {
        color: "red",
        num: 7,
      },
      {
        color: "red",
        num: 8,
      },
      {
        color: "red",
        num: 9,
      },
      {
        color: "red",
        num: 10,
      },
      {
        color: "red",
        num: 11,
      },
      {
        color: "red",
        num: 12,
      },
      {
        color: "red",
        num: 13,
      },
    ];

    const result = isValidCardSuite(cardSuite);

    expect(result).toBe(true);
  });

  test("Returns false if suite is too short", () => {
    const cardSuite: CardList = [
      {
        color: "red",
        num: 1,
      },
      {
        color: "red",
        num: 2,
      },
    ];

    const result = isValidCardSuite(cardSuite);

    expect(result).toBe(false);
  });

  test("Returns false if suite starts before 1", () => {
    const cardSuite: CardList = [
      {
        color: "red",
        num: 0,
      },
      {
        color: "red",
        num: 1,
      },
      {
        color: "red",
        num: 2,
      },
    ];

    const result = isValidCardSuite(cardSuite);

    expect(result).toBe(false);
  });

  test("Returns false if suite ends after 13", () => {
    const cardSuite: CardList = [
      {
        color: "red",
        num: 12,
      },
      {
        color: "red",
        num: 13,
      },
      {
        color: "red",
        num: 0,
      },
    ];

    const result = isValidCardSuite(cardSuite);

    expect(result).toBe(false);
  });

  test("Returns false if suite has different colors", () => {
    const cardSuite: CardList = [
      {
        color: "red",
        num: 1,
      },
      {
        color: "black",
        num: 2,
      },
      {
        color: "red",
        num: 3,
      },
    ];

    const result = isValidCardSuite(cardSuite);

    expect(result).toBe(false);
  });

  test("Returns false numbers are not following", () => {
    const cardSuite: CardList = [
      {
        color: "red",
        num: 1,
      },
      {
        color: "red",
        num: 4,
      },
      {
        color: "red",
        num: 3,
      },
    ];

    const result = isValidCardSuite(cardSuite);

    expect(result).toBe(false);
  });
});
