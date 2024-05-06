import { CardCombinationDto } from "../../dtos/cardCombination";

export const cardCombinationPoints = (combination: CardCombinationDto) =>
  combination.reduce((points, card) => points + card.num, 0);

export const cardCombinationsPoints = (
  combinations: Array<CardCombinationDto>
) =>
  combinations.reduce(
    (points, combination) => points + cardCombinationPoints(combination),
    0
  );
