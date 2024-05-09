import { CombinationDto } from "./combination";

export type GameBoardDto = {
  isValid: boolean;
  combinations: Array<CombinationDto>;
};
