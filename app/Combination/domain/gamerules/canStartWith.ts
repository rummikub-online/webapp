import type { CombinationDto } from "@/app/Combination/domain/dtos/combination";
import { cardCombinationsPoints } from "@/app/Combination/domain/gamerules/points";
import { MIN_POINTS_TO_START } from "@/app/Player/domain/constants/player";

export const canStartWithPoints = (points: number) =>
  points >= MIN_POINTS_TO_START;

export const canStartWithCombinations = (combinations: Array<CombinationDto>) =>
  canStartWithPoints(cardCombinationsPoints(combinations));
