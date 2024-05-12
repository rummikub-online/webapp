import { CardListDto } from "./cardList";

export type PlayerDto = {
  id: string;
  username?: string;
  admin: boolean;
  cards: CardListDto;
  isPlaying: boolean;
  hasDrawnStartupCards: boolean;
  hasStarted: boolean;
  hasDrawnThisTurn: boolean;
  hasWon: boolean;
  canStartGame: boolean;
  canDrawCard: boolean;
  canPlaceCardAlone: boolean;
  canPlaceCardInCombination: boolean;
  canMoveCardAlone: boolean;
  canMoveCardToCombination: boolean;
  canCancelTurnModifications: boolean;
  canEndTurn: boolean;
};
