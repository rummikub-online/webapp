import { CardListDto } from "../../dtos/cardList";
import { isValidCardSuite } from "./isValid";

describe("isValidCardSuite", () => {
  test("Returns true if suite is valid and contains 1 joker", () => {
    const cardSuite: CardListDto = [
      {
        color: "red",
        number: 1,
      },
      {
        color: "black",
        number: 0,
      },
      {
        color: "red",
        number: 3,
      },
    ];

    const result = isValidCardSuite(cardSuite);

    expect(result).toBe(true);
  });

  test("Returns true if suite is valid and contains 2 jokers", () => {
    const cardSuite: CardListDto = [
      {
        color: "red",
        number: 1,
      },
      {
        color: "black",
        number: 0,
      },
      {
        color: "red",
        number: 0,
      },
      {
        color: "red",
        number: 4,
      },
    ];

    const result = isValidCardSuite(cardSuite);

    expect(result).toBe(true);
  });

  test("Returns true if suite is valid and starts with 1 joker", () => {
    const cardSuite: CardListDto = [
      {
        color: "black",
        number: 0,
      },
      {
        color: "red",
        number: 8,
      },
      {
        color: "red",
        number: 9,
      },
      {
        color: "red",
        number: 10,
      },
    ];

    const result = isValidCardSuite(cardSuite);

    expect(result).toBe(true);
  });

  test("Returns true if suite is valid and starts with 2 jokers", () => {
    const cardSuite: CardListDto = [
      {
        color: "black",
        number: 0,
      },
      {
        color: "red",
        number: 0,
      },
      {
        color: "red",
        number: 9,
      },
      {
        color: "red",
        number: 10,
      },
    ];

    const result = isValidCardSuite(cardSuite);

    expect(result).toBe(true);
  });

  test("Returns true if suite is valid and ends with 1 joker", () => {
    const cardSuite: CardListDto = [
      {
        color: "red",
        number: 8,
      },
      {
        color: "red",
        number: 9,
      },
      {
        color: "red",
        number: 10,
      },
      {
        color: "black",
        number: 0,
      },
    ];

    const result = isValidCardSuite(cardSuite);

    expect(result).toBe(true);
  });

  test("Returns true if suite is valid and ends with 2 jokers", () => {
    const cardSuite: CardListDto = [
      {
        color: "red",
        number: 9,
      },
      {
        color: "red",
        number: 10,
      },
      {
        color: "black",
        number: 0,
      },
      {
        color: "red",
        number: 0,
      },
    ];

    const result = isValidCardSuite(cardSuite);

    expect(result).toBe(true);
  });

  test("Returns true if suite is minimum and valid", () => {
    const cardSuite: CardListDto = [
      {
        color: "red",
        number: 1,
      },
      {
        color: "red",
        number: 2,
      },
      {
        color: "red",
        number: 3,
      },
    ];

    const result = isValidCardSuite(cardSuite);

    expect(result).toBe(true);
  });

  test("Returns true if suite is maximum and valid", () => {
    const cardSuite: CardListDto = [
      {
        color: "red",
        number: 1,
      },
      {
        color: "red",
        number: 2,
      },
      {
        color: "red",
        number: 3,
      },
      {
        color: "red",
        number: 4,
      },
      {
        color: "red",
        number: 5,
      },
      {
        color: "red",
        number: 6,
      },
      {
        color: "red",
        number: 7,
      },
      {
        color: "red",
        number: 8,
      },
      {
        color: "red",
        number: 9,
      },
      {
        color: "red",
        number: 10,
      },
      {
        color: "red",
        number: 11,
      },
      {
        color: "red",
        number: 12,
      },
      {
        color: "red",
        number: 13,
      },
    ];

    const result = isValidCardSuite(cardSuite);

    expect(result).toBe(true);
  });

  test("Returns false if suite is too short", () => {
    const cardSuite: CardListDto = [
      {
        color: "red",
        number: 1,
      },
      {
        color: "red",
        number: 2,
      },
    ];

    const result = isValidCardSuite(cardSuite);

    expect(result).toBe(false);
  });

  test("Returns false if suite starts before 1", () => {
    const cardSuite: CardListDto = [
      {
        color: "red",
        number: 0,
      },
      {
        color: "red",
        number: 1,
      },
      {
        color: "red",
        number: 2,
      },
    ];

    const result = isValidCardSuite(cardSuite);

    expect(result).toBe(false);
  });

  test("Returns false if suite ends after 13", () => {
    const cardSuite: CardListDto = [
      {
        color: "red",
        number: 12,
      },
      {
        color: "red",
        number: 13,
      },
      {
        color: "red",
        number: 0,
      },
    ];

    const result = isValidCardSuite(cardSuite);

    expect(result).toBe(false);
  });

  test("Returns false if suite has different colors", () => {
    const cardSuite: CardListDto = [
      {
        color: "red",
        number: 1,
      },
      {
        color: "black",
        number: 2,
      },
      {
        color: "red",
        number: 3,
      },
    ];

    const result = isValidCardSuite(cardSuite);

    expect(result).toBe(false);
  });

  test("Returns false numbers are not following", () => {
    const cardSuite: CardListDto = [
      {
        color: "red",
        number: 1,
      },
      {
        color: "red",
        number: 4,
      },
      {
        color: "red",
        number: 3,
      },
    ];

    const result = isValidCardSuite(cardSuite);

    expect(result).toBe(false);
  });
});
