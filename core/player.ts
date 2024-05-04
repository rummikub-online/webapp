import { CardList } from "./card/cards";

export type Player = {
  id: string;
  cards: CardList;
  hasDrewStartupCards: boolean;
};

export const giveCards = (player: Player, cards: CardList): Player => ({
  id: player.id,
  cards: [...player.cards, ...cards],
  hasDrewStartupCards: player.hasDrewStartupCards,
});

export const giveStartupCards = (
  player: Player,
  startupCards: CardList
): Player => ({
  id: player.id,
  cards: [...player.cards, ...startupCards],
  hasDrewStartupCards: true,
});

export const makePlayer = (): Player => ({
  id: crypto.randomUUID(),
  cards: [],
  hasDrewStartupCards: false,
});
