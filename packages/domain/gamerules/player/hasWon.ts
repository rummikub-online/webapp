import { CardListDto } from "../../dtos/cardList";

export const isWinnerPlayer = ({
  hasDrawnStartupCards,
  cards,
}: {
  hasDrawnStartupCards: boolean;
  cards: CardListDto;
}) => hasDrawnStartupCards && cards.length === 0;
