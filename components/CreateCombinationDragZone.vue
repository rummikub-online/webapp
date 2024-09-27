<script setup lang="ts">
import type { CardDto } from "@/app/Card/domain/dtos/card";
import type { PlayerDto } from "@/app/Player/domain/dtos/player";
import type { ChangeEvent } from "@/lib/vueDraggable";
import { toKey } from "@/logic/card";
import type { CardDraggingHandler } from "@/logic/cardDragging";
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
  }
);

const handleChange = (e: ChangeEvent<CardDto>) => {
  if (e.added) {
    props.cardDraggingHandler.to(null, null);
  }
};
</script>
<template>
  <div class="p-2">
    <Draggable
      v-model="cards"
      group="combinations"
      tag="div"
      class="w-full h-full justify-start items-start gap-0.5 inline-flex p-2 rounded-lg border-dashed border min-w-9 min-h-11 md:min-w-12 md:min-h-16"
      :item-key="(card: CardDto) => toKey(card)"
      @change="handleChange"
    >
      <template #item="{ element: card }">
        <Card :color="card.color" :number="card.number" />
      </template>
    </Draggable>
  </div>
</template>
