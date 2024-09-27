import type { CardListDto } from "@/app/Card/domain/dtos/cardList";
import { isValidCardSuite } from "@/app/CardSuite/domain/gamerules/isValid";
import { describe, expect, test } from "vitest";

describe("isValidCardSuite", () => {
  test("Returns true if suite is valid and contains 1 joker", () => {
    const cardSuite: CardListDto = [
      {
        color: "red",
        number: 1,
        duplicata: 1,
      },
      {
        color: "black",
        number: 0,
        duplicata: 1,
      },
      {
        color: "red",
        number: 3,
        duplicata: 1,
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
        duplicata: 1,
      },
      {
        color: "black",
        number: 0,
        duplicata: 1,
      },
      {
        color: "red",
        number: 0,
        duplicata: 1,
      },
      {
        color: "red",
        number: 4,
        duplicata: 1,
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
        duplicata: 1,
      },
      {
        color: "red",
        number: 8,
        duplicata: 1,
      },
      {
        color: "red",
        number: 9,
        duplicata: 1,
      },
      {
        color: "red",
        number: 10,
        duplicata: 1,
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
        duplicata: 1,
      },
      {
        color: "red",
        number: 0,
        duplicata: 1,
      },
      {
        color: "red",
        number: 9,
        duplicata: 1,
      },
      {
        color: "red",
        number: 10,
        duplicata: 1,
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
        duplicata: 1,
      },
      {
        color: "red",
        number: 9,
        duplicata: 1,
      },
      {
        color: "red",
        number: 10,
        duplicata: 1,
      },
      {
        color: "black",
        number: 0,
        duplicata: 1,
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
        duplicata: 1,
      },
      {
        color: "red",
        number: 10,
        duplicata: 1,
      },
      {
        color: "black",
        number: 0,
        duplicata: 1,
      },
      {
        color: "red",
        number: 0,
        duplicata: 1,
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
        duplicata: 1,
      },
      {
        color: "red",
        number: 2,
        duplicata: 1,
      },
      {
        color: "red",
        number: 3,
        duplicata: 1,
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
        duplicata: 1,
      },
      {
        color: "red",
        number: 2,
        duplicata: 1,
      },
      {
        color: "red",
        number: 3,
        duplicata: 1,
      },
      {
        color: "red",
        number: 4,
        duplicata: 1,
      },
      {
        color: "red",
        number: 5,
        duplicata: 1,
      },
      {
        color: "red",
        number: 6,
        duplicata: 1,
      },
      {
        color: "red",
        number: 7,
        duplicata: 1,
      },
      {
        color: "red",
        number: 8,
        duplicata: 1,
      },
      {
        color: "red",
        number: 9,
        duplicata: 1,
      },
      {
        color: "red",
        number: 10,
        duplicata: 1,
      },
      {
        color: "red",
        number: 11,
        duplicata: 1,
      },
      {
        color: "red",
        number: 12,
        duplicata: 1,
      },
      {
        color: "red",
        number: 13,
        duplicata: 1,
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
        duplicata: 1,
      },
      {
        color: "red",
        number: 2,
        duplicata: 1,
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
        duplicata: 1,
      },
      {
        color: "red",
        number: 1,
        duplicata: 1,
      },
      {
        color: "red",
        number: 2,
        duplicata: 1,
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
        duplicata: 1,
      },
      {
        color: "red",
        number: 13,
        duplicata: 1,
      },
      {
        color: "red",
        number: 0,
        duplicata: 1,
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
        duplicata: 1,
      },
      {
        color: "black",
        number: 2,
        duplicata: 1,
      },
      {
        color: "red",
        number: 3,
        duplicata: 1,
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
        duplicata: 1,
      },
      {
        color: "red",
        number: 4,
        duplicata: 1,
      },
      {
        color: "red",
        number: 3,
        duplicata: 1,
      },
    ];

    const result = isValidCardSuite(cardSuite);

    expect(result).toBe(false);
  });
});
