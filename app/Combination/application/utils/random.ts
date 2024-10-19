import { CARD_COLORS, CARD_NUMBERS } from "@/app/Card/domain/constants/card";
import { type CardDto } from "@/app/Card/domain/dtos/card";
import { Combination } from "@/app/Combination/application/Combination";
import {
  SUITE_MAX_CARDS_COUNT,
  SUITE_MIN_CARDS_COUNT,
} from "@/app/Combination/domain/constants/cardSuite";
import { randomElement } from "@/app/Utils/array";
import { randomInt } from "@/app/Utils/number";

export const randomSuite = (): Combination => {
  const startNumberIndex = randomInt(
    0,
    CARD_NUMBERS.length - 1 - SUITE_MIN_CARDS_COUNT,
  );

  const length = randomInt(
    SUITE_MIN_CARDS_COUNT,
    SUITE_MAX_CARDS_COUNT - startNumberIndex,
  );
  const color = randomElement([...CARD_COLORS]);

  const cards: Array<CardDto> = [];
  for (let i = startNumberIndex; i < startNumberIndex + length; i++) {
    cards.push({
      color,
      number: CARD_NUMBERS[i],
      duplicata: 1,
    });
  }

  return new Combination({ cards });
};

export const randomSerie = (): Combination => {
  const number = randomElement([...CARD_NUMBERS]);

  const cards: Array<CardDto> = CARD_COLORS.map((color) => ({
    number,
    color,
    duplicata: 1,
  }));

  return new Combination({ cards });
};

export const randomCombination = () =>
  randomInt(0, 1) === 1 ? randomSuite() : randomSerie();
