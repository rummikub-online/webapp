import { PlayerDto } from "../../dtos/player";

export const isWinnerPlayer = (player: PlayerDto) =>
  player.hasDrawnStartupCards && player.cards.length === 0;
