import { MIN_POINTS_TO_START } from "../../constants/player";
import { CardCombinationDto } from "../../dtos/cardCombination";
import { cardCombinationsPoints } from "./points";

export const canStartWithPoints = (points: number) =>
  points >= MIN_POINTS_TO_START;

export const canStartWithCardCombinations = (
  combinations: Array<CardCombinationDto>
) => canStartWithPoints(cardCombinationsPoints(combinations));
