import { CardListDto } from "./cardList";

export type CombinationType = "suite" | "serie" | "invalid";

export type CombinationDto = Readonly<{
  type: CombinationType;
  cards: CardListDto;
}>;
