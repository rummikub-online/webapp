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
import type { GameBoardDto } from "@/app/GameBoard/domain/dtos/gameBoard";
import { MIN_POINTS_TO_START } from "@/app/Player/domain/constants/player";

const props = defineProps<{
  gameBoard: GameBoardDto;
  player: PlayerDto;
  cardDraggingHandler: CardDraggingHandler;
  game: GameInfosDto;
  highlightedCardIndex?: number
}>();

const emit = defineEmits<{
  startGame: [];
  drawCard: [];
  cancelTurnModifications: [];
  endTurn: [];
}>();

const { t } = useI18n();
const orderedCards = useOrderedCards();

const cards = ref<Array<OrderedCardDto>>(
  orderedCards.toOrdered([...props.player.cards])
);

watch(
  () => ({
    player: props.player,
    cardOrder: orderedCards.isOrderedByColor.value
  }),
  ({ player }) => {
    cards.value = orderedCards.toOrdered([...player.cards]);
  }
);

const handleChange = (e: ChangeEvent<OrderedCardDto>) => {
  if (e.removed) {
    props.cardDraggingHandler.from(e.removed.element.initialIndex, null);
  }
};
</script>
<template>
  <div class="bg-body-bg border-t flex flex-col gap-2 px-2 py-4">
    <GameRuleReminder v-if="player.isPlaying && !player.hasStarted" :game-rule="'first_turn'" dismissible>
      {{ t("rules.first_turn.reminder", { playedPoints: gameBoard.points, neededPoints: MIN_POINTS_TO_START }) }}
    </GameRuleReminder>

    <PlayerActions
      :player="player"
      :is-ordered-by-color="orderedCards.isOrderedByColor.value"
      :is-ordered-by-number="orderedCards.isOrderedByNumber.value"
      :game="game"
      @cancel-turn-modifications="emit('cancelTurnModifications')"
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
        <template #item="{ element: card }: {element: OrderedCardDto}">
          <Card
            :color="card.color"
            :number="card.number"
            :movable="player.isPlaying"
            :highlighted="highlightedCardIndex === card.initialIndex"
          />
        </template>
      </Draggable>
    </div>
  </div>
</template>
