import { CardCombination } from "./cardCombination";

export type Player = {
  id: string;
  cards: CardCombination;
  hasDrewStartupCards: boolean;
};

export const makePlayer = (): Player => ({
  id: crypto.randomUUID(),
  cards: [],
  hasDrewStartupCards: false,
});
