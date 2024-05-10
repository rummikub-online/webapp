import { PlayerDto } from "../../dtos/player";

export const isWinnerPlayer = (player: PlayerDto) =>
  player.hasDrewStartupCards && player.cards.length === 0;
