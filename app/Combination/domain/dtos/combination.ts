import type { CardListDto } from "@/app/Card/domain/dtos/cardList";

export type CombinationType = "suite" | "serie" | "invalid";

export type CombinationDto = Readonly<{
  type: CombinationType;
  cards: CardListDto;
}>;
