import { CardCombination } from "../../entities/cardCombination";

export const cardCombinationPoints = (combination: CardCombination) =>
  combination.reduce((points, card) => points + card.num, 0);

export const cardCombinationsPoints = (combinations: Array<CardCombination>) =>
  combinations.reduce(
    (points, combination) => points + cardCombinationPoints(combination),
    0
  );
