<script setup lang="ts">
import { toKey } from "@/logic/card";
import { ExclamationTriangleIcon } from "@heroicons/vue/16/solid";
import type { CardDto } from "@rumi/domain/dtos/card";
import type { CombinationDto } from "@rumi/domain/dtos/combination";
import { ref, watch } from "vue";
import draggable from "vuedraggable";
import Card from "./Card.vue";

const props = defineProps<{
  combination: CombinationDto;
}>();

const emit = defineEmits<{
  removed: [card: CardDto, newIndex: number];
  added: [card: CardDto, oldIndex: number];
  moved: [card: CardDto, oldIndex: number, newIndex: number];
}>();

const cards = ref([...props.combination.cards]);

watch(
  () => props.combination,
  (combination) => {
    cards.value = [...combination.cards];
  },
);

type ChangeEvent<T> = {
  moved?: {
    element: T;
    newIndex: number;
    oldIndex: number;
  };
  added?: {
    element: T;
    newIndex: number;
  };
  removed?: {
    element: T;
    oldIndex: number;
  };
};
const handleChange = (e: ChangeEvent<CardDto>) => {
  if (e.moved) {
    emit("moved", e.moved.element, e.moved.oldIndex, e.moved.newIndex);
    return;
  }
  if (e.added) {
    emit("added", e.added.element, e.added.newIndex);
    return;
  }
  if (e.removed) {
    emit("removed", e.removed.element, e.removed.oldIndex);
    return;
  }
};
</script>
<template>
  <div class="w-min min-w-10 flex flex-col items-center gap-1">
    <draggable
      v-model="cards"
      group="compositions"
      tag="div"
      class="justify-start items-start gap-0.5 inline-flex"
      :item-key="(card: CardDto) => toKey(card)"
      @change="handleChange"
    >
      <template #item="{ element: card }">
        <Card :color="card.color" :number="card.number" />
      </template>
    </draggable>

    <span
      v-if="combination.type === 'invalid'"
      class="flex items-center gap-1 text-button-danger text-xs font-black"
    >
      <ExclamationTriangleIcon class="w-3.5 h-3.5" />
      Invalid
    </span>
  </div>
</template>
