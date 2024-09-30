<script setup lang="ts">
import type { CardPositionOnBoard } from "@/app/GameBoard/application/GameBoard";
import type { GameBoardDto } from "@/app/GameBoard/domain/dtos/gameBoard";
import type { PlayerDto } from "@/app/Player/domain/dtos/player";
import type { CardDraggingHandler } from "@/logic/cardDragging";

const props = defineProps<{
  highlightedCard?: CardPositionOnBoard;
  player: PlayerDto;
  gameBoard: GameBoardDto;
  cardDraggingHandler: CardDraggingHandler;
}>();

const handleCardMoved = (
  oldCardIndex: number,
  newCardIndex: number,
  combinationIndex: number,
) => {
  props.cardDraggingHandler.to(newCardIndex, combinationIndex);
  props.cardDraggingHandler.from(oldCardIndex, combinationIndex);
};
const handleCardRemoved = (cardIndex: number, combinationIndex: number) => {
  props.cardDraggingHandler.from(cardIndex, combinationIndex);
};
const handleCardAdded = (cardIndex: number, combinationIndex: number) => {
  props.cardDraggingHandler.to(cardIndex, combinationIndex);
};
</script>
<template>
  <div
    class="px-2 py-4 bg-body-bg flex flex-wrap justify-start items-start flex-1"
  >
    <Combination
      v-for="(combination, combinationIndex) in gameBoard.combinations"
      :key="combinationIndex"
      :combination="combination"
      :disabled="!player?.canInteractWithCombination[combinationIndex]"
      :highlighted-card-index="
        combinationIndex === highlightedCard?.combinationIndex
          ? highlightedCard.cardIndex
          : undefined
      "
      :locked="
        player?.isPlaying &&
        !player?.canInteractWithCombination[combinationIndex]
      "
      @moved="
        (_, oldIndex: number, newIndex: number) =>
          handleCardMoved(oldIndex, newIndex, combinationIndex)
      "
      @added="
        (_, oldIndex: number) => handleCardAdded(oldIndex, combinationIndex)
      "
      @removed="
        (_, newIndex: number) => handleCardRemoved(newIndex, combinationIndex)
      "
    />

    <CreateCombinationDragZone
      v-if="player.canPlaceCardAlone || player.canMoveCardAlone"
      :card-dragging-handler="cardDraggingHandler"
      :player="player"
    />
  </div>
</template>
