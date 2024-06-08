import {
  SERIE_MAX_CARDS_COUNT,
  SERIE_MIN_CARDS_COUNT,
} from "../../constants/cardSerie";
import { CardColor, CardNumber } from "../../dtos/card";
import { CardListDto } from "../../dtos/cardList";
import { isJoker } from "../../utils/card/isJoker";

const hasSameNumber = (cardSerie: CardListDto): boolean => {
  let numberRef: CardNumber | null = null;

  for (const card of cardSerie) {
    if (isJoker(card)) {
      continue;
    }

    numberRef ??= card.number;

    if (card.number !== numberRef) {
      return false;
    }
  }

  return true;
};

const hasValidLength = (cardSerie: CardListDto) =>
  SERIE_MIN_CARDS_COUNT <= cardSerie.length &&
  cardSerie.length <= SERIE_MAX_CARDS_COUNT;

const areColorsDifferent = (cardSerie: CardListDto): boolean => {
  const colorsVerify: Array<CardColor> = [];

  for (const card of cardSerie) {
    if (isJoker(card)) {
      continue;
    }

    if (colorsVerify.includes(card.color)) {
      return false;
    }

    colorsVerify.push(card.color);
  }

  return true;
};

export const isValidCardSerie = (cardSerie: CardListDto): boolean =>
  hasValidLength(cardSerie) &&
  areColorsDifferent(cardSerie) &&
  hasSameNumber(cardSerie);
