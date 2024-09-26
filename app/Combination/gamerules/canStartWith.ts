import type { CombinationDto } from "@/app/Combination/dtos/combination";
import { cardCombinationsPoints } from "@/app/Combination/gamerules/points";
import { MIN_POINTS_TO_START } from "@/app/Player/constants/player";

export const canStartWithPoints = (points: number) =>
  points >= MIN_POINTS_TO_START;

export const canStartWithCombinations = (combinations: Array<CombinationDto>) =>
  canStartWithPoints(cardCombinationsPoints(combinations));
