import { MIN_POINTS_TO_START } from "../../constants/player";
import { CombinationDto } from "../../dtos/combination";
import { cardCombinationsPoints } from "./points";

export const canStartWithPoints = (points: number) =>
  points >= MIN_POINTS_TO_START;

export const canStartWithCombinations = (combinations: Array<CombinationDto>) =>
  canStartWithPoints(cardCombinationsPoints(combinations));
