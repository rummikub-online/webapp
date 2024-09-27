import { CARD_JOKER_NUMBER } from "@/app/Card/domain/constants/card";
import type { CardDto } from "@/app/Card/domain/dtos/card";

export const isJoker = (card: CardDto) => card.number === CARD_JOKER_NUMBER;
