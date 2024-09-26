import type { GameInfosDto } from "@/app/Game/entities/Game";
import type { GameBoardDto } from "@/app/GameBoard/dtos/gameBoard";
import type { PlayerDto } from "@/app/Player/dtos/player";
import { makeCardDraggingHandler } from "@/logic/cardDragging";
import { setupSocket } from "@/logic/socket";
import { defineStore } from "pinia";

export const useGameStore = defineStore("game", () => {
  const route = useRoute();
  const gameId = route.params.id;

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
});
