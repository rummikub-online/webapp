import { CardListDto } from "../../dtos/cardList";
import { isValidCardSerie } from "./isValid";

describe("isValidCardSerie", () => {
  test("Return true if serie is valid and contains the minimum of cards (3 cards)", () => {
    const cardSerie: CardListDto = [
      {
        color: "blue",
        number: 7,
        duplicata: 1,
      },
      {
        color: "yellow",
        number: 7,
        duplicata: 1,
      },
      {
        color: "red",
        number: 7,
        duplicata: 1,
      },
    ];

    const result = isValidCardSerie(cardSerie);

    expect(result).toBe(true);
  });
  test("Return true if serie is valid and contains the maximum of cards (4 cards)", () => {
    const cardSerie: CardListDto = [
      {
        color: "blue",
        number: 7,
        duplicata: 1,
      },
      {
        color: "yellow",
        number: 7,
        duplicata: 1,
      },
      {
        color: "red",
        number: 7,
        duplicata: 1,
      },
      {
        color: "black",
        number: 7,
        duplicata: 1,
      },
    ];

    const result = isValidCardSerie(cardSerie);

    expect(result).toBe(true);
  });
  test("Return true if serie is valid and starts with 1 joker", () => {
    const cardSerie: CardListDto = [
      {
        color: "black",
        number: 0,
        duplicata: 1,
      },
      {
        color: "yellow",
        number: 7,
        duplicata: 1,
      },
      {
        color: "red",
        number: 7,
        duplicata: 1,
      },
    ];

    const result = isValidCardSerie(cardSerie);

    expect(result).toBe(true);
  });
  test("Return true if serie is valid and ends with 1 joker", () => {
    const cardSerie: CardListDto = [
      {
        color: "blue",
        number: 7,
        duplicata: 1,
      },
      {
        color: "yellow",
        number: 7,
        duplicata: 1,
      },
      {
        color: "red",
        number: 0,
        duplicata: 1,
      },
    ];

    const result = isValidCardSerie(cardSerie);

    expect(result).toBe(true);
  });
  test("Return true if serie is valid and contains 2 jokers", () => {
    const cardSerie: CardListDto = [
      {
        color: "blue",
        number: 7,
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
        color: "yellow",
        number: 7,
        duplicata: 1,
      },
    ];

    const result = isValidCardSerie(cardSerie);

    expect(result).toBe(true);
  });
  test("Return true if serie is valid and contains 1 joker with the same color as a card", () => {
    const cardSerie: CardListDto = [
      {
        color: "blue",
        number: 7,
        duplicata: 1,
      },
      {
        color: "yellow",
        number: 7,
        duplicata: 1,
      },
      {
        color: "red",
        number: 7,
        duplicata: 1,
      },
      {
        color: "red",
        number: 0,
        duplicata: 1,
      },
    ];

    const result = isValidCardSerie(cardSerie);

    expect(result).toBe(true);
  });
  test("Return false if serie is too short (2 cards)", () => {
    const cardSerie: CardListDto = [
      {
        color: "blue",
        number: 7,
        duplicata: 1,
      },
      {
        color: "yellow",
        number: 7,
        duplicata: 1,
      },
    ];

    const result = isValidCardSerie(cardSerie);

    expect(result).toBe(false);
  });
  test("Return false if serie contains 2 same card", () => {
    const cardSerie: CardListDto = [
      {
        color: "blue",
        number: 7,
        duplicata: 1,
      },
      {
        color: "yellow",
        number: 7,
        duplicata: 1,
      },
      {
        color: "yellow",
        number: 7,
        duplicata: 1,
      },
      {
        color: "black",
        number: 7,
        duplicata: 1,
      },
    ];

    const result = isValidCardSerie(cardSerie);

    expect(result).toBe(false);
  });
  test("Return false if serie dont contains the same number", () => {
    const cardSerie: CardListDto = [
      {
        color: "blue",
        number: 7,
        duplicata: 1,
      },
      {
        color: "yellow",
        number: 6,
        duplicata: 1,
      },
      {
        color: "red",
        number: 7,
        duplicata: 1,
      },
    ];

    const result = isValidCardSerie(cardSerie);

    expect(result).toBe(false);
  });
  test("Return false if serie contains too many cards", () => {
    const cardSerie: CardListDto = [
      {
        color: "blue",
        number: 7,
        duplicata: 1,
      },
      {
        color: "yellow",
        number: 7,
        duplicata: 1,
      },
      {
        color: "red",
        number: 7,
        duplicata: 1,
      },
      {
        color: "black",
        number: 7,
        duplicata: 1,
      },
      {
        color: "black",
        number: 0,
        duplicata: 1,
      },
    ];

    const result = isValidCardSerie(cardSerie);

    expect(result).toBe(false);
  });
});
