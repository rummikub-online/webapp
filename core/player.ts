import { CardList } from "./card/cards";

export type Player = {
  id: string;
  cards: CardList;
};

export const PLAYER_STARTUP_CARD_COUNT = 14;

export const giveCard = (player: Player, cards: CardList): Player => ({
  id: player.id,
  cards: [...player.cards, ...cards],
});

export const makePlayer = (): Player => ({
  id: crypto.randomUUID(),
  cards: [],
});
