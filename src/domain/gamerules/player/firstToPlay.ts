import { PlayerDto } from "../../dtos/player";

const bestCardNum = (player: PlayerDto) =>
  Math.max(...player.cards.map((card) => card.num));

export const firstPlayer = (players: Array<PlayerDto>) =>
  players.reduce(
    (actualFirstPlayer, player) =>
      bestCardNum(actualFirstPlayer) > bestCardNum(player)
        ? actualFirstPlayer
        : player,
    players[0]
  );
