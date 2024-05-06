import { CardList } from "./card";

export type Player = {
  id: string;
  cards: CardList;
  hasDrewStartupCards: boolean;
};

export const makePlayer = (): Player => ({
  id: crypto.randomUUID(),
  cards: [],
  hasDrewStartupCards: false,
});
