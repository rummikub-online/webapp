<script setup lang="ts">
import { useGameStore } from "@/stores/game";
import type { GameBoardDto } from "@rumi/domain/dtos/gameBoard";
import Combination from "./Combination.vue";
import CreateCombinationDragZone from "./CreateCombinationDragZone.vue";

const gameStore = useGameStore();

defineProps<{
  gameBoard: GameBoardDto;
}>();

const handleCardMoved = (
  oldCardIndex: number,
  newCardIndex: number,
  combinationIndex: number,
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
    class="px-2 py-4 bg-background flex flex-wrap justify-start items-start flex-1"
  >
    <Combination
      v-for="(combination, combinationIndex) in gameBoard.combinations"
      :key="combinationIndex"
      :combination="combination"
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
