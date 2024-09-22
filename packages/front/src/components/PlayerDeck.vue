<script setup lang="ts">
import type { CardDto } from "@rumi/domain/dtos/card";
import type { OrderedCardDto } from "@rumi/domain/utils/card/grouping";
import { ref, watch } from "vue";
import draggable from "vuedraggable";
import type { ChangeEvent } from "../lib/vueDraggable";
import { toKey } from "../logic/card";
import { useGameStore } from "../stores/game";
import { useOrderedCardsStore } from "../stores/orderedCards";
import Card from "./Card.vue";
import PlayerActions from "./PlayerActions.vue";

const gameStore = useGameStore();
const orderedCardsStore = useOrderedCardsStore();

const emit = defineEmits<{
  removed: [card: CardDto, newIndex: number];
  added: [card: CardDto, oldIndex: number];
  moved: [card: CardDto, oldIndex: number, newIndex: number];
}>();

const cards = ref<Array<OrderedCardDto>>([]);

watch(
  () => ({
    player: gameStore.player,
    cardOrder: orderedCardsStore.isOrderedByColor,
  }),
  ({ player }) => {
    cards.value = orderedCardsStore.toOrdered(player ? [...player.cards] : []);
  },
);

const handleChange = (e: ChangeEvent<OrderedCardDto>) => {
  if (e.removed) {
    gameStore.cardDraggingHandler.from(e.removed.element.initialIndex, null);
  }
};
</script>
<template>
  <div class="bg-body-bg flex flex-col gap-2 px-2 py-4">
    <PlayerActions />
    <div v-if="gameStore.player" class="flex justify-start items-start gap-3">
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
  </div>
</template>
