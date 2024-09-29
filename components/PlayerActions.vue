<script setup lang="ts">
import type { GameInfosDto } from "@/app/Game/application/Game";
import type { PlayerDto } from "@/app/Player/domain/dtos/player";
import { computed } from "vue";

const props = defineProps<{
  player: PlayerDto;
  isOrderedByNumber: boolean;
  isOrderedByColor: boolean;
  game: GameInfosDto;
}>();

const emit = defineEmits<{
  startGame: [];
  orderByColor: [];
  orderByNumber: [];
  drawCard: [];
  cancelTurnModications: [];
  endTurn: [];
}>();

const { t } = useI18n();

const canChangeCardOrder = computed(() => props.game.state === "started");
</script>
<template>
  <div v-if="player" class="flex gap-3">
    <Button
      type="primary"
      v-if="player.canStartGame"
      @click="emit('startGame')"
    >
      {{ t("start_game") }}
    </Button>

    <Button
      type="primary"
      v-if="canChangeCardOrder && isOrderedByNumber"
      @click="emit('orderByColor')"
    >
      {{ t("by_color") }}
    </Button>

    <Button
      type="primary"
      v-if="canChangeCardOrder && isOrderedByColor"
      @click="emit('orderByNumber')"
    >
      {{ t("by_number") }}
    </Button>

    <Button type="primary" v-if="player.canDrawCard" @click="emit('drawCard')">
      {{ t("draw") }}
    </Button>

    <Button
      type="primary"
      v-if="player.canCancelTurnModifications"
      @click="emit('cancelTurnModications')"
    >
      {{ t("cancel") }}
    </Button>

    <Button type="primary" v-if="player.canEndTurn" @click="emit('endTurn')">
      {{ t("end_turn") }}
    </Button>
  </div>
</template>
<i18n lang="yaml">
fr:
  start_game: Démarrer la partie
  by_color: Par couleur
  by_number: Par numéro
  draw: Piocher
  cancel: Annuler
  end_turn: Terminer le tour
</i18n>
