<template>
  <div
    class="h-screen flex flex-col items-center justify-center bg-body-bg text-body-text"
    v-if="game.disconnected.value"
  >
    <h1 class="text-xl mb-4">{{ t("pages.game.unable_to_connect.title") }}</h1>
    <p class="mb-4">{{ t("pages.game.unable_to_connect.explanation") }}</p>
    <NuxtLink href="/">
      <Button>{{ t("pages.game.unable_to_connect.back_home") }}</Button>
    </NuxtLink>
  </div>
  <main
    class="h-screen flex flex-col bg-body-bg text-body-text"
    v-else-if="
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
const { t } = useI18n();

const { username } = useUsername();
const game = useGame(params.id, username.value);
</script>
