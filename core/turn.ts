import { CardList } from "./card/cards";
import { drawStartupCards } from "./draw";
import { Player, giveStartupCards } from "./player";

export type Turn = {
  drawStack: CardList;
  gameBoard: Array<CardList>;
  players: Array<Player>;
  currentPlayerIndex: number;
};

const currentPlayer = (turn: Turn) => turn.players[turn.currentPlayerIndex];
const nextPlayerIndex = (turn: Turn) =>
  turn.currentPlayerIndex >= turn.players.length - 1
    ? 0
    : turn.currentPlayerIndex + 1;

const startupTurn = (turn: Turn) => {
  const { drawStack, cards } = drawStartupCards(turn.drawStack);

  const newCurrentPlayer = giveStartupCards(currentPlayer(turn), cards);

  const newPlayers = turn.players.map((player, index) =>
    index === turn.currentPlayerIndex ? newCurrentPlayer : { ...player }
  );

  return {
    drawStack: drawStack,
    gameBoard: turn.gameBoard,
    players: newPlayers,
    currentPlayerIndex: nextPlayerIndex(turn),
  };
};

export const nextTurn = (turn: Turn): Turn => {
  if (!currentPlayer(turn).hasDrewStartupCards) {
    return startupTurn(turn);
  }

  return {
    drawStack: turn.drawStack,
    gameBoard: turn.gameBoard,
    players: turn.players,
    currentPlayerIndex: turn.currentPlayerIndex,
  };
};
