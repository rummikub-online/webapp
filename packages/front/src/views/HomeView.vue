<script setup lang="ts">
import Button from "@/components/Button.vue";
import GameBoard from "@/components/GameBoard.vue";
import PlayerDeck from "@/components/PlayerDeck.vue";
import { useGameStore } from "@/stores/game";
const gameStore = useGameStore();
</script>

<template>
  <main class="h-screen">
    <template v-if="gameStore.gameBoard">
      <GameBoard :game-board="gameStore.gameBoard"></GameBoard>
    </template>
    <template v-if="gameStore.player">
      <PlayerDeck />
      <Button
        type="primary"
        v-if="gameStore.player.canStartGame"
        @click="gameStore.startGame"
      >
        Commencer
      </Button>
      <Button
        type="primary"
        v-if="gameStore.player.canDrawCard"
        @click="gameStore.drawCard"
      >
        Piocher
      </Button>
      <Button
        type="primary"
        v-if="gameStore.player.canCancelTurnModifications"
        @click="gameStore.cancelTurnModications"
      >
        Annuler
      </Button>
      <Button
        type="primary"
        v-if="gameStore.player.canEndTurn"
        @click="gameStore.endTurn"
      >
        Terminer
      </Button>
    </template>
  </main>
</template>
