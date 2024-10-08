import type {
  CardColor,
  CardDto,
  CardDuplicata,
  CardNumber,
} from "@/app/Card/domain/dtos/card";

export type CardKey = `${CardNumber}-${CardColor}-${CardDuplicata}`;
export const toKey = (card: CardDto): CardKey =>
  `${card.number}-${card.color}-${card.duplicata}`;
