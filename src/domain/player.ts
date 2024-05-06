import { CardList } from "./entities/card";
import { Player } from "./entities/player";

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
