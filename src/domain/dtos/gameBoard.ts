import { CardCombinationDto } from "./cardCombination";

export type GameBoardDto = {
  isValid: boolean;
  combinations: Array<CardCombinationDto>;
};
