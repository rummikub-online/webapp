import type { CardColor, CardNumber } from "@/app/Card/dtos/card";
import type { CardListDto } from "@/app/Card/dtos/cardList";
import { isJoker } from "@/app/Card/gamerules/isJoker";
import {
  SERIE_MAX_CARDS_COUNT,
  SERIE_MIN_CARDS_COUNT,
} from "@/app/CardSerie/constants/cardSerie";

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
