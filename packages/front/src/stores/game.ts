import { makeCardDraggingHandler } from "@/logic/cardDragging";
import { setupSocket } from "@/logic/socket";
import type { GameInfosDto } from "@rumi/application/entities/Game";
import type { GameBoardDto } from "@rumi/domain/dtos/gameBoard";
import type { PlayerDto } from "@rumi/domain/dtos/player";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRoute } from "vue-router";

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
