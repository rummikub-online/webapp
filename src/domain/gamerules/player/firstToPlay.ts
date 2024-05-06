import { Player } from "../../entities/player";

const bestCardNum = (player: Player) =>
  Math.max(...player.cards.map((card) => card.num));

export const firstPlayer = (players: Array<Player>) =>
  players.reduce(
    (actualFirstPlayer, player) =>
      bestCardNum(actualFirstPlayer) > bestCardNum(player)
        ? actualFirstPlayer
        : player,
    players[0]
  );
