<script setup lang="ts">
import Button from "@/components/Button.vue";
import { useGameStore } from "@/stores/game";
const gameStore = useGameStore();
</script>
<template>
  <div v-if="gameStore.player" class="flex gap-3">
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
  </div>
</template>
