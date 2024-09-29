<template>
  <main
    class="h-screen flex flex-col bg-body-bg"
    v-if="
      game && game.gameBoard.value && game.player.value && game.gameInfos.value
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
      :game-board="game.gameBoard.value"
      :card-dragging-handler="game.cardDraggingHandler"
      :player="game.player.value"
    ></GameBoard>

    <div class="relative">
      <div
        class="absolute bottom-full p-4"
        v-if="
          game.connectedUsernames.value &&
          game.gameInfos.value.currentPlayerUsername &&
          game.gameInfos.value.currentPlayerUsername !== username
        "
      >
        <template
          v-if="
            game.connectedUsernames.value[
              game.gameInfos.value.currentPlayerUsername
            ]
          "
        >
          {{
            t("pages.game.is_playing", {
              user: game.gameInfos.value.currentPlayerUsername,
            })
          }}
        </template>
        <template v-else>
          {{
            t("pages.game.is_playing_but_afk", {
              user: game.gameInfos.value.currentPlayerUsername,
            })
          }}
        </template>
      </div>

      <PlayerDeck
        :player="game.player.value"
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
