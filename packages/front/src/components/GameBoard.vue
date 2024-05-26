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
    class="relative z-0 px-2 py-4 bg-background flex justify-start items-start gap-3"
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
      class="z-10"
    />

    <CreateCombinationDragZone class="" />
  </div>
</template>
