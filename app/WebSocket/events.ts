import type { IGame } from "@/app/Game/entities/Game";
import type { IGameRepository } from "@/app/GameRepository/entities/GameRepository";
import type { PlayerDto } from "@/app/Player/dtos/player";
import type { IPlayer } from "@/app/Player/entities/Player";
import type {
  WebSocketServer,
  WebSocketServerSocket,
} from "@/app/WebSocket/types";

const gameRoom = (game: IGame) => `${game.id}`;
const playerRoom = (game: IGame, player: IPlayer | PlayerDto) =>
  `${game.id}-${player.id}`;

export const registerSocketEvents = (
  gameRepository: IGameRepository,
  socketServer: WebSocketServer
) => {
  const emitGameUpdate = (game: IGame) => {
    const gameDto = game.toDto();

    socketServer.to(gameRoom(game)).emit("gameBoard.update", gameDto.gameBoard);

    gameDto.players.forEach((player) => {
      socketServer.to(playerRoom(game, player)).emit("player.update", player);
    });
  };

  const bindEventsToSocket = ({
    socket,
    game,
    player,
  }: {
    socket: WebSocketServerSocket;
    game: IGame;
    player: IPlayer;
  }) => {
    console.log(`game ${game.id}`);

    socket.join(gameRoom(game));
    socket.join(playerRoom(game, player));

    socket.data.player = player;

    console.log(`${game.toDto().players.length} players`);

    emitGameUpdate(game);
    socket.emit("game.infos.update", game.toInfosDto());

    socket.on("disconnect", () => {
      game.removePlayer(player.id);
      console.log("A player disconnected");
      console.log(`${game.toDto().players.length} players`);

      emitGameUpdate(game);
    });

    socket.on("game.start", () => {
      if (!game.canStart() || !player.admin) {
        return;
      }

      console.log("Start game");

      game.start();
      emitGameUpdate(game);
    });

    socket.on("player.cancelTurnModifications", () => {
      if (!player.canCancelTurnModifications()) {
        return;
      }

      player.cancelTurnModifications();
      emitGameUpdate(game);
    });

    socket.on("player.drawCard", () => {
      if (!player.canDrawCard()) {
        return;
      }

      player.drawCard();
      emitGameUpdate(game);
    });

    socket.on("player.endTurn", () => {
      if (!player.canEndTurn()) {
        return;
      }

      player.endTurn();
      emitGameUpdate(game);
    });

    socket.on("player.moveCardAlone", (source) => {
      if (!player.canMoveCardAlone()) {
        return;
      }

      player.moveCardAlone(source);
      emitGameUpdate(game);
    });

    socket.on("player.moveCardToCombination", (source, destination) => {
      if (!player.canMoveCardToCombination()) {
        return;
      }

      player.moveCardToCombination(source, destination);
      emitGameUpdate(game);
    });

    socket.on("player.placeCardAlone", (cardIndex) => {
      if (!player.canPlaceCardAlone()) {
        return;
      }

      player.placeCardAlone(cardIndex);
      emitGameUpdate(game);
    });

    socket.on("player.placeCardInCombination", (cardIndex, destination) => {
      if (!player.canPlaceCardInCombination()) {
        return;
      }

      player.placeCardInCombination(cardIndex, destination);
      emitGameUpdate(game);
    });
  };

  socketServer.on("connection", (socket): void => {
    const gameId = socket.handshake.query.gameId;

    if (typeof gameId !== "string") {
      socket.disconnect();
      return;
    }

    const { game, player } = gameRepository.join(gameId);

    bindEventsToSocket({ socket, game, player });
  });
};
