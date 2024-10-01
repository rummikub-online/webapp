<template>
  <main
    class="h-screen flex flex-col bg-body-bg text-body-text"
    v-if="
      game &&
      game.gameBoard.value &&
      game.selfPlayer.value &&
      game.gameInfos.value &&
      game.connectedUsernames.value
    "
  >
    <nav class="flex gap-2 p-4 border-b items-center justify-between">
      <span>{{ game.gameInfos.value?.id }}</span>

      <ConnectedUsernames
        v-if="game.connectedUsernames.value"
        :usernames="game.connectedUsernames.value"
      />
    </nav>

    <GameBoard
      :highlighted-card="game.highligthedCard.value"
      :game-board="game.gameBoard.value"
      :card-dragging-handler="game.cardDraggingHandler"
      :player="game.selfPlayer.value"
    ></GameBoard>

    <div class="relative">
      <ActionsLogs
        class="pointer-events-none absolute bottom-full w-full"
        :actions="game.logs.value"
      />

      <PlayerDeck
        :player="game.selfPlayer.value"
        :card-dragging-handler="game.cardDraggingHandler"
        :game="game.gameInfos.value"
        @cancel-turn-modications="game.cancelTurnModications()"
        @draw-card="game.drawCard()"
        @end-turn="game.endTurn()"
        @start-game="game.startGame()"
      />
    </div>
  </main>
</template>
<script setup lang="ts">
const { params } = useRoute();

const { username } = useUsername();
const game = useGame(params.id, username.value);
const { t } = useI18n();
</script>
