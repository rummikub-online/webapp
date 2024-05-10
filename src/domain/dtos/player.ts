import { CardListDto } from "./cardList";

export type PlayerDto = {
  id: string;
  cards: CardListDto;
  hasDrawnStartupCards: boolean;
  hasStarted: boolean;
  hasDrawnThisTurn: boolean;
  canEndTurn: boolean;
};
