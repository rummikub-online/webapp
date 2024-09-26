import { CARD_JOKER_NUMBER } from "@/app/Card/constants/card";
import type { CardDto } from "@/app/Card/dtos/card";

export const isJoker = (card: CardDto) => card.number === CARD_JOKER_NUMBER;
