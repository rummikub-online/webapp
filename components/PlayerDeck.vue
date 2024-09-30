<script setup lang="ts">
import type { CardDto } from "@/app/Card/domain/dtos/card";
import type { OrderedCardDto } from "@/app/Card/domain/gamerules/grouping";
import type { GameInfosDto } from "@/app/Game/application/Game";
import type { PlayerDto } from "@/app/Player/domain/dtos/player";
import { useOrderedCards } from "@/composables/useOrderedCards";
import type { ChangeEvent } from "@/lib/vueDraggable";
import { toKey } from "@/logic/card";
import type { CardDraggingHandler } from "@/logic/cardDragging";
import Draggable from "vuedraggable";

const props = defineProps<{
  player: PlayerDto;
  cardDraggingHandler: CardDraggingHandler;
  game: GameInfosDto;
}>();

const emit = defineEmits<{
  startGame: [];
  drawCard: [];
  cancelTurnModications: [];
  endTurn: [];
}>();

const orderedCards = useOrderedCards();

const cards = ref<Array<OrderedCardDto>>(
  orderedCards.toOrdered([...props.player.cards]),
);

watch(
  () => ({
    player: props.player,
    cardOrder: orderedCards.isOrderedByColor.value,
  }),
  ({ player }) => {
    cards.value = orderedCards.toOrdered([...player.cards]);
  },
);

const handleChange = (e: ChangeEvent<OrderedCardDto>) => {
  if (e.removed) {
    props.cardDraggingHandler.from(e.removed.element.initialIndex, null);
  }
};
</script>
<template>
  <div class="bg-body-bg border-t flex flex-col gap-2 px-2 py-4">
    <PlayerActions
      :player="player"
      :is-ordered-by-color="orderedCards.isOrderedByColor.value"
      :is-ordered-by-number="orderedCards.isOrderedByNumber.value"
      :game="game"
      @cancel-turn-modications="emit('cancelTurnModications')"
      @draw-card="emit('drawCard')"
      @end-turn="emit('endTurn')"
      @order-by-color="orderedCards.orderByColor()"
      @order-by-number="orderedCards.orderByNumber()"
      @start-game="emit('startGame')"
    />

    <div v-if="player" class="flex justify-start items-start flex-wrap gap-3">
      <Draggable
        :disabled="!player.isPlaying"
        v-model="cards"
        :group="{
          name: 'combinations',
          put: false,
        }"
        tag="div"
        class="justify-start items-start flex-wrap gap-0.5 inline-flex"
        :item-key="(card: CardDto) => toKey(card)"
        :sort="false"
        @change="handleChange"
      >
        <template #item="{ element: card }">
          <Card
            :color="card.color"
            :number="card.number"
            :movable="player.isPlaying"
          />
        </template>
      </Draggable>
    </div>
  </div>
</template>
