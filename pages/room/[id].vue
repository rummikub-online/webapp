<template>
  <main class="h-screen flex flex-col">
    <div class="absolute"></div>
    <GameBoard
      v-if="gameStore.gameBoard"
      :game-board="gameStore.gameBoard"
    ></GameBoard>
    <PlayerDeck />
  </main>
</template>
<script setup lang="ts">
import { useGameStore } from "@/stores/game";

const gameStore = useGameStore();
</script>
