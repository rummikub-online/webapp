import { CardListDto } from "./cardList";

export type PlayerDto = {
  id: string;
  username?: string;
  cards: CardListDto;
  hasDrawnStartupCards: boolean;
  hasStarted: boolean;
  hasDrawnThisTurn: boolean;
  canDrawCard: boolean;
  canPlaceCardAlone: boolean;
  canPlaceCardInCombination: boolean;
  canMoveCardAlone: boolean;
  canMoveCardToCombination: boolean;
  canCancelTurnModifications: boolean;
  canEndTurn: boolean;
};
