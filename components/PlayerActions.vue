<script setup lang="ts">
import type { PlayerDto } from "@/app/Player/domain/dtos/player";
import { computed } from "vue";

const props = defineProps<{
  player: PlayerDto;
  isOrderedByNumber: boolean;
  isOrderedByColor: boolean;
}>();

const emit = defineEmits<{
  startGame: [];
  orderByColor: [];
  orderByNumber: [];
  drawCard: [];
  cancelTurnModications: [];
  endTurn: [];
}>();

const canChangeCardOrder = computed(() => props.player?.isPlaying);
</script>
<template>
  <div v-if="player" class="flex gap-3">
    <Button
      type="primary"
      v-if="player.canStartGame"
      @click="emit('startGame')"
    >
      Commencer
    </Button>

    <Button
      type="primary"
      v-if="canChangeCardOrder && isOrderedByNumber"
      @click="emit('orderByColor')"
    >
      Par couleur
    </Button>

    <Button
      type="primary"
      v-if="canChangeCardOrder && isOrderedByColor"
      @click="emit('orderByNumber')"
    >
      Par numéro
    </Button>

    <Button type="primary" v-if="player.canDrawCard" @click="emit('drawCard')">
      Piocher
    </Button>

    <Button
      type="primary"
      v-if="player.canCancelTurnModifications"
      @click="emit('cancelTurnModications')"
    >
      Annuler
    </Button>

    <Button type="primary" v-if="player.canEndTurn" @click="emit('endTurn')">
      Terminer
    </Button>
  </div>
</template>
