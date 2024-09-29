import { Game } from "@/app/Game/application/Game";
import { GameManager } from "@/app/Game/application/GameManager";
import { GameRepository } from "@/app/Game/application/GameRepository";
import { Player } from "@/app/Player/application/Player";
import { afterEach, describe, expect, test, vi } from "vitest";

describe("GameManager", () => {
  describe("connect", () => {
    test("add player to connections", () => {
      // Arrange
      const gameManager = new GameManager({
        gameRepository: new GameRepository(),
      });

      // Act
      gameManager.connect({
        gameId: "1",
        username: "Alice",
      });

      // Assert
      expect(
        gameManager.isConnected({
          gameId: "1",
          username: "Alice",
        }),
      ).toBeTruthy();
    });

    test("create game and player and return them", () => {
      const gameManager = new GameManager({
        gameRepository: new GameRepository(),
      });

      const { game, player } = gameManager.connect({
        gameId: "1",
        username: "Alice",
      });

      expect(game).toBeInstanceOf(Game);
      expect(player).toBeInstanceOf(Player);
    });

    test("can't connect if username already connected", () => {
      //Arrange
      const gameManager = new GameManager({
        gameRepository: new GameRepository(),
      });
      gameManager.connect({
        gameId: "1",
        username: "Alice",
      });

      // Act & assert
      expect(() => {
        gameManager.connect({
          gameId: "1",
          username: "Alice",
        });
      }).toThrow(Error);
    });

    test("can connect again if disconected after game start", () => {
      // Arrange
      const gameManager = new GameManager({
        gameRepository: new GameRepository(),
      });
      const { game } = gameManager.connect({
        gameId: "1",
        username: "Alice",
      });
      gameManager.connect({
        gameId: "1",
        username: "Bob",
      });
      game.start();
      gameManager.disconnect({
        gameId: "1",
        username: "Alice",
      });

      // Act
      gameManager.connect({
        gameId: "1",
        username: "Alice",
      });

      // Assert
      expect(
        gameManager.isConnected({
          gameId: "1",
          username: "Alice",
        }),
      ).toBeTruthy();
    });
  });

  describe("disconnect", () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    test("remove player from connections", () => {
      // Arrange
      const gameManager = new GameManager({
        gameRepository: new GameRepository(),
      });
      gameManager.connect({
        gameId: "1",
        username: "Alice",
      });

      // Act
      gameManager.disconnect({
        gameId: "1",
        username: "Alice",
      });

      // Assert
      expect(
        gameManager.isConnected({
          gameId: "1",
          username: "Alice",
        }),
      ).toBeFalsy();
    });

    test("remove player if game is not started", () => {
      // Arrange
      const game = new Game({
        id: "1",
      });
      const spy = vi.spyOn(game, "removePlayer");
      const gameManager = new GameManager({
        gameRepository: new GameRepository({
          games: [game],
        }),
      });
      gameManager.connect({
        gameId: "1",
        username: "Alice",
      });

      // Act
      gameManager.disconnect({
        gameId: "1",
        username: "Alice",
      });

      // Assert
      expect(spy).toHaveBeenCalledOnce();
    });

    test("destory game if it was the last player connected", () => {
      // Arrange
      const gameRepository = new GameRepository();
      const spy = vi.spyOn(gameRepository, "destroy");

      const gameManager = new GameManager({
        gameRepository,
      });
      const { game, player } = gameManager.connect({
        gameId: "1",
        username: "Alice",
      });

      // Act
      gameManager.disconnect({
        gameId: "1",
        username: "Alice",
      });

      // Assert
      expect(spy).toHaveBeenCalledOnce();
    });
  });
});
