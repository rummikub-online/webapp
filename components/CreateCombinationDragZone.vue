<script setup lang="ts">
import type { CardDto } from "@/app/Card/domain/dtos/card";
import type { PlayerDto } from "@/app/Player/domain/dtos/player";
import type { ChangeEvent } from "@/lib/vueDraggable";
import { toKey } from "@/logic/card";
import type { CardDraggingHandler } from "@/logic/cardDragging";
import { PlusIcon } from "@heroicons/vue/24/solid";
import { ref, watch } from "vue";
import Draggable from "vuedraggable";

const props = defineProps<{
  player: PlayerDto;
  cardDraggingHandler: CardDraggingHandler;
}>();

const cards = ref([]);

watch(
  () => props.player,
  () => {
    cards.value = [];
  },
);

const handleChange = (e: ChangeEvent<CardDto>) => {
  if (e.added) {
    props.cardDraggingHandler.to(null, null);
  }
};
</script>
<template>
  <div class="p-2 px-4">
    <Draggable
      v-model="cards"
      group="combinations"
      tag="div"
      class="relative text-card-create justify-start items-start gap-0.5 inline-flex rounded border-dashed border border-current w-9 h-11 md:w-12 md:h-16"
      :item-key="(card: CardDto) => toKey(card)"
      @change="handleChange"
    >
      <template #item="{ element: card }">
        <Card :color="card.color" :number="card.number" />
      </template>
      <template #header>
        <PlusIcon
          class="absolute size-4 md:size-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </template>
    </Draggable>
  </div>
</template>
