import { CardCombinationType } from "../enums/CardCombinationType";
import { CardListDto } from "./cardList";

export type CardCombinationDto = Readonly<{
  type: CardCombinationType;
  cards: CardListDto;
}>;
