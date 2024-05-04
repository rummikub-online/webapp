import { CardList } from "./cards/card";

export type Player = {
  id: string;
  cards: CardList;
};

export const NUMBER_CARDS_PLAYER_STARTUP = 14;

export function giveCard(player: Player, cards: CardList): Player {
  return {
    id: player.id,
    cards: [...player.cards, ...cards],
  };
}

export function makePlayer(): Player {
  return {
    id: crypto.randomUUID(),
    cards: [],
  };
}
