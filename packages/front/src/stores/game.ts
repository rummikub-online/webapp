import { makeCardDraggingHandler } from "@/logic/cardDragging";
import { setupSocket } from "@/logic/socket";
import type { GameBoardDto } from "@rumi/domain/dtos/gameBoard";
import type { PlayerDto } from "@rumi/domain/dtos/player";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useGameStore = defineStore("game", () => {
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
    onPlayerUpdate(newPlayer) {
      player.value = newPlayer;
    },
    onGameBoardUpdate(newGameBoard) {
      gameBoard.value = newGameBoard;
    },
  });

  const cardDraggingHandler = makeCardDraggingHandler({
    placeCardAlone,
    placeCardInCombination,
    moveCardAlone,
    moveCardToCombination,
  });

  return {
    player,
    gameBoard,
    startGame,
    cancelTurnModications,
    drawCard,
    endTurn,
    cardDraggingHandler,
  };
});
