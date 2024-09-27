import type { CombinationDto } from "@/app/Combination/domain/dtos/combination";

export const cardCombinationPoints = (combination: CombinationDto) =>
  combination.cards.reduce((points, card) => points + card.number, 0);

export const cardCombinationsPoints = (combinations: Array<CombinationDto>) =>
  combinations.reduce(
    (points, combination) => points + cardCombinationPoints(combination),
    0
  );
