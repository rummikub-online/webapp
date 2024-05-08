import { CardListDto } from "./cardList";

export type CardCombinationType = "suite" | "serie" | "invalid";

export type CardCombinationDto = Readonly<{
  type: CardCombinationType;
  cards: CardListDto;
}>;
