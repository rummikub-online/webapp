<template>
  <main
    class="h-screen flex flex-col bg-body-bg"
    v-if="game.gameBoard.value && game.player.value"
  >
    <nav class="flex gap-2 p-4 border-b items-center justify-between">
      <span>{{ game.gameInfos.value?.id }}</span>

      <ConnectedUsernames
        v-if="game.connectedUsernames.value"
        :usernames="game.connectedUsernames.value"
      />
    </nav>

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

const { username } = useUsername();
const game = useGame(params.id, username.value);
</script>
