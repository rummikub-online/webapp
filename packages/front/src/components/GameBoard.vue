<script setup lang="ts">
import type { CardDto } from "@rumi/domain/dtos/card";
import type { GameBoardDto } from "@rumi/domain/dtos/gameBoard";
import Combination from "./Combination.vue";
defineProps<{
  gameBoard: GameBoardDto;
}>();

const handleCardMoved = (card: CardDto, oldIndex: number, newIndex: number) => {
  console.log(card);
};
const handleCardAdded = (card: CardDto, newIndex: number) => {
  console.log(card);
};

const handleCardRemoved = (card: CardDto, oldIndex: number) => {
  console.log(card);
};
</script>
<template>
  <div class="px-2 py-4 bg-background flex justify-start items-start gap-3">
    <Combination
      v-for="(combination, index) in gameBoard.combinations"
      :key="index"
      :combination="combination"
      @moved="handleCardMoved"
      @added="handleCardAdded"
      @removed="handleCardRemoved"
    />
  </div>
</template>
