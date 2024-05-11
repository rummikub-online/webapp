import { CardDto } from "../../dtos/card";

import { CARD_JOKER_NUMBER } from "../../constants/card";

export const isJoker = (card: CardDto) => card.number === CARD_JOKER_NUMBER;
