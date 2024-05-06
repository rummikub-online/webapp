import { drawStartupCards } from "./draw";
import { Game } from "./entities/game";
import { giveStartupCards } from "./player";

const currentPlayer = (turn: Game) => turn.players[turn.currentPlayerIndex];
const nextPlayerIndex = (turn: Game) =>
  turn.currentPlayerIndex >= turn.players.length - 1
    ? 0
    : turn.currentPlayerIndex + 1;

const startupTurn = (turn: Game) => {
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

export const nextTurn = (turn: Game): Game => {
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
