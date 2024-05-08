import { CardListDto } from "./cardList";

export type PlayerDto = {
  id: string;
  cards: CardListDto;
  hasDrewStartupCards: boolean;
  hasStarted: boolean;
};
