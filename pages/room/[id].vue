<template>
  <main
    class="h-screen flex flex-col"
    v-if="game.gameBoard.value && game.player.value"
  >
    <div class="absolute"></div>
    <GameBoard
      :game-board="game.gameBoard.value"
      :card-dragging-handler="game.cardDraggingHandler"
      :player="game.player.value"
    ></GameBoard>
    <PlayerDeck
      :player="game.player.value"
      :card-dragging-handler="game.cardDraggingHandler"
      @cancel-turn-modications="game.cancelTurnModications()"
      @draw-card="game.drawCard()"
      @end-turn="game.endTurn()"
      @start-game="game.startGame()"
    />
  </main>
</template>
<script setup lang="ts">
const { params } = useRoute();
const game = useGame(params.id);
</script>
