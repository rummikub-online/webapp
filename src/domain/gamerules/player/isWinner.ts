import { Player } from "../../entities/player";

export const isWinnerPlayer = (player: Player) =>
  player.hasDrewStartupCards && player.cards.length === 0;
