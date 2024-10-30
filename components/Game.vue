<template>
  <div
    class="h-dvh flex flex-col items-center justify-center bg-body-bg text-body-text"
    v-if="game.disconnected.value"
  >
    <h1 class="text-xl mb-4">{{ t("pages.game.unable_to_connect.title") }}</h1>
    <p class="mb-4">{{ t("pages.game.unable_to_connect.explanation") }}</p>
    <NuxtLink href="/">
      <Button>{{ t("pages.game.unable_to_connect.back_home") }}</Button>
    </NuxtLink>
  </div>

  <main
    class="h-dvh flex flex-col bg-body-bg text-body-text"
    v-else-if="
      game &&
      game.gameBoard.value &&
      game.selfPlayer.value &&
      game.gameInfos.value &&
      game.connectedUsernames.value
    "
  >
    <nav class="flex gap-2 p-4 border-b items-center justify-between">
      <span v-if="game.gameInfos.value.state === 'created'">{{
        game.gameInfos.value?.id
      }}</span>
      <template v-if="game.gameInfos.value.state === 'started'">
        <span v-if="game.selfPlayer.value.isPlaying">{{
          t("pages.game.your_turn")
        }}</span>
        <span v-else>{{
          t("pages.game.turn_of", {
            username: game.gameInfos.value.currentPlayerUsername,
          })
        }}</span>
      </template>

      <div class="flex gap-2">
        <Button @click="modal.open(GameRulesModal)">
          <div class="flex gap-2">
            <BookOpenIcon class="size-4 text-body-text" />
          </div>
        </Button>

        <ConnectedUsernames
          v-if="game.connectedUsernames.value"
          :usernames="game.connectedUsernames.value"
        />
      </div>
    </nav>

    <GameBoard
      :highlighted-card="game.highlightedCard.value?.positionOnBoard"
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
        :gameBoard="game.gameBoard.value"
        :player="game.selfPlayer.value"
        :card-dragging-handler="game.cardDraggingHandler"
        :game="game.gameInfos.value"
        :highlighted-card-index="game.highlightedCard.value?.indexInHand"
        @cancel-turn-modifications="game.cancelTurnModifications()"
        @draw-card="game.drawCard()"
        @end-turn="game.endTurn()"
        @start-game="game.startGame()"
      />
    </div>
  </main>
</template>
<script setup lang="ts">
import { BookOpenIcon } from "@heroicons/vue/20/solid";
import GameRulesModal from "@/components/GameRulesModal.vue";

const modal = useModal();
const { params } = useRoute();
const { t } = useI18n();

const { username } = useUsername();
const game = useGame(params.id, username.value);
</script>
