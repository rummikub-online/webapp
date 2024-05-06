import { CardCombinationDto } from "./cardCombination";

export type PlayerDto = {
  id: string;
  cards: CardCombinationDto;
  hasDrewStartupCards: boolean;
};
