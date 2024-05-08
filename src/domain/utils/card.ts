import { CardDto } from "../dtos/card";

import { CARD_JOKER_NUMBER } from "../constants/card";

export const isJoker = (card: CardDto) => {
  return card.number === CARD_JOKER_NUMBER;
};
