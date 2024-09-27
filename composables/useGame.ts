import type { GameInfosDto } from "@/app/Game/application/Game";
import type { GameBoardDto } from "@/app/GameBoard/domain/dtos/gameBoard";
import type { PlayerDto } from "@/app/Player/domain/dtos/player";
import { makeCardDraggingHandler } from "@/logic/cardDragging";
import { setupSocket } from "@/logic/socket";

export const useGame = (gameId: any) => {
  if (typeof gameId !== "string") {
    throw new Error("Game id is not a string");
  }

  const gameInfos = ref<GameInfosDto>();
  const player = ref<PlayerDto>();
  const gameBoard = ref<GameBoardDto>();

  const {
    startGame,
    cancelTurnModications,
    drawCard,
    endTurn,
    moveCardAlone,
    moveCardToCombination,
    placeCardAlone,
    placeCardInCombination,
  } = setupSocket({
    gameId,
    onPlayerUpdate(newPlayer) {
      player.value = newPlayer;
    },
    onGameBoardUpdate(newGameBoard) {
      gameBoard.value = newGameBoard;
    },
    onGameInfosUpdate(newGameInfos) {
      gameInfos.value = newGameInfos;
    },
  });

  const cardDraggingHandler = makeCardDraggingHandler({
    placeCardAlone,
    placeCardInCombination,
    moveCardAlone,
    moveCardToCombination,
  });

  return {
    gameInfos,
    player,
    gameBoard,
    startGame,
    cancelTurnModications,
    drawCard,
    endTurn,
    cardDraggingHandler,
  };
};
