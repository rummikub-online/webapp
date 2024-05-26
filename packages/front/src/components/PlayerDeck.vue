<script setup lang="ts">
import type { ChangeEvent } from "@/lib/vueDraggable";
import { toKey } from "@/logic/card";
import { useGameStore } from "@/stores/game";
import type { CardDto } from "@rumi/domain/dtos/card";
import { ref, watch } from "vue";
import draggable from "vuedraggable";
import Card from "./Card.vue";

const gameStore = useGameStore();

const emit = defineEmits<{
  removed: [card: CardDto, newIndex: number];
  added: [card: CardDto, oldIndex: number];
  moved: [card: CardDto, oldIndex: number, newIndex: number];
}>();

const cards = ref<Array<CardDto>>([]);

watch(
  () => gameStore.player,
  (player) => {
    cards.value = player ? [...player.cards] : [];
  },
);

const handleChange = (e: ChangeEvent<CardDto>) => {
  if (e.removed) {
    gameStore.cardDraggingHandler.from(e.removed.oldIndex, null);
  }
};
</script>
<template>
  <div
    v-if="gameStore.player"
    class="px-2 py-4 bg-background flex justify-start items-start gap-3"
  >
    <draggable
      :disabled="!gameStore.player.isPlaying"
      v-model="cards"
      :group="{
        name: 'combinations',
        put: false,
      }"
      tag="div"
      class="justify-start items-start gap-0.5 inline-flex"
      :item-key="(card: CardDto) => toKey(card)"
      :sort="false"
      @change="handleChange"
    >
      <template #item="{ element: card }">
        <Card :color="card.color" :number="card.number" />
      </template>
    </draggable>
  </div>
</template>
