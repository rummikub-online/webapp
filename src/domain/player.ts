import { CardCombination } from "./entities/cardCombination";
import { Player } from "./entities/player";

export const giveCards = (player: Player, cards: CardCombination): Player => ({
  id: player.id,
  cards: [...player.cards, ...cards],
  hasDrewStartupCards: player.hasDrewStartupCards,
});

export const giveStartupCards = (
  player: Player,
  startupCards: CardCombination
): Player => ({
  id: player.id,
  cards: [...player.cards, ...startupCards],
  hasDrewStartupCards: true,
});
