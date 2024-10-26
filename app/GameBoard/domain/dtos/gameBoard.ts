import type { CombinationDto } from "@/app/Combination/domain/dtos/combination";

export type GameBoardDto = {
  isValid: boolean;
  combinations: Array<CombinationDto>;
  hasModifications: boolean;
  points: number;
};
