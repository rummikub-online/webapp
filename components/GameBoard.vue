<script setup lang="ts">
import type { GameBoardDto } from "@/app/GameBoard/dtos/gameBoard";
import { useGameStore } from "@/stores/game";

const gameStore = useGameStore();

defineProps<{
  gameBoard: GameBoardDto;
}>();

const handleCardMoved = (
  oldCardIndex: number,
  newCardIndex: number,
  combinationIndex: number
) => {
  gameStore.cardDraggingHandler.to(newCardIndex, combinationIndex);
  gameStore.cardDraggingHandler.from(oldCardIndex, combinationIndex);
};
const handleCardRemoved = (cardIndex: number, combinationIndex: number) => {
  gameStore.cardDraggingHandler.from(cardIndex, combinationIndex);
};
const handleCardAdded = (cardIndex: number, combinationIndex: number) => {
  gameStore.cardDraggingHandler.to(cardIndex, combinationIndex);
};
</script>
<template>
  <div
    class="px-2 py-4 bg-body-bg flex flex-wrap justify-start items-start flex-1"
  >
    <Combination
      v-for="(combination, combinationIndex) in gameBoard.combinations"
      :key="combinationIndex"
      :combination="combination"
      :disabled="
        !gameStore.player?.canInteractWithCombination[combinationIndex]
      "
      :locked="
        gameStore.player?.isPlaying &&
        !gameStore.player?.canInteractWithCombination[combinationIndex]
      "
      @moved="
        (_, oldIndex: number, newIndex: number) =>
          handleCardMoved(oldIndex, newIndex, combinationIndex)
      "
      @added="
        (_, oldIndex: number) => handleCardAdded(oldIndex, combinationIndex)
      "
      @removed="
        (_, newIndex: number) => handleCardRemoved(newIndex, combinationIndex)
      "
    />

    <CreateCombinationDragZone />
  </div>
</template>
