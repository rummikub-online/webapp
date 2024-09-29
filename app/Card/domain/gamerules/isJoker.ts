import { CARD_JOKER_NUMBER } from "@/app/Card/domain/constants/card";
import type { CardDto, CardNumber } from "@/app/Card/domain/dtos/card";

export const isJokerNumber = (cardNumber: CardNumber) =>
  cardNumber === CARD_JOKER_NUMBER;
export const isJoker = (card: CardDto) => isJokerNumber(card.number);
