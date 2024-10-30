import type { GameInfosDto } from "@/app/Game/application/Game";
import type { CardPositionOnBoard } from "@/app/GameBoard/application/GameBoard";
import type { GameBoardDto } from "@/app/GameBoard/domain/dtos/gameBoard";
import type { PlayerDto } from "@/app/Player/domain/dtos/player";
import GameEndModal from "@/components/GameEndModal.vue";
import { makeCardDraggingHandler } from "@/logic/cardDragging";
import { setupGameSocket } from "@/logic/gameSocket";

type HighlightedCard = {
  positionOnBoard?: CardPositionOnBoard;
  indexInHand?: number;
};

export const useGame = (gameId: any, username: any) => {
  if (typeof gameId !== "string") {
    throw new Error("Game id is not a string");
  }

  if (typeof username !== "string") {
    throw new Error("Username is not a string");
  }

  const modal = useModal();
  const { t } = useI18n();

  const connected = ref(false);
  const disconnected = ref<boolean>();
  const gameInfos = ref<GameInfosDto>();
  const selfPlayer = ref<PlayerDto>();
  const gameBoard = ref<GameBoardDto>();
  const connectedUsernames = ref<Record<string, boolean>>();
  const highlightedCard = ref<HighlightedCard>();

  const actionsLogs = ref<Array<string>>([]);
  const logAction = (action: string) => actionsLogs.value.push(action);
  const logs = computed(() => actionsLogs.value.slice(-3));

  const {
    startGame,
    cancelTurnModifications,
    drawCard,
    endTurn,
    moveCardAlone,
    moveCardToCombination,
    placeCardAlone,
    placeCardInCombination,
  } = setupGameSocket({
    gameId,
    username,
    onSelfPlayerUpdate(newSelfPlayer) {
      selfPlayer.value = newSelfPlayer;
    },
    onGameBoardUpdate(newGameBoard) {
      gameBoard.value = newGameBoard;
    },
    onGameInfosUpdate(newGameInfos) {
      if (newGameInfos.state === "ended") {
        modal.open(GameEndModal, {
          winnerUsername: newGameInfos.winnerUsername,
        });
        logAction(
          t("toast.player_actions.won", {
            username: newGameInfos.winnerUsername,
          }),
        );
      }
      gameInfos.value = newGameInfos;
    },
    onConnectedUsernamesUpdate(newConnectedUsernames) {
      connectedUsernames.value = newConnectedUsernames;
    },
    onPlayerCanceledTurnModifications(player) {
      logAction(
        t("toast.player_actions.canceled_turn_modifications", {
          username: player.username,
        }),
      );
    },
    onPlayerDrawnCard(player) {
      logAction(
        t("toast.player_actions.drawn_card", {
          username: player.username,
        }),
      );
      if (player.id === selfPlayer.value?.id) {
        highlightedCard.value = {
          indexInHand: player.cards.length - 1,
        };
      }
    },
    onPlayerPlayed(player) {
      if (gameInfos.value?.state === "ended") return;
      logAction(
        t("toast.player_actions.played", {
          username: player.username,
        }),
      );
    },
    onPlayerMovedCard(player, cardPosition) {
      if (player.id === selfPlayer.value?.id) {
        return;
      }
      highlightedCard.value = {
        positionOnBoard: cardPosition,
      };
    },
    onConnect() {
      connected.value = true;
    },
    onDisconnect() {
      connected.value = false;
      disconnected.value = true;
    },
  });

  const cardDraggingHandler = makeCardDraggingHandler({
    placeCardAlone,
    placeCardInCombination,
    moveCardAlone,
    moveCardToCombination,
  });

  return {
    connected,
    disconnected,
    gameInfos,
    selfPlayer,
    gameBoard,
    connectedUsernames,
    highlightedCard,
    logs,
    startGame,
    cancelTurnModifications,
    drawCard,
    endTurn,
    cardDraggingHandler,
  };
};
