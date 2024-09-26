import type { CombinationDto } from "@/app/Combination/dtos/combination";

export type GameBoardDto = {
  isValid: boolean;
  combinations: Array<CombinationDto>;
  hasModifications: boolean;
};
