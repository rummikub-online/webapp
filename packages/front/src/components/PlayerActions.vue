<script setup lang="ts">
import { computed } from "vue";
import { useGameStore } from "../stores/game";
import { useOrderedCardsStore } from "../stores/orderedCards";
import Button from "./Button.vue";

const gameStore = useGameStore();
const orderedCardsStore = useOrderedCardsStore();

const canChangeCardOrder = computed(() => gameStore.player?.isPlaying);
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
      v-if="canChangeCardOrder && orderedCardsStore.isOrderedByNumber"
      @click="orderedCardsStore.orderByColor"
    >
      Par couleur
    </Button>
    <Button
      type="primary"
      v-if="canChangeCardOrder && orderedCardsStore.isOrderedByColor"
      @click="orderedCardsStore.orderByNumber"
    >
      Par numéro
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
