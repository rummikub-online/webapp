import type { GameInfosDto } from "@/app/Game/application/Game";
import type { GameBoardDto } from "@/app/GameBoard/domain/dtos/gameBoard";
import type { PlayerDto } from "@/app/Player/domain/dtos/player";
import { makeCardDraggingHandler } from "@/logic/cardDragging";
import { setupSocket } from "@/logic/socket";

export const useGame = (gameId: any, username: any) => {
  if (typeof gameId !== "string") {
    throw new Error("Game id is not a string");
  }

  if (typeof username !== "string") {
    throw new Error("Username is not a string");
  }

  const gameInfos = ref<GameInfosDto>();
  const player = ref<PlayerDto>();
  const gameBoard = ref<GameBoardDto>();
  const connectedUsernames = ref<Record<string, boolean>>();

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
    username,
    onPlayerUpdate(newPlayer) {
      player.value = newPlayer;
    },
    onGameBoardUpdate(newGameBoard) {
      gameBoard.value = newGameBoard;
    },
    onGameInfosUpdate(newGameInfos) {
      gameInfos.value = newGameInfos;
    },
    onConnectedUsernamesUpdate(newConnectedUsernames) {
      connectedUsernames.value = newConnectedUsernames;
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
    connectedUsernames,
    startGame,
    cancelTurnModications,
    drawCard,
    endTurn,
    cardDraggingHandler,
  };
};
