<script setup lang="ts">
import GameBoard from "@/components/GameBoard.vue";
import PlayerDeck from "@/components/PlayerDeck.vue";
import { useGameStore } from "@/stores/game";
const gameStore = useGameStore();
</script>

<template>
  <main class="h-screen flex flex-col">
    <GameBoard
      v-if="gameStore.gameBoard"
      :game-board="gameStore.gameBoard"
    ></GameBoard>
    <PlayerDeck />
  </main>
</template>
