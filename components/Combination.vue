<script setup lang="ts">
import type { CardDto } from "@/app/Card/domain/dtos/card";
import type { CombinationDto } from "@/app/Combination/domain/dtos/combination";
import type { ChangeEvent } from "@/lib/vueDraggable";
import { toKey } from "@/logic/card";
import { ExclamationTriangleIcon } from "@heroicons/vue/16/solid";
import { ref, watch } from "vue";
import Draggable from "vuedraggable";

const props = defineProps<{
  disabled?: boolean;
  locked?: boolean;
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

const handleChange = (e: ChangeEvent<CardDto>) => {
  if (e.moved) {
    return emit("moved", e.moved.element, e.moved.oldIndex, e.moved.newIndex);
  }
  if (e.added) {
    return emit("added", e.added.element, e.added.newIndex);
  }
  if (e.removed) {
    return emit("removed", e.removed.element, e.removed.oldIndex);
  }
};
</script>
<template>
  <div class="w-min flex flex-col items-center gap-1 p-2 px-4">
    <Draggable
      :disabled="disabled"
      v-model="cards"
      group="combinations"
      tag="div"
      class="justify-start items-start gap-0.5 inline-flex p-2 -m-2"
      :item-key="(card: CardDto) => toKey(card)"
      @change="handleChange"
    >
      <template #item="{ element: card }">
        <Card
          :movable="!disabled"
          :locked="locked"
          :color="card.color"
          :number="card.number"
        />
      </template>
    </Draggable>

    <span
      v-if="combination.type === 'invalid'"
      class="flex items-center gap-1 text-button-text-danger text-xs font-black"
    >
      <ExclamationTriangleIcon class="w-3.5 h-3.5" />
      Invalid
    </span>
  </div>
</template>
