import { cards } from "../constants/card";
import { toShuffled } from "../utils/array";
import { CardList } from "./card";

export type DrawStack = CardList;

export const makeDrawStack = (): DrawStack =>
  toShuffled(toShuffled(toShuffled(cards)));

export type Draw = Readonly<{
  cards: CardList;
  drawStack: CardList;
}>;
